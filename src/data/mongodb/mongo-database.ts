import mongoose from "mongoose";

interface Options {
    mongiUrl: string;
    dbName: string;
}


export class MongoDataBase{

    static async connect( options: Options ){

        const { dbName, mongiUrl } = options;

        try {
            await mongoose.connect( mongiUrl , {
                dbName: dbName
            } );
        } catch (error) {

            console.error( 'Mongo connection error' );
            throw error;
        }

    }

}