import React, { useContext, useEffect, useRef, useState } from "react";
import MainLayout from "../../RootComponent/MainLayout";
import BaseInformationUpsertUserComponent from "./BaseInformationUpsertUserComponent";
import SecondInformationUpsertUserComponent from "./SecondInformationUpsertUserComponent";
import { validatorSP } from "../../utility/formValidator";
import { UpsertUserContext } from "./UpsertUserContext";
import { useDispatch, useSelector } from "react-redux";
import {
  insertUserAction,
  updateUserAction,
  upsertUserDataAction,
} from "../../stateManager/actions/UsersAction";
import { useHistory } from "react-router";
import { Form, Row } from "antd";
const UpsertUserRootComponent = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const upsertUserData = useSelector((state) => state.upsertUserData);
  const singleUser = useSelector((state) => state.singleUser);
  const {
    firstName,
    setFirstName,
    id,
    setId,
    email,
    setEmail,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    userName,
    setUserName,
    password,
    dataRole,
    setDataRole,
    formValidator,
    position,
    setPosition,
    showMelliCodeError,
    setShowMelliCodeError,
    setReloadValidator,
    fileAccess,
  } = useContext(UpsertUserContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(upsertUserDataAction());
  };

  useEffect(() => {
    if (singleUser._id) {
      setId(singleUser._id);
      setFirstName(singleUser.firstName);
      setLastName(singleUser.lastName);
      setPhoneNumber(singleUser.phoneNumber);
      setUserName(singleUser.userName);
      setDataRole(singleUser.role);
      setId(singleUser._id);
      setEmail(singleUser.email);
      setPosition(singleUser.position);
      setShowMelliCodeError(false);
    }
  }, [singleUser]);
  const sendData = async () => {
    if (!showMelliCodeError) {
      if (singleUser._id) {
        if (
          dataRole &&
          firstName &&
          lastName &&
          phoneNumber &&
          position &&
          userName
        ) {
          await dispatch(
            updateUserAction(
              singleUser._id,
              {
                role: dataRole,
                firstName,
                lastName,
                phoneNumber,
                position,
              },
              history
            )
          );
        }
      } else {
        if (formValidator.current.allValid()) {
          let data = {
            role: dataRole,
            firstName,
            lastName,
            phoneNumber,
            userName,
            email,
            position,
          };
          if (singleUser._id)
            await dispatch(updateUserAction(singleUser._id, data, history));
          else {
            data.password = password;
            await dispatch(insertUserAction(data, history));
          }
        } else {
          formValidator.current.showMessages();
          setReloadValidator(0);
        }
      }
    }
  };
  return (
    <div>
      <Form layout="vertical">
        <Row>
          <BaseInformationUpsertUserComponent />
          <SecondInformationUpsertUserComponent
            getData={getData}
            upsertUserData={upsertUserData}
            sendData={sendData}
          />
        </Row>
      </Form>
    </div>
  );
};
export default UpsertUserRootComponent;
