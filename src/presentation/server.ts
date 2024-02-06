import express, { Router } from 'express'

interface IOptions {
    port?: number
    routes: Router
}

export class Server {

    //Inicializamos express
    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;
    
    constructor( options: IOptions ) {
        const { port = 3000, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){

        // Middleware <-- funciones que se ejecutan antes de otras funciones
        this.app.use(express.json()); // Body type JSON
        this.app.use(express.urlencoded({ extended: true })); // Body type x-www-formurlendoced

        // Usar las rutas
        this.app.use( this.routes );
        // Escuchar el puerto
        this.app.listen(this.port, () => {
            console.log('Aplicacion ejecutandose en el pueto: ' + this.port);
            
        });
    }
}