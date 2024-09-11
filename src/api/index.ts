import express from 'express';
import { getUsers } from './users/getUsers';
import { getPosts } from './posts/getPosts';
import { getTodos } from './todos/getTodos';

const router = express.Router();

router.get('/get/users', (req, res) => getUsers(req, res));
router.get('/get/posts', (req, res) => getPosts(req, res));
router.get('/get/todos', (req, res) => getTodos(req, res));

export default router;
