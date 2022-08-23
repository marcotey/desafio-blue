import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SimuladorUseCase } from './SimuladorUseCase';

class SimuladorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const simulationRepository = container.resolve(SimuladorUseCase);

        const simulacao = await simulationRepository.execute();

        return response.status(200).json(simulacao);
    }
}

export { SimuladorController };
