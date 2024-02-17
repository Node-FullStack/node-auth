

import { UserEntity } from "../entities/user.entity";
import { RegisterUserDTO } from '../dtos/auth/register-user.dto';
import { LoginEntity } from "../entities/login.entity";
import { LoginUserDTO } from "../dtos/auth/login-user.dto";

//La clase es abstracta porque no voy a crear instancias de esta clase 
// Solo servira para definir reglas
export abstract class AuthDatasource {

    //todo: Tarea hacer el login
    abstract login( loginUserDTO: LoginUserDTO):Promise<UserEntity>; 

    abstract register( registerUserDTO: RegisterUserDTO ):Promise<UserEntity>

}