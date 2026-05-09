import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Plus, 
  ArrowLeft, 
  Send, 
  User, 
  Clock, 
  Tag,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Award,
  X
} from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType, signInWithGoogle } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  getDocs,
  where
} from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorUid: string;
  category: string;
  repliesCount: number;
  createdAt: any;
  updatedAt: any;
}

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorUid: string;
  createdAt: any;
}

export const CommunityHub = ({ user, onBack }: { user: FirebaseUser | null; onBack: () => void }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', 'Technical', 'General', 'Career', 'Projects', 'Help Needed'];

  React.useEffect(() => {
    const q = query(collection(db, 'discussions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'discussions');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return <PostDetail post={selectedPost} user={user} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Academy</span>
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Community <span className="text-orange-600">Hub</span></h1>
          <p className="text-neutral-500 text-sm">Join the conversation with thousands of RTA engineers.</p>
        </div>
        
        <button 
          onClick={() => {
            if (!user) {
              alert("Please login to create a post.");
              return;
            }
            setIsCreating(true);
          }}
          className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
        >
          <Plus className="w-5 h-5" /> Create Discussion
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-white outline-none focus:border-orange-600 transition-colors"
          />
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto whitespace-nowrap">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === cat ? 'bg-orange-600 text-white' : 'text-neutral-500 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-neutral-500">Connecting to community neural network...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <MessageSquare className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
            <p className="text-neutral-500">No discussions found in this frequency.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPost(post)}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center font-bold text-white shadow-lg">
                    {post.authorName[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-bold group-hover:text-orange-500 transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.authorName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}</span>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold text-orange-500 uppercase tracking-widest">{post.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold">{post.repliesCount || 0}</span>
                </div>
              </div>
              <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed">
                {post.content}
              </p>
            </motion.div>
          ))
        )}
      </div>

      <CreatePostModal 
        isOpen={isCreating} 
        onClose={() => setIsCreating(false)} 
        user={user} 
      />
    </div>
  );
};

const PostDetail = ({ post, user, onBack }: { post: Post; user: FirebaseUser | null; onBack: () => void }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const q = query(collection(db, 'discussions', post.id, 'comments'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      setComments(docs);
    });

    return () => unsubscribe();
  }, [post.id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'discussions', post.id, 'comments'), {
        content: newComment,
        authorName: user.displayName || 'Anonymous Student',
        authorUid: user.uid,
        createdAt: serverTimestamp()
      });
      
      await updateDoc(doc(db, 'discussions', post.id), {
        repliesCount: increment(1),
        updatedAt: serverTimestamp()
      });

      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `discussions/${post.id}/comments`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Feed</span>
      </button>

      <div className="bg-neutral-900 border border-white/10 rounded-[2rem] p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center font-bold text-white text-xl">
            {post.authorName[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{post.title}</h1>
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="font-bold text-orange-500 uppercase tracking-widest">{post.category}</span>
              <span>•</span>
              <span>{post.authorName}</span>
              <span>•</span>
              <span>{post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}</span>
            </div>
          </div>
        </div>

        <p className="text-neutral-300 leading-relaxed text-lg whitespace-pre-wrap mb-8">
          {post.content}
        </p>

        <div className="flex items-center gap-4 pt-8 border-t border-white/5">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-xs text-neutral-500 font-medium">{post.repliesCount || 0} technical contributions</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-8">Discussions ({comments.length})</h3>
        
        <div className="space-y-4 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-neutral-400 group-hover:border-orange-500/50 transition-colors">
                {comment.authorName[0]}
              </div>
              <div className="flex-grow p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white">{comment.authorName}</span>
                  <span className="text-[10px] text-neutral-600 font-mono italic">
                    {comment.createdAt?.toDate ? new Date(comment.createdAt.toDate()).toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleSubmitComment} className="relative group">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Contribute to the technical discussion..."
              className="w-full bg-neutral-900 border border-white/10 rounded-[2rem] p-6 text-white text-sm outline-none focus:border-orange-600 min-h-[120px] transition-all resize-none shadow-xl"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-4">
              <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Markdown Supported</span>
              <button 
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-500 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p className="text-neutral-500 text-sm mb-4">You must be a verified student to contribute to this discussion.</p>
            <button 
              onClick={signInWithGoogle}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Sign In to Participate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CreatePostModal = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: FirebaseUser | null }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('Technical');
  const [submitting, setSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'discussions'), {
        title,
        content,
        category,
        authorName: user.displayName || 'Anonymous Student',
        authorUid: user.uid,
        repliesCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      onClose();
      setTitle('');
      setContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'discussions');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative"
      >
        <div className="p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-white font-sans tracking-tight">Initiate <span className="text-orange-600">Discussion</span></h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Thread Topic</label>
              <input 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Solving thermal vibration in high-torque motors"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white outline-none focus:border-orange-600 transition-all font-bold placeholder:text-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Classification</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white outline-none focus:border-orange-600 transition-all appearance-none cursor-pointer"
              >
                {['Technical', 'General', 'Career', 'Projects', 'Help Needed'].map(cat => (
                  <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Discussion Core</label>
              <textarea 
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Detail your technical query or share your engineering insights..."
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white outline-none focus:border-orange-600 transition-all min-h-[200px] resize-none placeholder:text-neutral-700"
              />
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all disabled:opacity-50 shadow-xl shadow-orange-600/10"
            >
              {submitting ? 'Authenticating & Publishing...' : <>Broadcast Discussion <Send className="w-5 h-5" /></>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
