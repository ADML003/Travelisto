# Authentication Setup Guide

## Issue Fixed

The authentication issue has been resolved. The main problems were:

1. **Environment Variables Missing**: The Appwrite configuration wasn't properly set up
2. **Authentication Flow**: The `clientLoader` functions weren't handling user creation/retrieval correctly
3. **Error Handling**: Better error handling has been added for debugging

## Steps to Complete Setup

### 1. Set up Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or your self-hosted instance
2. Create a new project or use an existing one
3. Note down your:
   - Project ID
   - API Endpoint (usually `https://cloud.appwrite.io/v1`)
   - Database ID
   - Collections IDs

### 2. Configure Environment Variables

Update the `.env` file in your project root with your actual Appwrite details:

```bash
VITE_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-actual-project-id
VITE_APPWRITE_API_KEY=your-api-key
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_USERS_COLLECTION_ID=your-users-collection-id
VITE_APPWRITE_TRIPS_COLLECTION_ID=your-trips-collection-id
```

### 3. Set up Google OAuth

1. In your Appwrite console, go to Auth → Settings
2. Add Google as an OAuth provider
3. Configure the redirect URLs:
   - Success: `http://localhost:5177/` (or your domain)
   - Failure: `http://localhost:5177/sign-in`

### 4. Create Database Collections

Create two collections in your Appwrite database:

#### Users Collection

- `accountId` (string, required)
- `email` (string, required)
- `name` (string, required)
- `imageUrl` (string, optional)
- `joinedAt` (datetime, required)

#### Trips Collection

- Configure as needed for your trip data

### 5. Test the Authentication

1. Make sure the server is running (`npm run dev`)
2. Go to `http://localhost:5177/sign-in`
3. Click "Sign in with Google"
4. After successful authentication, you should be redirected to the home page

## Changes Made

- Fixed `clientLoader` functions in both sign-in and page-layout components
- Improved `storeUserData` function to handle user creation properly
- Added debugging logs to track authentication flow
- Added environment variable validation
- Fixed OAuth redirect URLs
- Added proper error handling throughout the authentication flow

## Debugging

If you still have issues, check the browser console for error messages. The authentication flow now includes detailed logging to help identify any remaining issues.
