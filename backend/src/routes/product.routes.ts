import { Router } from 'express';
import { getProducts } from '../controllers/product.controller';

const router = Router();

// GET request asle getProducts function call hobe
router.get('/', getProducts);

export default router;