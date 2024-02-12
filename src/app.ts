import { Server } from "./presentation/server";
import { envs } from './config/envs';
import { AppRoutes } from "./presentation/routes";
import { MongoDataBase } from "./data/mongodb";

 (() => {
    main();
    
 })();

 async function main() {
    await MongoDataBase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongiUrl: envs.MONGO_URL 
    })

    new Server({port: envs.PORT, routes: AppRoutes.routes}).start();
 }