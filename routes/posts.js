import express from 'express'
import { getPosts, getPostInfo } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostInfo);

// export the router
export default router