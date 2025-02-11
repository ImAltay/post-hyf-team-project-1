import { Request, Response } from 'express';
import { getGoalsByUserId, createGoal, updateGoalById, deleteGoalById } from '../model/Goal';

// Get all goals for a user
export const getGoals = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const goals = await getGoalsByUserId(userId);
        res.json(goals);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Create a new goal
export const addGoal = async (req: Request, res: Response) => {
    try {
        const newGoal = await createGoal(req.body);
        res.status(201).json(newGoal);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Update a goal
export const editGoal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedGoal = await updateGoalById(id, req.body);
        res.json(updatedGoal);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Delete a goal
export const removeGoal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteGoalById(id);
        res.json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};
