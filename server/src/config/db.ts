import mongoose from 'mongoose';

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('PASTE_YOUR_MONGODB') || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
    console.warn('⚠️ MONGODB_URI is not yet configured in server/.env.');
    console.warn('👉 Please paste your MongoDB Atlas connection string into server/.env');
    console.warn('ℹ️  The backend is running; frontend will automatically display Local Demo Mode until connected.');
    return false;
  }

  try {
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log(`🔌 Connecting to MongoDB Atlas (${maskedUri})...`);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Successfully connected to MongoDB Atlas.');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
    return false;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
