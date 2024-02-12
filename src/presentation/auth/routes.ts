import { Router } from "express";
import { AuthController } from "./controller";
import { AuthReposirotyImpl } from '../../infrastructure/repositories/auth.repository.impl';
import { AuthDataSourceImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class AuthRoutes {

    //Como no haremos ninguna inyeccion de dependencias 
    //es mejor utilizar nuestras rutas como estaticas
    static get routes(): Router {
        const router = Router();
        // Esta es la base de datos a la que voy a llegar.
        const database = new AuthDataSourceImpl();
        const authReposiroty = new AuthReposirotyImpl(database);
        const controller = new AuthController(authReposiroty);

        // Definir todas mis rutas
        router.post('/login' ,controller.loginUser)
        router.post('/register' , controller.registerUser )
        router.get('/', [AuthMiddleware.validateJWT] ,controller.getUsers )

        return router;
    }

}