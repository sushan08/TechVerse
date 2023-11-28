import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import {upload,handleCloudinaryUpload} from '../utils/upload.js';

const url = 'http://localhost:8000';

// let gfs, gridfsBucket;
// const conn= mongoose.connection;

// conn.once('open', () => {
//     console.log('connected');
//     gridfsBucket= new mongoose.mongo.GridFSBucket(conn.db,{
//         bucketName: 'fs'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// });

export const uploadImage = async (request, response) => {
    try{
       const b64 = Buffer.from(request.file.buffer).toString('base64');
        let dataURI = `data:${request.file.mimetype};base64,${b64}`;
        const cldRes = await handleCloudinaryUpload(dataURI);
        response.status(200).json({msg: "File uploaded successfully", data: cldRes});
    }catch (error){
        return response.status(500).json({msg: error.message});
    }

};

export const getImage = async (request, response) => {
    try{
       const file = await gfs.files.findOne({ filename: request.params.filename });
       const readStream = gridfsBucket.openDownloadStream(file._id);
       readStream.pipe(response);
       
       readStream.on('end', () => {
           readStream.destroy();
       });
    }catch (error){
        return response.status(500).json({msg: error.message});
    }
}


