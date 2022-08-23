import { Router } from 'express';

import { simulacaoRoutes } from './simulador.routes';

const router = Router();

router.use('/jogo', simulacaoRoutes);

export { router };
