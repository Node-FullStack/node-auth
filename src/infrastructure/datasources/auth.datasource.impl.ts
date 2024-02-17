import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSourceImpl implements AuthDatasource {

    constructor(
        private readonly hashFunction: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction = BcryptAdapter.compare
    ){}


    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        const { email, password } = loginUserDTO;

        try {

            const existEmail = await UserModel.findOne({ email });
            if( !existEmail ) throw CustomError.badRequest('User no exist');

            const passwordByCrypt: boolean  = this.compareFunction( password, existEmail.password );

            if( !passwordByCrypt ) throw CustomError.badRequest('Password not found');

            const user = await UserModel.findOne({ email });

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject( user! );
            
        } catch (error) {
            
            if( error  instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {

        const { name, email, password } = registerUserDTO;

        try {
            // 1. Verificar si el email existe
            const existEmail = await UserModel.findOne({ email });
            if( existEmail ) throw CustomError.badRequest('User already exists');

            // 2. Hash de la contraseña

            const user = await UserModel.create({
                name,
                email,
                password: this.hashFunction( password )
            });

            await user.save();


            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject( user );
            
        } catch (error) {
            
            if( error  instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();

        }

    }

}