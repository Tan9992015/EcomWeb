import db from '../models'
import bcrypt from 'bcrypt'
import {generateAccessToken,generateRefreshToken} from './jwt'
const hashPassword = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8))
}
export const registerService = (body) => new Promise(async (resolve, reject) => {
  try {
      const { email, password, confirmPassword } = body;
      const checkExist = await db.User.findOne({ email: email });
      if (checkExist) {
          resolve({
              err: 1,
              mess: 'Email đã tồn tại, vui lòng chọn email khác',
          });
          return;
      }
      if (password !== confirmPassword) {
          resolve({
              err: 1,
              mess: 'Password và confirm password không khớp',
          });
          return;
      }
      const response = await db.User.create({
          email,
          password: hashPassword(password)
      });
      resolve({
          err:response ? 0 : 1,
          mess: response ? 'Đăng ký thành công' : 'đăng ký thất bại',
          data: response
      });
  } catch (error) {
      reject(error);
  }
});

export const loginService = (body) => (new Promise(async(resolve,reject)=> {
    try {
        const {email,password} = body
        const response1 = await db.User.findOne({
            email
        })
        if(!response1){
          resolve({
            err: 1,
            mess: 'sai email đăng nhập'
          })
          return
        }
       const isChecked = response1 && bcrypt.compareSync(password,response1.password)
       const accessToken = await generateAccessToken({id: response1.id, isAdmin: response1.isAdmin})
       const refreshToken = await generateRefreshToken({id: response1.id, isAdmin: response1.isAdmin})
        resolve({
            err: isChecked ? 0 : 1,
            mess: isChecked ? 'đăng nhập thành công' : 'đăng nhập thất bại do sai mật khẩu',
            accessToken:isChecked ? `Beare ${accessToken}`: null,
            refreshToken:isChecked ? refreshToken : null
        })
    }catch(error){
        reject(error)
    }
}))

