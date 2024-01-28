import { Router } from "express";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {

    //Como no haremos ninguna inyeccion de dependencias 
    //es mejor utilizar nuestras rutas como estaticas
    static get routes(): Router {
        const router = Router();

        // Definir todas mis rutas
        router.use('/api/auth' , AuthRoutes.routes )

        return router;
    }

}