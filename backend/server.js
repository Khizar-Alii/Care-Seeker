import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';

const port = process.env.PORT || 3000;

// CLOUDINARY_CLIENT_NAME = "dodvkozwj"
// CLOUDINARY_CLIENT_API = "932539191499468"
// CLOUDINARY_CLIENT_SECRET = "IXPecTyX_0cQRezd7v3ZJYjYfeI"
          
// cloudinary.config({ 
//   cloud_name: 'JOB_SEEKING_MERN_APPLICATION', 
//   api_key: '471159876549523', 
//   api_secret: 'k75PIAa6aX_CLGPtrk7G4vP2HBk'
// });

cloudinary.config({ 
  cloud_name: 'dodvkozwj', 
  api_key: '932539191499468', 
  api_secret: 'IXPecTyX_0cQRezd7v3ZJYjYfeI'
});

app.listen(port ,() => {
  console.log(`App listening on ${port}`);
});
