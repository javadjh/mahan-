import React, { Fragment, useContext, useEffect, useState } from "react";
import MainLayout from "../../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
  singleUserAction,
} from "../../stateManager/actions/UsersAction";
import AlertDialog from "../../utility/AlertDialog";
import { RootContext } from "../../RootComponent/RootContext";
import ChangeUsersPasswordAdminDialog from "../../dialog/ChangeUsersPasswordAdminDialog";
import { Col, Input, Row } from "antd";
import CustomDialog from "../../styled/components/CustomDialog";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor, orangeColor } from "../../app/appColor";
import { SpaceStyled } from "../../styled/global";
import UsersTableComponent from "../../components/users/UsersTableComponent";
import Auth from "../../auth/Auth";
const UsersRootComponent = ({ history }) => {
  const { handleHide } = useContext(RootContext);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState({});
  const [singleUser, setSingleUser] = useState({});
  const [isShowResetPasswordDialog, setIsShowResetPasswordDialog] =
    useState(false);
  useEffect(() => {
    getData();
  }, [searchValue]);

  useEffect(() => {
    if (singleUser._id) {
    }
  }, [singleUser]);

  const getData = async () => {
    await dispatch(getAllUsersAction({ searchValue }));
  };
  const upsertIntent = async (data) => {
    await dispatch(singleUserAction(data));
    history.push("/upsert-user");
  };
  const onOpenAlertDialogHandle = (user) => {
    setUser(user);
  };
  const deleteHandle = async (id) => {
    await dispatch(deleteUserAction(id));
  };
  const changeUsersPasswordAdminHandler = (u) => {
    setSingleUser(u);
  };
  return (
    <Fragment>
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Input
            block
            placeholder="جستجو در کاربران"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
        <Col span={11} offset={1}>
          <Auth accessList={["تعریف کاربر"]}>
            <CustomButton
              isLeft={true}
              color={lightGreenColor}
              onClick={() => upsertIntent({})}
            >
              افزودن کاربر جدید
            </CustomButton>
          </Auth>
        </Col>
      </Row>
      <SpaceStyled top={20}>
        <UsersTableComponent
          users={users}
          deleteHandle={deleteHandle}
          upsertIntent={upsertIntent}
          isShowResetPasswordDialog={isShowResetPasswordDialog}
          onOpenAlertDialogHandle={onOpenAlertDialogHandle}
        />
      </SpaceStyled>
    </Fragment>
  );
};
export default UsersRootComponent;
