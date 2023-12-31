import fastify  from "fastify";
import databasePostgres from "./database/databasePostgres.js";
import "dotenv/config";
// import databaseMemory from "./database/databaseMemory.js";

const server = fastify();

//* Routes

server.get("/", () => {
    return `
    Para consumir esta API de Produtos, você pode usar o Insomnia, o Postman ou outra plataforma conforme o seu gosto.

    Obs.: Para visualizar todos os produtos, por favor utilize a rota url/products.

    Atenciosamente,
    `
});

server.post('/products', async (req, res) => {
    const { name, description, price } = req.body;

    await databasePostgres.create({
        name,
        description,
        price
    });
    return res.status(201).send();
});

server.get("/products", async (req) => {
    const search = req.query.search;
    const products = await databasePostgres.list(search);
    return products;
});

server.put("/products/:id", async (req, res) => {
    const productID = req.params.id;
    const { name, description, price } = req.body;

    await databasePostgres.update(productID, {
        name,
        description,
        price
    });
    return res.status(204).send();
});

server.delete("/products/:id", async (req, res) => {
    const productID = req.params.id;
    await databasePostgres.delete(productID);
    return res.status(204).send();
});

server.listen({
    port: process.env.PORT
});
