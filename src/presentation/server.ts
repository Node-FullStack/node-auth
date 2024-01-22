import express from 'express'

export class Server {

    //Inicializamos Xpress
    public readonly app = express()
    
    constructor() {}

    async start(){
        this.app.listen(3035 , () => {
            console.log(`Server running on port ${ 3035 }`);
        });
    }
}