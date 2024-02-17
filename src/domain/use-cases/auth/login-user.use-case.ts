import { JwtAdapter } from '../../../config';
import { LoginUserDTO } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
    execute( loginUserDTO: LoginUserDTO ): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SingToken = JwtAdapter.generateToken
    ){}

    async execute(loginUserDTO: LoginUserDTO): Promise<UserToken> {

        const user = await this.authRepository.login(loginUserDTO);

        const token = await this.singToken({ id: user.id, email: user.email });
        if( !token ) throw CustomError.internalServer( 'Error generating Token' );
        
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        };
    }

}