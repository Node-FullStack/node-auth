import { AuthDatasource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";


export class AuthDataSourceImpl implements AuthDatasource {

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {

        const { name, email, password } = registerUserDTO;

        try {
            // 1. Verificar si el email existe

            // 2. Hash de la contraseña

            // 3. Mapear la respuesta a nuestra entidad

            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ROLE_ADMIN']
            );
            
        } catch (error) {
            
            if( error  instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();

        }

    }

}