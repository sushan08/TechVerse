import mongoose from 'mongoose';
import grid from 'gridfs-stream';
let gfs, gridfsBucket;
const conn= mongoose.connection;


const Connection = async (username, password)=> {
    const URL= `mongodb://${username}:${password}@ac-vyz3hqg-shard-00-00.ukedfs4.mongodb.net:27017,ac-vyz3hqg-shard-00-01.ukedfs4.mongodb.net:27017,ac-vyz3hqg-shard-00-02.ukedfs4.mongodb.net:27017/?ssl=true&replicaSet=atlas-7bywu1-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { 
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("Database Connected Succesfully");
    }catch(err) {
        console.log('error while connecting to database', err);
    }
}
export default Connection;

