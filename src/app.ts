import { Server } from "./presentation/server";
import { envs } from './config/envs';
import { AppRoutes } from "./presentation/routes";

 (() => {
    main();
    
 })();

 async function main() {
    //TODO: Generar el await de la BD

    new Server({port: envs.PORT, routes: AppRoutes.routes}).start();
 }