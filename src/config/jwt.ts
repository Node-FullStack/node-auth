import jwt from 'jsonwebtoken';

export class JwtAdapter {
    
    static async generateToken( payload: Object, duration: string = '2h' ): Promise<string|null> {

        return new Promise((resolve) => {
            jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
                if (err) resolve(null);
                resolve(token!);
            })
        });

    }
    
    static validateToken<T>( token: string ): Promise<T | null>{

        return new Promise((resolve, reject) => {
            jwt.verify(token, 'SEED', (err, decoded) => {
                if (err) resolve(null);

                resolve(decoded as T);
            })
        })

    }
}