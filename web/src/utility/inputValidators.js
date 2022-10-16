export const just_persian = (str)=>{
    let p = /^[\u0600-\u06FF\s]+$/;

    if (!p.test(str)) {
        return false
    }else{
        return true
    }
}

export const just_password = (str)=>{
    let p = /^[A-Za-z][A-Za-z0-9]*$/

    return p.test(str);
}
export const just_english = (str)=>{
    let p = /^[a-zA-Z şüöı _ -]+$/;

    if (!p.test(str)) {
        return false
    }else{
        return true
    }
}

export const just_english_and_digit = (str)=>{
    let p = /^[a-zA-Z şüöı _ - 0-9]+$/;

    if (!p.test(str)) {
        return false
    }else{
        return true
    }
}

export const melliCodeValidator = (value)=>{
    if(value.length!==10){
        return false
    }else{
        let L=value.length;

        if(L<8 || parseInt(value,10)==0) return false;
        value=('0000'+value).substr(L+4-10);
        if(parseInt(value.substr(3,6),10)==0) return false;
        let c=parseInt(value.substr(9,1),10);
        let s=0;
        for(let i=0;i<9;i++)
            s+=parseInt(value.substr(i,1),10)*(10-i);
        s=s%11;
        let isValid = (s<2 && c===s) || (s>=2 && c===(11-s));
        if(isValid){
            return true
        }
        return false
    }
}

