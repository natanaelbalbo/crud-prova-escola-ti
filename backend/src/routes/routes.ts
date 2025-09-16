import { Router } from "express";
import { receitaController } from "../controllers/receitaController";

const router = Router();

router.get('/receitas', receitaController.getAll);
router.post('/receitas', receitaController.create);
router.put('/receitas/:id', receitaController.update);
router.delete('/receitas/:id', receitaController.delete);
router.post('/receitas/:id/ingredientes', receitaController.addIngrediente);
router.delete('/ingredientes/:ingredienteId', receitaController.removeIngrediente);

export default router;  