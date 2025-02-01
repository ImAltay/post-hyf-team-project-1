import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        gender: { type: String, enum: ['male', 'female', 'other'], required: false },
        height: { type: Number, required: false }, // Height in centimeters (optional)
        goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: false }, // Reference to a Goal model
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false },
        },
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);


export const UserModel = mongoose.model('User', UserSchema);

// Exporting functions to interact with the User model

// Get all users
export const getUser = () => UserModel.find();

// Get a user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Get a user by session token
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Get a user by ID
export const getUserById = (id: string) => UserModel.findById(id);

// Create a new user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());  

// Delete a user by ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
