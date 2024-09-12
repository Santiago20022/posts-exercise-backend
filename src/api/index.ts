import express from 'express';
import { getUsers } from './users/getUsers';
import { getPosts } from './posts/getPosts';
import { getTodos } from './todos/getTodos';
import { createUser } from './users/createUser';

const router = express.Router();

router.get('/get/users', (req, res) => getUsers(req, res));
router.get('/get/posts', (req, res) => getPosts(req, res));
router.get('/get/todos', (req, res) => getTodos(req, res));
router.post("/create/users", createUser);

export default router;
