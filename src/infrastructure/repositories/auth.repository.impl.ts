import { AuthDatasource, AuthRepository, RegisterUserDTO, UserEntity } from "../../domain";


export class AuthReposirotyImpl implements AuthRepository {
    
    constructor(
        private readonly authDtaaSource: AuthDatasource
    ){}

    register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDtaaSource.register( registerUserDTO );
    }


}