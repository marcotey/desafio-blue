import {
    IPropriedadeDTO,
    IPropriedadeRepository,
} from '@modules/customers/repositories/IPropriedadeRepository';

import { Propriedade } from '../Propriedades';

class PropriedadeRepository implements IPropriedadeRepository {
    propriedades: Propriedade[] = [];

    async create(id: number): Promise<void> {
        const newProp = new Propriedade(id);

        this.propriedades.push(newProp);
    }

    async liberarPropriedade(name: string): Promise<void> {
        this.propriedades.map((propriedade, indice) => {
            const newItem = propriedade;
            if (
                propriedade.proprietario &&
                propriedade.proprietario.name === name
            ) {
                Object.assign(this.propriedades[indice], {
                    id: propriedade.id,
                    custoVenda: propriedade.custoVenda,
                    valorAluguel: propriedade.valorAluguel,
                    proprietario: null,
                });
            }
            return newItem;
        });
    }

    async update({
        id,
        custoVenda,
        valorAluguel,
        proprietario,
    }: IPropriedadeDTO): Promise<void> {
        const index = this.propriedades.findIndex(obj => obj.id === id);

        Object.assign(this.propriedades[index], {
            id,
            custoVenda,
            valorAluguel,
            proprietario,
        });
    }
    findById(id: number): Propriedade {
        return this.propriedades.find(prop => prop.id === id);
    }
    delete(): void {
        const { length } = this.propriedades;
        this.propriedades.splice(0, length);
    }
}

export { PropriedadeRepository };
