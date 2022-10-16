import React from "react";
import {Modal} from "antd";
import {LoopCircleLoading} from 'react-loadingg';

const LoadingDialog = ({isLoading,setIsLoading})=>{
    return(
        <Modal
            centered
            visible={isLoading}
            footer={[
            ]}
            onOk={ ()=>setIsLoading(false)}
            onCancel={()=>setIsLoading(false) }

            width={"40%"}
        >
            <div style={{width:"100%",height:150}}>
                <LoopCircleLoading/>
                <h4 style={{width:"100%",textAlign:"center"}}>در حال جستجو سند</h4>
            </div>
        </Modal>
    )
}
export default LoadingDialog