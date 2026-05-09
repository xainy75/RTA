import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, onSnapshot, query, orderBy, getDoc, setDoc, increment, serverTimestamp, writeBatch, where, limit } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper for atomic operation (like/promote) using writeBatch
export const toggleInteraction = async (projectId: string, userId: string, type: 'like' | 'promote') => {
  const interactionRef = doc(db, 'research_projects', projectId, 'interactions', userId);
  const projectRef = doc(db, 'research_projects', projectId);

  try {
    const interactionDoc = await getDoc(interactionRef);
    const batch = writeBatch(db);

    if (interactionDoc.exists()) {
      const currentType = interactionDoc.data().type;
      
      if (currentType === type) {
        // Toggle OFF
        batch.delete(interactionRef);
        batch.update(projectRef, {
          [`${type}sCount`]: increment(-1),
          updatedAt: serverTimestamp()
        });
        await batch.commit();
        return false;
      } else {
        // Switch interaction type
        batch.set(interactionRef, { type, userId, updatedAt: serverTimestamp() }, { merge: true });
        const updateObj: any = { updatedAt: serverTimestamp() };
        updateObj[`${currentType}sCount`] = increment(-1);
        updateObj[`${type}sCount`] = increment(1);
        batch.update(projectRef, updateObj);
        await batch.commit();
        return true;
      }
    } else {
      // New interaction
      batch.set(interactionRef, { type, userId, createdAt: serverTimestamp() });
      batch.update(projectRef, {
        [`${type}sCount`]: increment(1),
        updatedAt: serverTimestamp()
      });
      await batch.commit();
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `research_projects/${projectId}/interactions/${userId}`);
    return false;
  }
};
