# Research Platform Security Specification

## Data Invariants
1. **Identity Integrity**: A research project MUST be owned by the student who uploaded it (`studentUid` matching `auth.uid`).
2. **Relational Sync**: Like and Promote counts on a project document MUST correspond to unique entries in the `interactions` subcollection.
3. **Immutability**: `createdAt` and `studentUid` fields on a project cannot be modified after creation.
4. **State Transition**: Interaction counts can only be incremented or decremented by 1 at a time.

## The "Dirty Dozen" Payloads (Denial Scenarios)
1. **The Identity Spoof**: Uploading a project with a `studentUid` belonging to another user.
2. **The Ghost Edit**: Attempting to update the `studentUid` of an existing project to hijack ownership.
3. **The Multi-Vote**: Incrementing `likesCount` by 5 in a single request.
4. **The Shadow Field**: Adding a `isVerified: true` field to a project during upload.
5. **The Billion-Vote Attack**: Sending a massive string as a document ID to block valid indexes.
6. **The Negative Count**: Setting `likesCount` to -1.
7. **The Interaction Bypass**: Incrementing `likesCount` without creating an `interactions` document.
8. **The PII Leak**: Attempting to read all user profiles (not applicable yet as we don't have a global users collection).
9. **The Timestamp Spoof**: Providing a `createdAt` date from 2020.
10. **The Size Exhaustion**: Sending a 1MB string in the `title` field.
11. **The Orphaned Interaction**: Creating an interaction document for a non-existent project.
12. **The Anonymous Write**: Attempting to upload research without being signed in.

## Conflict Report & Audit
| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning |
| :--- | :--- | :--- | :--- |
| `research_projects` | BLOCKED (isValidId & studentUid check) | BLOCKED (affectedKeys check) | BLOCKED (size constraints) |
| `interactions` | BLOCKED (isOwner check) | N/A | BLOCKED (fixed enum types) |
