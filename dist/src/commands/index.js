"use strict";
/*
Crie uma pasta vazia, e entre nela com o "cd"
$ yarn init -y
$ yarn add typescript @types/node -D
$ yarn add express uuid
$ yarn add @types/uuid -D
$ yarn add -D @types/express
$ yarn add ts-node-dev -D
"scripts": {
    "dev": "ts-node-dev src/app.ts"
}
$ yarn tsc --init


yarn add typeorm reflect-metadata pg dotenv
ts config -> {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
}
    
docker run --name postgres-kenzie -e POSTGRES_USER=caio -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:14.3-alpine

yarn typeorm migration:create src/migrations/initialMigration

yarn typeorm migration:generate src/migrations/createTables -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts

docker exec api_entrega_s5 yarn typeorm migration:run -d src/data-source.ts

attention data source db_user .....

yarn add express-async-errors
importar no app express-async-errors
fazer middleware, chamar app.use ndo middleware e criar pasta error e fazer extend do error para appError

yarn add bcryptjs

yarn add @types/bcryptjs

*/
