import mongoose, { Connection } from "mongoose";

/**
 * MongoDB connection configuration interface
 * Defines the structure for connection options
 */
interface MongoConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

/**
 * Global MongoDB connection cache
 * In development, Next.js hot-reloading can cause multiple connections
 * This cache ensures we reuse the existing connection instead of creating new ones
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongoConnection | undefined;
}

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Validates that the MongoDB URI is provided
 * Throws an error in development if the environment variable is missing
 */
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Initialize the global mongoose cache if it doesn't exist
 * This prevents the connection cache from being undefined
 */
let cached: MongoConnection = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 *
 * Features:
 * - Connection caching to prevent multiple connections in development
 * - Proper TypeScript typing with no 'any' types
 * - Comprehensive error handling
 * - Optimized connection options for production use
 *
 * @returns {Promise<Connection>} The MongoDB connection instance
 * @throws {Error} If connection fails or MONGODB_URI is not provided
 */
async function connectToDatabase(): Promise<Connection> {
  /**
   * Return existing connection if available
   * This prevents creating multiple connections during development hot-reloads
   */
  if (cached.conn) {
    return cached.conn;
  }

  /**
   * If no connection exists but a promise is pending, wait for it
   * This handles concurrent connection attempts
   */
  if (!cached.promise) {
    /**
     * Mongoose connection options for optimal performance and reliability
     * - bufferCommands: false - Disable mongoose buffering when not connected
     * - maxPoolSize: 10 - Maximum number of connections in the pool
     * - serverSelectionTimeoutMS: 5000 - How long to try selecting a server
     * - socketTimeoutMS: 45000 - How long a send or receive on a socket can take
     * - family: 4 - Use IPv4, skip trying IPv6
     */
    const connectionOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    /**
     * Create the connection promise
     * Store it in cache to prevent multiple simultaneous connection attempts
     */
    cached.promise = mongoose
      .connect(MONGODB_URI!, connectionOptions)
      .then((mongoose) => {
        console.log("✅ Successfully connected to MongoDB");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        // Reset the promise cache on error so we can retry
        cached.promise = null;
        throw new Error(`Failed to connect to MongoDB: ${error.message}`);
      });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset both promise and connection on error
    cached.promise = null;
    cached.conn = null;
    throw error;
  }

  return cached.conn;
}

/**
 * Gracefully closes the MongoDB connection
 * Useful for cleanup in serverless environments or application shutdown
 *
 * @returns {Promise<void>}
 */
async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await mongoose.connection.close();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 Disconnected from MongoDB");
  }
}

/**
 * Gets the current connection status
 *
 * @returns {number} Mongoose connection ready state
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
function getConnectionStatus(): number {
  return mongoose.connection.readyState;
}

/**
 * Checks if the database connection is healthy
 *
 * @returns {boolean} True if connected, false otherwise
 */
function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// Export the main connection function and utilities
export {
  connectToDatabase as default,
  disconnectFromDatabase,
  getConnectionStatus,
  isConnected,
};

/**
 * Connection status constants for better code readability
 * Use these instead of magic numbers when checking connection state
 */
export const CONNECTION_STATES = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
} as const;

/**
 * Type for connection states
 * Useful for TypeScript type checking
 */
export type ConnectionState =
  (typeof CONNECTION_STATES)[keyof typeof CONNECTION_STATES];
