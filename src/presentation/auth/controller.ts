import { Request, Response } from "express"
import { CustomError, RegisterUserDTO } from "../../domain"
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { JwtAdapter } from "../../config";


export class AuthController {

    //Inyeccion de Dependencias
    constructor(
        private readonly authRepository: AuthRepository,
    ){}

    private handleError = ( error : unknown, res: Response ) => {
        if(error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = (req: Request, res: Response) => {
       const [error, registeruserDto] = RegisterUserDTO.create(req.body);
       if(error) return res.status(400).json({ error });
       
       this.authRepository.register( registeruserDto! )
       .then( async (user) => res.json({
        user,
        token: await JwtAdapter.generateToken({ email: user.email })
       }) )
       .catch(error => this.handleError( error, res ) )

    }

    loginUser = (req: Request, res: Response) => {
        res.json('Login Controller')
    }

}