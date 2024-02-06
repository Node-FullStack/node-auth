import { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain"


export class AuthController {

    constructor(){}

    registerUser = (req: Request, res: Response) => {
       const [error, registeruserDto] = RegisterUserDTO.create(req.body);
       if(error) return res.status(400).json({ error });
       res.json( registeruserDto )
    }

    loginUser = (req: Request, res: Response) => {
        res.json('Login Controller')
    }

}