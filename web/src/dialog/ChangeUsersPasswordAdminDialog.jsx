import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsersPasswordAdminAction } from "../stateManager/actions/UsersAction";
import CustomButton from "../styled/components/CustomButton";
const ChangeUsersPasswordAdminDialog = ({ user }) => {
  const userChanged = useSelector((state) => state.userChanged);
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const sendData = async () => {
    await dispatch(changeUsersPasswordAdminAction(user._id));
  };
  useEffect(() => {
    if (userChanged.password) setPassword(userChanged.password);
  }, [userChanged]);

  useEffect(() => {
    setPassword(null);
  }, [user]);
  return (
    <div>
      <div>
        <h3>تغییر کلمه عبور</h3>
        <p>آیا از تغییر کلمه ی عبور کاربر زیر مطمعن هستید؟</p>

        {user._id ? (
          <div>
            <p>
              نام: {user.firstName} {user.lastName}
            </p>
            <p>نام کاربری: {user.userName}</p>
          </div>
        ) : null}

        {password ? (
          <div className={"mt-3"}>
            <p>کلمه عبور جدید: {password}</p>
          </div>
        ) : null}

        <CustomButton hidden={password} onClick={sendData}>
          تغییر کلمه عبور
        </CustomButton>
      </div>
    </div>
  );
};
export default ChangeUsersPasswordAdminDialog;
