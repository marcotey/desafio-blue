import { Player } from '../entities/Player';

interface IPlayerDTO {
    name: string;

    saldo: number;

    posicaoTabuleiro: number;

    quantidadeTurnos: number;

    ordemJogada?: number;

    eliminado: boolean;
}
interface IPlayerRepository {
    create(name: string): Promise<void>;

    update({
        name,
        saldo,
        posicaoTabuleiro,
        quantidadeTurnos,
        eliminado,
    }: IPlayerDTO): Promise<void>;

    findAll(): Player[];

    findByName(name: string): Player;

    delete(): void;
}

export { IPlayerRepository, IPlayerDTO };
