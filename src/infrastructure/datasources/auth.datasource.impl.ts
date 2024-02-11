import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSourceImpl implements AuthDatasource {

    constructor(
        private readonly hashFunction: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction = BcryptAdapter.compare
    ){}

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
            // Todo: Falta un mapper
            return new UserEntity(
                user.id,
                name,
                email,
                user.password,
                user.roles
            );
            
        } catch (error) {
            
            if( error  instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();

        }

    }

}