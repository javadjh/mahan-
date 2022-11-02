import React, { Fragment, useEffect, useState } from "react";
import AlertDialog from "../../utility/AlertDialog";
import MainLayout from "../../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteApplicantAction,
  getApplicantsAction,
  insertApplicantAction,
} from "../../stateManager/actions/ApplicantAction";
import ShowUsersRoleDialog from "../../dialog/ShowUsersRoleDialog";
import RolesTableComponent from "../../Role/roles/RolesTableComponent";
import InsertApplicantDialog from "./InsertApplicantDialog";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
import CustomDialog from "../../styled/components/CustomDialog";
import { SpaceStyled } from "../../styled/global";
import ApplicantTableComponent from "../../components/applicant/ApplicantTableComponent";
import { Col, Row } from "antd";

const ApplicantRoot = () => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicants);
  const [isUpsertDialogShow, setIsUpsertDialogShow] = useState(false);
  const [applicantId, setApplicantId] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(getApplicantsAction());
  };
  const openDeleteDialog = (id) => {
    setApplicantId(id);
  };
  const deleteApplicantsHandle = async (id) => {
    await dispatch(deleteApplicantAction(id));
  };
  const sendData = async (formData) => {
    await dispatch(insertApplicantAction(formData));
  };
  return (
    <Fragment>
      <Row justify="end" align="end">
        <Col>
          <CustomDialog
            title={"سمت سازمانی"}
            render={<InsertApplicantDialog sendData={sendData} />}
            actionRender={
              <CustomButton color={lightGreenColor}>
                افزودن سمت سازمانی
              </CustomButton>
            }
            isShow={isUpsertDialogShow}
          />
        </Col>
      </Row>
      <SpaceStyled top={30}>
        <ApplicantTableComponent
          applicants={applicants}
          deleteApplicantsHandle={deleteApplicantsHandle}
        />
      </SpaceStyled>
      {/* <AlertDialog
        title={"آیا از حذف این سمت سازمانی اطمینان دارید؟"}
        deleteHandle={deleteApplicantsHandle}
      /> */}
      {/* <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className={"row"}>
                <div className={"col-lg-8"}>
                  <div className={"row mb-1"}>
                    <button
                      onClick={() => {
                        window.$("#insertApplicantDialog").modal("show");
                      }}
                      type="button"
                      className="btn btn-success ml-3 waves-effect waves-light"
                      data-toggle="button"
                      aria-pressed="false"
                    >
                      افزودن سمت سازمانی جدید
                    </button>
                  </div>
                  <p className="card-title-desc">
                    سمت های سامانی در این قسمت تعریف میشوند
                  </p>
                </div>
              </div>
              <ApplicantTable
                applicants={applicants}
                openDeleteDialog={openDeleteDialog}
              />
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};
export default ApplicantRoot;
