# Environment Variables Setup for Render Deployment

## Required Environment Variables

Add these environment variables in your Render dashboard under your backend service:

### Database Configuration
```
MONGODB=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
```

### JWT Configuration
```
JWT_TOKEN=your_jwt_secret_key_here
```

### Cloudinary Configuration (if using image uploads)
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Email Configuration (if using email features)
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Port Configuration
```
PORT=3000
```

### Frontend URL for CORS
```
FRONTEND_URL=https://linkedinclone-frontend.onrender.com
```

## How to Add in Render:

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add each variable with its corresponding value
5. Redeploy your service

## Important Notes:

- **JWT_TOKEN**: Must be a strong, unique secret key
- **MONGODB**: Must be a valid MongoDB connection string
- **CORS**: Make sure your frontend URL matches exactly
- **Never commit actual values** to your repository
- **Redeploy** after adding environment variables
