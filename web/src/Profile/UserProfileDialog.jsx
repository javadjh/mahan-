import { EditOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import { useState } from "react";
import UsersProfileComponent from "../dashboard/UsersProfileComponent";
import CustomDialog from "../styled/components/CustomDialog";
import { CustomCursor } from "../styled/global";
const UserProfileDialog = () => {
  const [isProfileDialogShow, setIsProfileDialogShow] = useState(false);
  return (
    <Fragment>
      <CustomDialog
        title={"پروفایل"}
        render={<UsersProfileComponent />}
        actionRender={
          <CustomCursor onClick={() => setIsProfileDialogShow(true)}>
            <EditOutlined color={"#fff"} style={{ color: "#fff" }} />
          </CustomCursor>
        }
        isShow={isProfileDialogShow}
      />
    </Fragment>
  );
};
export default UserProfileDialog;
