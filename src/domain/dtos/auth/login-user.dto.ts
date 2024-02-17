import { Validators } from "../../../config";


export class LoginUserDTO {

    private constructor(
        public email: string,
        public password: string
    ){}

    static login(object: {[key: string]: any}): [string?, LoginUserDTO?] {

        const { email, password } = object;

        if ( !email ) return [ 'Missing Email' ];
        if ( !password ) return [ 'Missing Password' ];
        if( !Validators.email.test(email) ) return [ 'Email is not valid' ]

        return [undefined, new LoginUserDTO(email.toLowerCase(), password)];
    }

}