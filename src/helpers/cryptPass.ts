// Import necessary modules
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Read the SECRET from the environment variables
const SECRET = process.env.SECRET
// Function to generate a random string of 128 bytes encoded in base64
export const random = (): string => crypto.randomBytes(128).toString('base64');

// Function to hash the password with a salt and secret using HMAC (SHA-256)
export const authentication = (salt: string, password: string): string => {
    // Concatenate salt and password with '/' separator
    // Create HMAC using SHA-256 algorithm
    // Update the HMAC with the SECRET string
    return crypto
        .createHmac('sha256', [salt, password].join('/'))  // Create the HMAC with the salt and password
        .update(SECRET)  // Apply the secret to the HMAC for further hashing
        .digest('hex');  // Return the final result as a hexadecimal string
};
