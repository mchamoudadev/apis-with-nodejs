

import express from 'express'

const router = express.Router();

import { getUsers, getUserInfo, createUser, updateUser, deleteUser } from '../controllers/users.js'



router.get('/', getUsers);
router.get('/:id', getUserInfo);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser)

// export the router
export default router;