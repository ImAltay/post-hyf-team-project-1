import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Each goal must be associated with a user
    },
    goal_type: {
      type: String,
      enum: ['weight_loss', 'muscle_gain', 'maintenance'],
      required: true, // Ensures goal type is specified
    },
    nutrition_targets: {
      protein: { type: Number, required: false }, // Grams of protein per day
      carbs: { type: Number, required: false }, // Grams of carbs per day
      fat: { type: Number, required: false }, // Grams of fat per day
    },
    daily_calories: { type: Number, required: false }, // Daily calorie intake target
    weight: { type: Number, required: true }, // Current weight
    target_weight: { type: Number, required: true }, // Target weight
    start_date: { type: Date, required: true }, // When the goal starts
    target_date: { type: Date, required: true }, // When the goal should be achieved
    weight_progress: [
      {
        date: { type: Date, required: true },
        weight: { type: Number, required: true },
      },
    ], // Array tracking weight changes over time
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

export const GoalModel = mongoose.model('Goal', GoalSchema);

// Exporting functions to interact with the Goal model

// Get all goals
export const getGoals = () => GoalModel.find();

// Get a goal by ID
export const getGoalById = (id: string) => GoalModel.findById(id);

// Get goals by user ID
export const getGoalsByUserId = (userId: string) =>
  GoalModel.find({ user_id: userId });

// Create a new goal
export const createGoal = (values: Record<string, any>) =>
  new GoalModel(values).save().then((goal) => goal.toObject());

// Delete a goal by ID
export const deleteGoalById = (id: string) =>
  GoalModel.findOneAndDelete({ _id: id });

// Update a goal by ID
export const updateGoalById = (id: string, values: Record<string, any>) =>
  GoalModel.findByIdAndUpdate(id, values, { new: true });

