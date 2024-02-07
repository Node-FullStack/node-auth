import { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain"
import { AuthRepository } from '../../domain/repositories/auth.repository';


export class AuthController {

    //Inyeccion de Dependencias
    constructor(
        private readonly authRepository: AuthRepository,
    ){}

    registerUser = (req: Request, res: Response) => {
       const [error, registeruserDto] = RegisterUserDTO.create(req.body);
       if(error) return res.status(400).json({ error });
       
       this.authRepository.register( registeruserDto! )
       .then(user => res.json(user) )
       .catch(error => res.status(500).json(error) )

    }

    loginUser = (req: Request, res: Response) => {
        res.json('Login Controller')
    }

}