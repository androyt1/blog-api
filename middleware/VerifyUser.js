const jwt=require('jsonwebtoken');
const ACCESS_TOKEN=process.env.JWT_SECRET;

const verifyToken=(req,res,next)=>{       
    let token=req.headers['x-access-token'] || req.headers['authorization'];        
   if(!token){
       return res.status(401).json({
           success:false,
           error:'Access denied, No token provided' 
       })
   }
   token=token.split(' ')[1];  
   if(!token){
       return res.status(401).json({
           success:false,
           error:'Access denied, No token provided'
       })
   }
   try{
       const decoded=jwt.verify(token,ACCESS_TOKEN);       
       req.user=decoded.id;
       next();       
   }
    catch(err){
        return res.status(400).json({
            success:false,
            error:'Invalid token'
        })
    }
}


module.exports=verifyToken