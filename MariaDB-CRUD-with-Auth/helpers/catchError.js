module.exports = (requestHandler) => {
  return async (req,res,next) => {
    try{
      return await requestHandler(req,res,next)
    }catch(err){
      next(err)
    }
  }
}