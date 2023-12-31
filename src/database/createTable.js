import sql  from "./db.js";

sql`
    CREATE TABLE products (
        id TEXT primary key,
        name TEXT,
        description TEXT,
        price real
    )
`
.then(() => {
    console.log('Table Created Successfully');
});
