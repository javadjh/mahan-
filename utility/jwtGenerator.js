const Jwt = require('jsonwebtoken')
module.exports.jwtGenerator = (data)=>{
    return Jwt.sign(data, "=WA8xcp&qPesz%YJ4RFBq");
}
