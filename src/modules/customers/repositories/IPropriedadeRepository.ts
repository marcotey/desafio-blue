import { Player } from '../entities/Player';
import { Propriedade } from '../entities/Propriedades';

interface IPropriedadeDTO {
    id: number;

    custoVenda: number;

    valorAluguel: number;

    proprietario: Player;
}

interface IPropriedadeRepository {
    create(id: number): Promise<void>;
    update({
        id,
        custoVenda,
        valorAluguel,
        proprietario,
    }: IPropriedadeDTO): Promise<void>;
    findById(id: number): Propriedade;
    liberarPropriedade(name: string): Promise<void>;
    delete(): void;
}

export { IPropriedadeRepository, IPropriedadeDTO };
