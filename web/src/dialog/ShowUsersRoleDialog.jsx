import React, { Fragment } from "react";
import { grayColor } from "../app/appColor";
const ShowUsersRoleDialog = ({ users, upsertIntent }) => {
  return (
    <Fragment>
      <div
        className="modal fade"
        id="showUsersRoleDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-4">
            <div className={"text-center"}>
              <h3>حذف نقش امکان پذیر نیست</h3>
              <p>
                کاربران زیر دارای این نقش میباشند لطفا ابتدا نقش آن ها عوض کنید
                سپس اقدام به حذف نمایید
              </p>
              {users.map((u) => (
                <div
                  style={{
                    backgroundColor: grayColor,
                    padding: 10,
                    width: "100%",
                    textAlign: "center",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  onClick={() => upsertIntent(u)}
                >
                  {u.firstName} {u.lastName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ShowUsersRoleDialog;
