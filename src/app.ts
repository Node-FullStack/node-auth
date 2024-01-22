import { Server } from "./presentation/server";

 (() => {
    main();
    console.log(56465);
    
 })

 async function main() {
    //TODO: Generar el await de la BD

    new Server().start();
 }