# Vercel Deployment Guide

## Fixed Issues

The login page refresh loop has been resolved by:

1. **Removing aggressive redirects** that caused infinite loops
2. **Improving error handling** in authentication loaders
3. **Better OAuth flow management** with proper error states
4. **Environment variable validation** with helpful error messages

## Deployment Steps

### 1. Environment Variables

In your Vercel project dashboard, add these environment variables:

```
VITE_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-actual-project-id
VITE_APPWRITE_API_KEY=your-api-key (optional)
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_USERS_COLLECTION_ID=your-users-collection-id
VITE_APPWRITE_TRIPS_COLLECTION_ID=your-trips-collection-id
```

### 2. Appwrite Configuration

In your Appwrite console:

1. Go to **Auth → Settings**
2. Add your Vercel domain to **OAuth2 Redirect URLs**:
   - Success URL: `https://your-domain.vercel.app/`
   - Failure URL: `https://your-domain.vercel.app/sign-in?error=oauth_failed`

3. Make sure **Google OAuth** is enabled and configured

### 3. Deploy

```bash
# Build locally to test
npm run build

# Deploy to Vercel
vercel --prod
```

## Troubleshooting

### Login Page Keeps Refreshing

This issue has been fixed, but if it still occurs:

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure Appwrite OAuth URLs match your domain
4. Clear browser cache and cookies

### Authentication Errors

1. Check that all environment variables are set in Vercel
2. Verify Appwrite project settings
3. Check browser network tab for failed requests
4. Look at Vercel function logs for server errors

### Build Errors

1. Make sure all dependencies are installed
2. Check that TypeScript compiles without errors
3. Verify environment variables are available during build

## Changes Made

### Fixed Files:
- `app/routes/root/sign-in.tsx` - Removed redirect loops
- `app/routes/root/page-layout.tsx` - Better error handling
- `app/appwrite/auth.ts` - Improved OAuth flow
- `app/appwrite/client.ts` - Better environment variable validation

### New Files:
- `.env.example` - Environment variable template
- `DEPLOYMENT_GUIDE.md` - This guide

## Support

If you still experience issues:

1. Check the browser console for errors
2. Check Vercel function logs
3. Verify all environment variables are set correctly
4. Ensure Appwrite OAuth settings match your domain