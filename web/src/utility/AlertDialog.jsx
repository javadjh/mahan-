import React, { Fragment } from "react";
const AlertDialog = ({ title, deleteHandle, dialogId = "alertDialog" }) => {
  return (
    <Fragment>
      <div
        className="modal fade"
        id={dialogId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <i
              className="mdi mdi-shield-alert"
              style={{ fontSize: 70, color: "orange", textAlign: "center" }}
            />
            <div className="modal-body">
              <h3 className={"text-3"} style={{ textAlign: "center" }}>
                {title}
              </h3>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: "center" }}>
                قادر به بازگردانی این عمل نخواهید بود!
              </p>
            </div>
            <div className={"m-4 text-center"}>
              <button
                className="btn btn-success waves-effect waves-light mx-2 w-md"
                data-dismiss="modal"
                type="submit"
                onClick={deleteHandle}
              >
                حذف
              </button>
              <button
                className="btn btn-danger waves-effect waves-light mx-2 w-md"
                data-dismiss="modal"
                type="submit"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AlertDialog;
