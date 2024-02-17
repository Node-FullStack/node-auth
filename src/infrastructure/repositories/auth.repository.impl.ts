import { AuthDatasource, AuthRepository, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";


export class AuthReposirotyImpl implements AuthRepository {
    
    constructor(
        private readonly authDtaaSource: AuthDatasource
    ){}

    login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        return this.authDtaaSource.login( loginUserDTO );
    }

    register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDtaaSource.register( registerUserDTO );
    }


}