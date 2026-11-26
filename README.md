# FileVault — Modern Cloud File Sharing & Management Platform

> **“Your files. Your control. Anywhere.”**  
> *A production-style Frontend Development Frameworks college capstone project.*

---

## 🚀 Live Demo & Quick Launch

The landing page uses React and Vite. Install dependencies once, then start the development server:

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Run `npm run build` to create the production build in `dist/`.
The landing page analytics are rendered by React in `src/App.jsx`; login and dashboard remain on the existing JavaScript implementation.

---

## 🔑 Demo Accounts (1-Click Login Enabled)

The login screen (`login.html`) features a **Demo Accounts** panel with one-click credential auto-fill buttons specifically designed for college project evaluation and viva demonstration.

| Persona | Email | Password | Role Tier | Primary Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | `admin@filevault.com` | `admin123` | Administrator | Full access, user management, full analytics, delete any file |
| **Faculty** | `faculty@filevault.com` | `faculty123` | Faculty | Upload, share, review student assignments, versioning |
| **Student** | `student@filevault.com` | `student123` | Student | Upload coursework, create folders, share links, edit own files |
| **Guest** | `guest@filevault.com` | `guest123` | Guest | Sandboxed read-only, download permitted files, no upload/delete |

---

## 📁 Project Directory Structure

```text
c:\Users\Giridhar\Downloads\frontend project\
│
├── index.html              # SaaS Landing Page (Features, Security, How It Works, CTA)
├── src/
│   ├── App.jsx             # React landing-page analytics and chart
│   └── main.jsx            # React application entry point
├── package.json            # React and Vite scripts/dependencies
├── vite.config.js          # Vite React plugin configuration
├── login.html              # Authentication Page (Login, Sign-Up, 1-Click Demo Fill)
├── dashboard.html          # Core SaaS Dashboard (All 10 views, Modals, Topbar, Sidebar)
│
├── css/
│   └── style.css           # Complete Design System, Tokens, Light & Dark theme, Modals
│
├── js/
│   ├── storage.js          # Persistence Engine (IndexedDB + LocalStorage, Demo Seeder)
│   ├── auth.js             # Authentication Controller, Form Validation & RBAC Matrix
│   ├── files.js            # File Manager (File API, Previews, Share, Versions, Downloads)
│   └── app.js              # View Router, Analytics Charts, Admin CRUD, Toasts, Modals
│
├── assets/
│   └── logo.svg            # FileVault Vector Shield + Cloud Logo
│
└── README.md               # Complete Project Documentation & Viva Defense Guide
```

---

## 🌟 Implemented Features & SaaS Capabilities

### 1. Multi-Role Authentication & Access Control (RBAC)
- Client-side session management with persistent login state.
- Distinct permissions for **Admin**, **Faculty**, **Student**, and **Guest**.
- Dynamic UI adaptation:
  - Admin view unlocks the **User Management** console.
  - Guest view locks and disables upload and delete buttons with descriptive tooltips.
- Full registration flow with JavaScript validation (name length, regex email, password strength, matching confirmation, terms agreement).

### 2. File Upload Engine (Browser File API + IndexedDB)
- Drag-and-drop dropzone or native multi-file picker.
- Animated upload progress simulator for authentic SaaS feel.
- Binary files stored in **IndexedDB** (`FileVault_BinaryDB`) avoiding the 5MB `localStorage` limit.
- Automatic file type detection and metadata extraction (size, MIME type, modified timestamp, owner).

### 3. Hierarchical Folder Organization & Breadcrumbs
- Create nested folders with custom color coding.
- Dynamic breadcrumb navigation (`Home / My Files / Documents / ...`).
- Duplicate folder name validation in the same path.
- Move files between folders or back to root directory.

### 4. Universal In-Browser File Preview Modal
Instant modal previewer without third-party plugins:
- **PDF Documents:** Embedded `<iframe src="...">` viewer for uploaded PDFs and structured document preview sheet for seeded PDFs.
- **Images (PNG, JPG, SVG, WebP):** High-resolution responsive image viewer.
- **Spreadsheets (CSV, XLSX, XLS):** Formatted tabular grid view for CSV/spreadsheet data plus download support.
- **Text & Code (TXT, JSON, MD, JS, HTML, CSS):** Monospace code viewer.
- **Audio Clips (MP3, WAV, OGG):** Native HTML5 `<audio controls>` player.
- **Video Clips (MP4, WebM):** Native HTML5 `<video controls>` player.
- **Unsupported Formats (ZIP, PPTX, etc.):** Friendly fallback notice with one-click download.

### 5. File Versioning & Immutable Timeline
- Version tracking per file (`v1`, `v2`, `v3`).
- **Commit New Version** directly from the timeline with optional file revision upload and changelog notes.
- Visual vertical timeline showing version number, modification timestamp, author name, role badge, and revision notes.
- Actions: **Preview**, **Download**, and **Restore Version** (creates a restored head version and updates file metadata).

### 6. Granular Sharing & Collaborator Management
- Share with specific user emails with **Viewer**, **Commenter**, or **Editor** permissions.
- Update collaborator permission levels or remove collaborators directly inside the Share modal.
- Public link toggle with permission selector and unique link generation.
- Copy link to clipboard using the native **Navigator Clipboard API** with fallback.

