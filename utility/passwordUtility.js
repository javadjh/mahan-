const bcrypt = require('bcrypt')
module.exports.genPassword = async (password)=>{
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password,salt)
}
