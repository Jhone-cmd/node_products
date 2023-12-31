import { randomUUID } from "crypto";
import sql from "./db.js";

class databasePostgres {

    async list(search) {
       let products;

       if(search) {
            products = await sql`select * from products where name ilike ${"%" + search + "%"}`;
       } else {
            products = await sql`select * from products`;
       }

       return products;
    }

    async create(product) {
        const productID = randomUUID();
        const { name, description, price } = product;
        return  await sql`insert into products(id, name, description, price) values (${productID}, ${name}, ${description}, ${price})`;
    }

    async update(id, product) {
        const { name, description, price } = product;

        if(name) {
            return await sql`update products set name = ${name} where id = ${id}`;
        } else if(description) {
            return await sql`update products set description = ${description} where id = ${id}`;
        } else if(price) {
            return await sql`update products set price = ${price} where id = ${id}`;
        } else if(name && description && price) {
            return await sql`update products set name = ${name}, description = ${description}, price = ${price} where id = ${id}`;
        }
    }

    async delete(id) {
        return await sql`delete from products where id = ${id}`;
    }
}

export default new databasePostgres();
