module.exports.accessValidator = (targets,access)=>{


    for (let i = 0; i <access.length; i++) {
        for (let j = 0; j <targets.length; j++) {
            if(access[i].title===(targets[j])){
                return true
            }
        }
    }
    return false

}
