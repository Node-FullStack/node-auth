import { Server } from "./presentation/server";
import { envs } from './config/envs';

 (() => {
    main();
    
 })();

 async function main() {
    //TODO: Generar el await de la BD

    new Server({port: envs.PORT}).start();
 }