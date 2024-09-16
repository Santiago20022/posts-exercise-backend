import express from 'express';
import { getUsers } from './users/getUsers';
import { getPosts } from './posts/getPosts';
import { getTodos } from './todos/getTodos';
import { getComments } from './comments/getComments';
import { createPost } from './posts/createPost';
import { createUser } from './users/createUser'
import { updateUser } from './users/updateUser';
import { createTodo } from './todos/createTodo';
import { createComment } from './comments/createComment';
import { updatePost } from './posts/updatePost';
import { updateComment } from './comments/updateComment';

const router = express.Router();

router.get('/get/users', (req, res) => getUsers(req, res));
router.get('/get/posts', (req, res) => getPosts(req, res));
router.get('/get/todos', (req, res) => getTodos(req, res));
router.get('/get/comments', (req, res) => getComments(req, res));
router.post('/create/post', createPost);
router.post('/create/user', createUser);
router.post('/create/comment', createComment);
router.post('/create/todo', createTodo);
router.patch('/update/user/:id', updateUser);
router.patch('/update/post/:id', updatePost);
router.patch('/update/comment/:id', updateComment);

export default router;
