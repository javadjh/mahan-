export const setLoadingAction = (loading)=>{
    return async (dispatch)=>{
        await dispatch({type:"LOADING",payload:loading})
    }
}
