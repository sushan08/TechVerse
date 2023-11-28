import mangoose from 'mongoose';
const userSchema = new mangoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
    });

const user = mangoose.model ('user', userSchema);
export default user;