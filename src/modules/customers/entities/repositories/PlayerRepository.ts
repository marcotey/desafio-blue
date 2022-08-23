import {
    IPlayerDTO,
    IPlayerRepository,
} from '@modules/customers/repositories/IPlayerRepository';

import { Player } from '../Player';

class PlayerRepository implements IPlayerRepository {
    players: Player[] = [];

    async create(name: string): Promise<void> {
        const newPlayer = new Player();

        newPlayer.name = name;

        newPlayer.ordemJogada = this.players.length;

        this.players.push(newPlayer);
    }
    async update({
        name,
        saldo,
        posicaoTabuleiro,
        quantidadeTurnos,
        eliminado,
    }: IPlayerDTO): Promise<void> {
        const index = this.players.findIndex(obj => obj.name === name);

        Object.assign(this.players[index], {
            name,
            saldo,
            posicaoTabuleiro,
            quantidadeTurnos,
            eliminado,
        });
    }

    findAll(): Player[] {
        return this.players;
    }

    findByName(name: string): Player {
        return this.players.find(prop => prop.name === name);
    }

    delete(): void {
        const { length } = this.players;
        this.players.splice(0, length);
    }
}

export { PlayerRepository };
