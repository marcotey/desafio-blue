import { container } from 'tsyringe';

import { PlayerRepository } from '@modules/customers/entities/repositories/PlayerRepository';
import { PropriedadeRepository } from '@modules/customers/entities/repositories/PropriedadeRepository';
import { IPlayerRepository } from '@modules/customers/repositories/IPlayerRepository';
import { IPropriedadeRepository } from '@modules/customers/repositories/IPropriedadeRepository';

container.registerSingleton<IPlayerRepository>(
    'PlayerRepository',
    PlayerRepository,
);

container.registerSingleton<IPropriedadeRepository>(
    'PropriedadeRepository',
    PropriedadeRepository,
);
