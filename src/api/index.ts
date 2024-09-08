import express from 'express';
import { getUsers } from './users/getUsers';

const router = express.Router();

router.get('/get/users', (req, res) => getUsers(req, res));
router.get('/get/users/:id', (req, res) => getUsers(req, res));

export default router;
