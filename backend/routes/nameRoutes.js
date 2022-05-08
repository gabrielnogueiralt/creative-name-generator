import express from "express";
import {
    getFinalRecomendation,
    getNewRandomicRecomendation,
    getNewRecomendation,
} from '../controllers/nameController.js';

const router = express.Router();

router.route('/').post(getNewRandomicRecomendation);
router.route('/next').post(getNewRecomendation);
router.route('/final').post(getFinalRecomendation);

export default router;

