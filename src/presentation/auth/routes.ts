import { Router } from "express";
import { AuthController } from "./controller";


export class AuthRoutes {

    //Como no haremos ninguna inyeccion de dependencias 
    //es mejor utilizar nuestras rutas como estaticas
    static get routes(): Router {
        const router = Router();
        const controller = new AuthController();

        // Definir todas mis rutas
        router.post('/login' ,controller.loginUser)
        router.post('/register' , controller.registerUser )

        return router;
    }

}