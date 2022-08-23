import { Player } from './Player';

class Propriedade {
    id: number;

    custoVenda: number;

    valorAluguel: number;

    proprietario: Player;

    constructor(id: number) {
        this.id = id;
        this.custoVenda = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
        this.valorAluguel = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        const proprietario: Player = null;
        this.proprietario = proprietario;
    }
}

export { Propriedade };
