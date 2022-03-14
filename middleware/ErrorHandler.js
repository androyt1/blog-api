const ErrorHandler=(err,req,res,next)=>{
    const errCode=res.statusCode===200 ? 500 : res.statusCode
    res.statusCode=errCode
    res.json({
        message:err.message
    })
}

module.exports=ErrorHandler