const jwt = require('jsonwebtoken');



const auth = async (req, res, next)=>{
    try{
        //extract the token from the header
        const token = req.headers.authorization.split(" ")[1];
        //verify the token
       
        if(!token) return res.status(401).json({ message: "Please Login" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        //header_algorithm.payload.signature
        if(!decoded) return res.status(401).json({ message: "Invalid token" });
        
        
        

        next();
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}


module.exports= auth;