### 7. Trash & Recovery System
- Soft-delete sends files to **Trash** without data loss.
- Trash view lists deletion date and original file size.
- **Restore** button brings the file back to its folder.
- **Permanent Delete** requires explicit confirmation dialog.
- **Empty Trash** batch operation.

### 8. Analytics & Data Visualization (Canvas API)
- Storage capacity progress bar with live percentage and color gradient.
- **HTML5 Canvas API Donut Chart** displaying storage distribution across file formats.
- **HTML5 Canvas API Bar Chart** tracking monthly upload volume.
- Dynamic KPI summary cards: **Total Files**, **Storage Used**, **Storage Remaining**, and **Total Downloads**.

### 9. Admin User Management Console (Admin Only)
- User table with avatar initials, name, email, role badge, status indicator, **file count**, **storage used / quota**, and last active timestamp.
- **Add New User** and **Edit User** modals.
- One-click **Suspend / Activate** account controls (suspended users are blocked from signing in).
- Safe user removal with confirmation protection.

### 10. Global Search, Shortcuts & Context Menus
- Global topbar search input with keyboard shortcut `Ctrl + K` (and `/`), plus `Alt + U` (upload), `Alt + N` (new folder), `Alt + D` (toggle dark mode), and `Escape` (close modals).
- Right-click context menu on file cards/rows and folder cards with RBAC-aware disabled states.
- Non-blocking toast engine in bottom-right for operations (Success, Error, Warning, Info).

### 12. Dark Mode & Responsive Layout
- Complete light/dark theme switch with CSS custom properties.
- State persists across browser reloads.
- Responsive mobile drawer with hamburger menu and backdrop blur for mobile and tablet touchscreens.

---

## 💾 LocalStorage & IndexedDB Data Architecture

```text
[ Browser Storage Architecture ]
│
├── LocalStorage (Structured Metadata & State)
│   ├── filevault_users           -> Array of user profiles, credentials & quotas
│   ├── filevault_current_user    -> Active logged-in session object
│   ├── filevault_files           -> Array of file metadata records
│   ├── filevault_folders         -> Array of folder objects with parentId hierarchy
│   ├── filevault_notifications   -> Array of notification items with read flags
│   ├── filevault_versions        -> Map of fileId -> Array of historical revisions
│   ├── filevault_activities      -> Array of chronological audit events
│   ├── filevault_settings        -> User configuration preferences (2FA, alerts)
│   └── filevault_theme           -> Active theme ('light' or 'dark')
│
└── IndexedDB: "FileVault_BinaryDB"
    └── ObjectStore: "files_blobs"
        └── KeyPath: 'id' -> { id, data: Blob/DataURL, updatedAt }
```

---

## 🎯 Step-by-Step College Demonstration Flow

Follow this exact walkthrough during your viva or project presentation:

1. **Landing Page:** Open `index.html`. Show the SaaS hero section, feature cards, security architecture, and how it works.
2. **Login Screen:** Click "Explore Live Demo" or "Log In". Click the **Student Demo** button (credentials `student@filevault.com` auto-fill). Click **Sign In**.
3. **Student Dashboard:** Point out the personal welcome message, storage widget (4.2 GB / 10 GB), animated counters, and recent files.
4. **Upload a File:** Click **Upload File**. Drag any image or text file onto the dropzone. Watch the animated progress bar complete. See the success toast.
5. **Create a Folder:** Click **New Folder**. Enter `“College Capstone”`. Notice it immediately appears in the folder grid.
6. **Open Folder & Breadcrumbs:** Click the new folder. Point to the breadcrumb trail (`Home / My Files / College Capstone`).
7. **Star a File:** Click the Star icon on `Project_Report.pdf`. Navigate to the **Starred** view to verify it appears there.
8. **Share & Copy Link:** Click Share on `Project_Report.pdf`. Toggle link sharing ON. Click **Copy** (shows *"Link copied!"* toast). Enter `faculty@filevault.com` as Editor and click Send.
9. **Version History:** Click the 3-dots menu on `Project_Report.pdf` and select **Version History**. Show the vertical timeline with v3, v2, and v1.
10. **Switch to Faculty:** Use the topbar **Switch User** dropdown to select **Faculty (Prof. Jenkins)**. Navigate to **Shared With Me** to see the file shared by Student Rahul.
11. **Switch to Admin:** Switch to **Admin (Dr. Wright)**. Point out that the **User Management** tab is now visible in the sidebar. Open it to show the full user table and edit a role.
12. **Analytics View:** Click **Analytics** in the sidebar. Show the SVG Donut chart, storage consumption bars, and KPI cards.
13. **Toggle Dark Mode:** Click the Sun/Moon icon in the topbar to show the dark mode transition.
14. **Logout:** Click Logout to securely terminate the session and return to the login screen.

---

## 🛡️ Security & Architecture Notice

> **Academic Disclaimer:**  
> This application implements complete client-side security UI, Role-Based Access Control (RBAC), and storage simulation for academic and demonstration purposes. In production deployments, client storage must be complemented by a hardened backend API, database authentication (JWT/OAuth2), and encrypted object storage (AWS S3, Google Cloud Storage, or Azure Blob).

---

## 👨‍💻 Author

- **Developer:** Giridhar
- **Project:** FileVault — Production Cloud File Sharing Platform
- **Coursework:** Frontend Development Frameworks
