class Player {
    name: string;
    saldo: number;
    posicaoTabuleiro: number;
    quantidadeTurnos = 0;
    ordemJogada: number;
    eliminado = false;

    constructor() {
        this.saldo = 300;
        this.posicaoTabuleiro = 0;
    }
}

export { Player };
