import { Router } from "express";


export class AuthRoutes {

    //Como no haremos ninguna inyeccion de dependencias 
    //es mejor utilizar nuestras rutas como estaticas
    static get routes(): Router {
        const router = Router();

        // Definir todas mis rutas
        router.post('/login' , (req, res) => {
            res.json('Login')
        } )
        router.post('/register' , (req, res) => {
            res.json('register')
        } )

        return router;
    }

}