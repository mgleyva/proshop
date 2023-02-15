import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  // Admin
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(registerUser)
  //Admin
  .get(protect, admin, getUsers)
router.post('/login', authUser)

// protect middleware will run whenever we hit this route.
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  // Admin
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
