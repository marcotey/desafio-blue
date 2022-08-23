import { Router } from 'express';

import { SimuladorController } from '@modules/customers/useCases/SimularjogoUseCase/SimuladorController';

const simulacaoRoutes = Router();

const simuladorController = new SimuladorController();

simulacaoRoutes.get('/simular', simuladorController.handle);

export { simulacaoRoutes };
