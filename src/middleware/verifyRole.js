import jwt from 'jsonwebtoken'
export const verifyRoleAdmin = (req,res,next) => {
    const token  = req.headers.token?.split(' ')[1]
    if(!token){
        return res.status(400).json({
            err: 1,
            mess: 'yêu cầu quyền admin'
        })
    }
    jwt.verify(token,'abcdefgh',(err,decode)=> {
        // console.log(decode)
        if(err) return res.status(400).json({
            err: 1,
            mess:'aceess token không hợp lệ hoặc hết hạn'
        })
        if(decode?.isAdmin){
            next()
        }else{
            return res.status(403).json({
                err: 1,
                mess:'required role admin'
            })
        }
    })
}