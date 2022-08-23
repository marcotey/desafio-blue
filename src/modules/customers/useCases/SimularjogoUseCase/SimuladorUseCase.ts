import { inject, injectable } from 'tsyringe';

import { Player } from '@modules/customers/entities/Player';
import { Propriedade } from '@modules/customers/entities/Propriedades';
import { IPlayerRepository } from '@modules/customers/repositories/IPlayerRepository';
import { IPropriedadeRepository } from '@modules/customers/repositories/IPropriedadeRepository';
import { AppError } from '@shared/errors/AppErros';

@injectable()
class SimuladorUseCase {
    private resultadoFinal: Player[] = [];
    private result = {
        vencedor: '',
        jogadores: [],
    };

    constructor(
        @inject('PlayerRepository')
        private playerRepository: IPlayerRepository,

        @inject('PropriedadeRepository')
        private propriedadeRepository: IPropriedadeRepository,
    ) {}

    async execute(): Promise<any> {
        this.limparCache();
        this.playerRepository.create('cauteloso');
        this.playerRepository.create('aleatorio');
        this.playerRepository.create('exigente');
        this.playerRepository.create('impulsivo');

        for (let index = 1; index <= 20; index += 1) {
            this.propriedadeRepository.create(index);
        }

        for (let index = 0; index < 1000; index += 1) {
            const players = this.playerRepository.findAll();
            // eslint-disable-next-line no-restricted-syntax
            for (const player of players) {
                if (player.saldo >= 0) {
                    const dadosAleatorio = Math.floor(Math.random() * 6) + 1;
                    player.quantidadeTurnos += 1;
                    player.posicaoTabuleiro += dadosAleatorio;

                    if (player.posicaoTabuleiro > 20) {
                        player.posicaoTabuleiro -= 20;
                        player.saldo += 100;
                    }

                    const propriedade = this.propriedadeRepository.findById(
                        player.posicaoTabuleiro,
                    );
                    const pagar =
                        propriedade.proprietario &&
                        propriedade.proprietario.name !== player.name;

                    if (pagar) {
                        const saldoSuficiente =
                            player.saldo >= propriedade.valorAluguel;

                        const recebedor = this.playerRepository.findByName(
                            propriedade.proprietario.name,
                        );

                        player.saldo -= propriedade.valorAluguel;
                        try {
                            recebedor.saldo = saldoSuficiente
                                ? propriedade.valorAluguel
                                : player.saldo;
                        } catch (error) {
                            console.log(player, propriedade);
                            throw new AppError(
                                `erro ao setar valor${player}${propriedade} + `,
                            );
                        }

                        this.playerRepository.update({
                            name: recebedor.name,
                            posicaoTabuleiro: recebedor.posicaoTabuleiro,
                            saldo: recebedor.saldo,
                            eliminado: recebedor.eliminado,
                            quantidadeTurnos: recebedor.quantidadeTurnos,
                        });
                        this.playerRepository.update({
                            name: player.name,
                            posicaoTabuleiro: player.posicaoTabuleiro,
                            saldo: player.saldo,
                            eliminado: !saldoSuficiente,
                            quantidadeTurnos: player.quantidadeTurnos,
                        });
                        try {
                            if (!saldoSuficiente) {
                                this.propriedadeRepository.liberarPropriedade(
                                    player.name,
                                );
                            }
                        } catch (error) {
                            throw new AppError(
                                `erro ao liberar prop: ${player}${propriedade} ${index}`,
                            );
                        }
                    }

                    const propriedadeVazia = !propriedade.proprietario;

                    if (propriedadeVazia) {
                        const comprar = this.validaCompraPerfil(
                            player,
                            propriedade,
                        );
                        if (comprar) {
                            propriedade.proprietario = player;
                            this.playerRepository.update({
                                name: player.name,
                                posicaoTabuleiro: player.posicaoTabuleiro,
                                eliminado: player.eliminado,
                                saldo: (player.saldo -= propriedade.custoVenda),
                                quantidadeTurnos: player.quantidadeTurnos,
                            });

                            this.propriedadeRepository.update({
                                custoVenda: propriedade.custoVenda,
                                valorAluguel: propriedade.valorAluguel,
                                id: propriedade.id,
                                proprietario: propriedade.proprietario,
                            });
                        }
                    }
                }
            }
            this.resultadoFinal = this.playerRepository.findAll();

            const vencedor = this.resultadoFinal.filter(
                jogadores => jogadores.saldo >= 0,
            ).length;

            if (vencedor === 1) {
                break;
            }
        }

        this.result.jogadores = this.resultadoFinal
            .sort((a, b) => {
                if (a.saldo < b.saldo) {
                    return 1;
                }

                if (a.saldo > b.saldo) {
                    return -1;
                }

                if (a.ordemJogada > b.ordemJogada) {
                    return 1;
                }

                if (a.ordemJogada < b.ordemJogada) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })
            .map(item => {
                return item.name;
            });

        const vencedor = this.result.jogadores[0];
        this.result.vencedor = vencedor;

        return this.result;
    }

    limparCache() {
        const exists = this.playerRepository.findAll().length;

        if (exists > -1) {
            this.playerRepository.delete();
            this.propriedadeRepository.delete();
        }
    }

    validaCompraPerfil(player: Player, propriedade: Propriedade): boolean {
        let comprar = false;
        switch (player.name) {
            case 'impulsivo':
                comprar = player.saldo >= propriedade.custoVenda;
                break;
            case 'exigente':
                comprar =
                    player.saldo >= propriedade.custoVenda &&
                    propriedade.valorAluguel > 50;
                break;
            case 'cauteloso':
                comprar =
                    player.saldo >= propriedade.custoVenda &&
                    player.saldo - propriedade.custoVenda >= 80;
                break;
            case 'aleatorio':
                comprar =
                    player.saldo >= propriedade.custoVenda &&
                    Math.random() < 0.5;
                break;

            default:
                break;
        }
        return comprar;
    }
}

export { SimuladorUseCase };
