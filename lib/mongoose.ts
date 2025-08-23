import mongoose, { Mongoose } from "mongoose";

interface MongooseCache {
   conn: Mongoose | null;
   promise: Promise<Mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
   mongooseCache: MongooseCache;
};

if (!globalWithMongoose.mongooseCache) {
   globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached: MongooseCache = globalWithMongoose.mongooseCache;

export async function connectDB(): Promise<Mongoose> {
   if (cached.conn) return cached.conn;

   if (!cached.promise) {
      if (!process.env.MONGODB_URI) {
         throw new Error("MONGODB_URI is not defined");
      }

      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
         dbName: process.env.MONGODB_DB || undefined,
      });
   }

   cached.conn = await cached.promise;
   return cached.conn;
}
