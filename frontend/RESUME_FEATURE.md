# Resume Upload & Viewing Feature

## Overview
This feature allows users to upload their resumes and view/download resumes of other users.

## Components Created

### 1. EditModel.jsx (Enhanced)
- **Resume Upload**: Users can upload PDF, DOC, or DOCX files (max 5MB)
- **File Validation**: Checks file type and size
- **Current Resume Display**: Shows existing resume with view link
- **Upload Progress**: Loading state during upload

### 2. ResumeViewer.jsx
- **Modal Component**: Full-screen resume viewer
- **Two View Modes**:
  - **View Mode**: Embedded PDF viewer or download prompt for other formats
  - **Download Mode**: Direct download interface
- **File Type Detection**: Automatically detects PDF vs other document types
- **Responsive Design**: Works on mobile and desktop

### 3. ResumeButton.jsx
- **Reusable Component**: Can be placed anywhere in the app
- **Conditional Rendering**: Only shows when resume exists
- **Customizable Styling**: Accepts className prop for custom styling
- **Integrated Viewer**: Opens ResumeViewer when clicked

## Usage Examples

### Basic Resume Button
```jsx
import ResumeButton from './components/ResumeButton';

<ResumeButton 
  resumeUrl={user.resume}
  fileName="User's Resume"
/>
```

### Custom Styled Resume Button
```jsx
<ResumeButton 
  resumeUrl={user.resume}
  fileName="User's Resume"
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
>
  View CV
</ResumeButton>
```

### In Profile Cards
```jsx
<ResumeButton 
  resumeUrl={props.data?.resume}
  fileName={`${props.data?.name}'s Resume`}
  className="px-5 py-2 rounded-2xl font-semibold text-white 
    bg-gradient-to-r from-green-500/80 to-green-700/80"
>
  Resume
</ResumeButton>
```

## Backend Changes

### 1. User Model
- Added `resume` field to store resume URL

### 2. Upload Router
- Enhanced to handle resume files
- Automatically categorizes files into appropriate Cloudinary folders
- Supports PDF, DOC, DOCX formats

### 3. User Controller
- Added `updateResume` endpoint for resume-specific updates
- Enhanced error handling

### 4. User Router
- Added `/api/user/resume` PUT endpoint

## API Endpoints

### Upload Resume
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: Resume file (PDF, DOC, DOCX)
- upload_preset: "linkdinClone"
```

### Update Resume
```
PUT /api/user/resume
Authorization: Bearer <token>

Body:
{
  "resumeUrl": "https://cloudinary.com/..."
}
```

## File Requirements

### Supported Formats
- **PDF** (.pdf) - Full preview support
- **Microsoft Word** (.doc, .docx) - Download only

### Size Limits
- **Maximum**: 5MB
- **Recommended**: Under 2MB for better performance

### File Validation
- File type checking
- Size validation
- Error handling with user feedback

## Features

### ✅ Upload
- Drag & drop file selection
- File type validation
- Size limit enforcement
- Progress indication
- Success/error notifications

### ✅ View
- PDF embedded viewer
- Document type detection
- Responsive design
- Modal interface

### ✅ Download
- Direct download links
- File type preservation
- Cross-browser compatibility

### ✅ Integration
- Profile cards
- Edit forms
- User profiles
- Network connections

## Styling

### Default Button Styles
- Blue background with hover effects
- Icon + text layout
- Responsive design
- Consistent with app theme

### Customization
- Accepts className prop
- Flexible styling options
- Maintains accessibility
- Responsive breakpoints

## Error Handling

### Upload Errors
- File type not supported
- File too large
- Network failures
- Server errors

### View Errors
- File not found
- Unsupported format
- Loading failures
- **Cloudinary 401 Errors**: If you see "Failed to load resource: the server responded with a status of 401", this means:
  - The Cloudinary URL has expired
  - File permissions are restricted
  - Use the download option instead of preview

### User Feedback
- Toast notifications
- Loading states
- Error messages
- Success confirmations

## Security

### File Validation
- Server-side type checking
- Size restrictions
- Malware scanning (Cloudinary)
- Secure file storage

### Access Control
- User authentication required
- Resume visibility controls
- Privacy settings support

## Future Enhancements

### Planned Features
- Resume versioning
- Multiple resume support
- Resume templates
- Analytics tracking
- Export functionality

### Technical Improvements
- File compression
- Caching strategies
- Progressive loading
- Offline support
