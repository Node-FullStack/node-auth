import express from 'express'

interface IOptions {
    port?: number
}

export class Server {

    //Inicializamos express
    public readonly app = express()
    private readonly port: number;
    
    constructor( options: IOptions ) {
        const { port = 3000 } = options;
        this.port = port;
    }

    async start(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion ejecutandose en el pueto: ' + this.port);
            
        });
    }
}