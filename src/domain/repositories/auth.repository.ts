

import { UserEntity } from "../entities/user.entity";
import { RegisterUserDTO } from '../dtos/auth/register-user.dto';

//La clase es abstracta porque no voy a crear instancias de esta clase 
// Solo servira para definir reglas
export abstract class AuthRepository {

    //todo: Tarea hacer el login

    //
    abstract register( registerUserDTO: RegisterUserDTO ):Promise<UserEntity>

}