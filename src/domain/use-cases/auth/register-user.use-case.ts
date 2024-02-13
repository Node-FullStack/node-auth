import { JwtAdapter } from '../../../config';
import { RegisterUserDTO } from '../../dtos/auth/register-user.dto';
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

interface RegisterUserUseCase {
    execute( registerUserDTO: RegisterUserDTO ): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SingToken = JwtAdapter.generateToken
    ){}

    async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {

        const user = await this.authRepository.register(registerUserDTO);

        const token = await this.singToken({ id: user.id, email: user.email });
        if( !token ) throw CustomError.internalServer( 'Error generating Token' );
        
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

}