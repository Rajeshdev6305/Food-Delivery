// import jwt from 'jsonwebtoken';
// import 'dotenv/config';


//  const authMiddleware = async (req, res, next) => {
// const {token} = req.headers;
//     if (!token) {
//         return res.json({ success: false, message: 'Not Authrized Login Again' });
//     }
    
//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         // req.body.userId =token_decode.id; 
//         req.body = { userId: token_decode.id };
//         return  next();

//     } catch (error) {
//         console.log(error);}
//        return res.json({ success:false, message: 'Error' });
//     }




// export default authMiddleware;


import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Add userId to req.body, don't overwrite
    return next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

export default authMiddleware;