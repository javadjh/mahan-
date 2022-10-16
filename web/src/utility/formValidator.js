import React from "react";
import SimpleReactValidator from "simple-react-validator";

export const validatorSP = ()=>{
    return new SimpleReactValidator({
        messages:{
            required:"این فیلد اجباری میباشد",
            min:"بسیار کوتاه میباشد",
            max:"بسیار بلند میباشد",
            email:"ایمیل صحیح نمیباشد",

        },
        element: (e)=>(<div style={{color:"red" }}>{e}</div>)
    })
}
