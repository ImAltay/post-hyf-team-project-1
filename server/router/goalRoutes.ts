import express from 'express';
import { getGoals, addGoal, editGoal, removeGoal } from '../controllers/goalController';

const router = express.Router();

router.get('/:userId', getGoals); // Get all goals
router.post('/', addGoal); // Create goal
router.put('/:id', editGoal); // Update goal
router.delete('/:id', removeGoal); // Delete goal

export default router;
