import React , { Fragment } from 'react'
const ShowUsersRoleDialog = ({users,upsertIntent})=>{
    return(
        <Fragment>
            <div className="modal fade" id="showUsersRoleDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div className={"text-center"}>
                            <h3>حذف نقش امکان پذیر نیست</h3>
                            <p>کاربران زیر دارای این نقش میباشند لطفا ابتدا نقش آن ها عوض کنید سپس اقدام به حذف نمایید</p>
                            {users.map(u=>(
                                <div>
                                    <button type="button"
                                            data-dismiss="modal"
                                            onClick={()=>upsertIntent(u)}
                                            className="btn btn-warning w-md waves-effect waves-light my-1">{u.firstName} {u.lastName}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ShowUsersRoleDialog
