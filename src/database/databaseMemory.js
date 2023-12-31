import { randomUUID } from "crypto";

class databaseMemory {
    #products = new Map();

    list(search) {
       return Array.from(this.#products.entries()).map((productArray) => {
            const id = productArray[0];
            const data = productArray[1];

            return {
                id,
                ...data
            }
       }).filter(product => {
        if(search)  {
            return product.name.includes(search);
        }
        return true;

       });
    }

    create(product) {
        const productID = randomUUID();
        this.#products.set(productID, product);
    }

    update(id, product) {
        this.#products.set(id, product);
    }

    delete(id) {
        this.#products.delete(id);
    }
}

export default new databaseMemory();
