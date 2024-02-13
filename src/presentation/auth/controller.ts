import { Request, Response } from "express"
import { CustomError, RegisterUser, RegisterUserDTO } from "../../domain"
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


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
       
       new RegisterUser( this.authRepository )
            .execute( registeruserDto! )
            .then(data => res.json(data))
            .catch(err =>  this.handleError(err, res));

    }

    loginUser = (req: Request, res: Response) => {
        res.json('Login Controller')
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find().then(user => res.json({
            user: req.body.user,
        }) )
        .catch(error => res.status(500).json('Internal Server Error'));
    }

}