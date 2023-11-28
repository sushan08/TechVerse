
import multer from 'multer';
import dotenv from 'dotenv';
// import {GridFsStorage} from 'multer-gridfs-storage';
// import { Storage } from '@google-cloud/storage';
import cloudinary from 'cloudinary';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL= `mongodb://${username}:${password}@ac-vyz3hqg-shard-00-00.ukedfs4.mongodb.net:27017,ac-vyz3hqg-shard-00-01.ukedfs4.mongodb.net:27017,ac-vyz3hqg-shard-00-02.ukedfs4.mongodb.net:27017/?ssl=true&replicaSet=atlas-7bywu1-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const storage = new GridFsStorage({
//     url: URL,

//     file: (request, file) => {
//         console.log(file);
//         // console.log(request);
//         return new Promise((resolve, reject) => {
//             const filename = `${Date.now()}-blog-${file.originalname}`;
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: "photos"
//             };
//             resolve(fileInfo);
//             console.log(fileInfo);
//         });
//         // const match = ["image/png", "image/jpg"];
 
//         // if(!match.includes(file.memeType)) 
//         //     return`${Date.now()}-blog-${file.originalname}`;
 
//         // return {
//         //     bucketName: "photos",
//         //     filename: `${Date.now()}-blog-${file.originalname}`
//         // }
//     }
//  });

export async function handleCloudinaryUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
}

const storage = multer.memoryStorage();
export const upload = multer({storage});