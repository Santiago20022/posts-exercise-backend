import express from 'express';
import { getUsers } from './users/getUsers';
import { getPosts } from './posts/getPosts';

const router = express.Router();

router.get('/get/users', (req, res) => getUsers(req, res));
router.get('/get/posts', (req, res) => getPosts(req, res))

export default router;
