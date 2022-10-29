import React, { Fragment } from "react";
import UsersProfileComponent from "../dashboard/UsersProfileComponent";
const UserProfileDialog = () => {
  return (
    <Fragment>
      <div
        className="modal fade"
        id="userProfileDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-4">
            {/* <UsersProfileComponent/> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default UserProfileDialog;
