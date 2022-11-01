import React, { Fragment, useContext, useEffect, useState } from "react";
import AlertDialog from "../../utility/AlertDialog";
import UsersTableComponent from "../../User/users/UsersTableComponent";
import MainLayout from "../../RootComponent/MainLayout";

import { useDispatch, useSelector } from "react-redux";
import {
  clearDeleteRoleAction,
  deleteRoleAction,
  getAllRolesAction,
  insertSingleRoleAction,
} from "../../stateManager/actions/RolesAction";
import ShowUsersRoleDialog from "../../dialog/ShowUsersRoleDialog";
import { singleUserAction } from "../../stateManager/actions/UsersAction";
import { RootContext } from "../../RootComponent/RootContext";
import { Col, Row } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import CustomDialog from "../../styled/components/CustomDialog";
import { lightGreenColor } from "../../app/appColor";
import { SpaceStyled } from "../../styled/global";
import RolesTableComponent from "../../components/roles/RolesTableComponent";
const RolesRootComponent = ({ history }) => {
  const { handleHide } = useContext(RootContext);
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles);
  const deleteRole = useSelector((state) => state.deleteRole);
  const [singleRole, setSingleRole] = useState({});
  const [isShowDialogUsers, setIsShowDialogUsers] = useState(false);
  useEffect(() => {
    getData();
    return () => {
      dispatch(clearDeleteRoleAction());
    };
  }, []);
  const getData = async () => {
    await dispatch(getAllRolesAction());
  };
  const upsertRoleHandle = async (data) => {
    await dispatch(insertSingleRoleAction(data));
    history.push("/upsert-role");
  };
  const onOpenAlertDialogHandle = (user) => {
    setSingleRole(user);
  };
  const deleteHandle = async (id) => {
    await dispatch(deleteRoleAction(id));
  };
  useEffect(() => {
    if (deleteRole.hasUser) showUserDialog();
  }, [deleteRole]);
  const showUserDialog = () => {
    setIsShowDialogUsers(true);
  };
  const upsertIntent = async (data) => {
    await dispatch(singleUserAction(data));
    history.push("/upsert-user");
  };
  return (
    // <MainLayout title={"لیست نقش های سامانه"}>
    //
    //   <AlertDialog
    //     title={"آیا از حذف این نقش مطمعن هستید؟"}
    //     deleteHandle={deleteHandle}
    //   />
    //   <div className="row">
    //     <div className="col-12">
    //       <div className="card">
    //         <div className="card-body">
    //           <div className={"row"}>
    //             <div className={"col-lg-8"}>
    //               <div className={"row mb-1"}>
    //                 <button
    //                   hidden={handleHide("الگوی دسترسی")}
    //                   onClick={() => {
    //                     upsertRoleHandle({});
    //                   }}
    //                   type="button"
    //                   className="btn btn-success ml-3 waves-effect waves-light"
    //                   data-toggle="button"
    //                   aria-pressed="false"
    //                 >
    //                   افزودن نقش جدید
    //                 </button>
    //               </div>
    //               <p className="card-title-desc">
    //                 تمامی نقش های سامانه را می توانید در لیست زیر مشاهده و
    //                 مدیریت نمایید
    //               </p>
    //             </div>
    //           </div>
    //           <RolesTableComponent
    //             onOpenAlertDialogHandle={onOpenAlertDialogHandle}
    //             roles={roles}
    //             upsertRoleHandle={upsertRoleHandle}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </MainLayout>
    <Fragment>
      <CustomDialog
        title={"کاربران"}
        render={
          <ShowUsersRoleDialog
            users={deleteRole.usersRole}
            upsertIntent={upsertIntent}
          />
        }
        isShow={isShowDialogUsers}
      />
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <Row justify="end" align="middle">
            <Col>
              <CustomButton
                color={lightGreenColor}
                onClick={() => {
                  upsertRoleHandle({});
                }}
              >
                افزودن نقش جدید
              </CustomButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <SpaceStyled top={20}>
        <RolesTableComponent
          roles={roles}
          deleteHandle={deleteHandle}
          upsertRoleHandle={upsertRoleHandle}
        />
      </SpaceStyled>
    </Fragment>
  );
};
export default RolesRootComponent;
