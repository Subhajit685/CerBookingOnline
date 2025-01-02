import express from 'express';
import userProtected from '../middlewares/userProtected.js';
import { accept, cancel, complete, createRide, submitOtp } from '../controllers/ride.js';
import captainProtected from '../middlewares/captainProtected.js';

const router = express.Router();

router.post('/createride', userProtected, createRide)

router.post("/accept", captainProtected, accept)

router.post("/submitotp", captainProtected, submitOtp)

router.post("/complete", captainProtected, complete)

router.post("/cancel", userProtected, cancel)

export default router