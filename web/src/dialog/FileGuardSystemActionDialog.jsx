import React, { useEffect, useState } from "react";
import {
  fileConfirmAction,
  rejectFileAction,
} from "../stateManager/actions/FileAction";
import { useDispatch } from "react-redux";
import TicketsTableComponent from "../ArchiveTree/document/tickets/TicketsTableComponent";
import { Input } from "antd";
import CustomButton from "../styled/components/CustomButton";
import { lightGreenColor, redColor } from "../app/appColor";
import CorrespondenceTable from "../newFile/general/CorrespondenceTable";
import { CenterStyled } from "../styled/global";
import CustomTextArea from "../styled/components/CustomTextArea";
const FileGuardSystemActionDialog = ({ item, setReload, isReject }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const confirmFile = async () => {
    await dispatch(fileConfirmAction(item?._id));
    setReload(Date.now());
  };

  const rejectFile = async () => {
    await dispatch(rejectFileAction(item?._id, { message }));
    setReload(Date.now());
  };
  return (
    <div>
      <CenterStyled>
        <h3>عملیات پرونده ها</h3>
      </CenterStyled>

      {isReject ? (
        <>
          <CenterStyled>
            <p>آیا از رد پرونده اطمینان دارید؟</p>
          </CenterStyled>
          <Input.TextArea
            label="پیام"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            name={"message"}
            className={"form-control"}
            placeholder={"پیام رد پرونده (دلایل)..."}
          />
          <br />
          <br />
          <CustomButton isLeft={true} onClick={rejectFile} color={redColor}>
            رد پرونده
          </CustomButton>
        </>
      ) : (
        <>
          <CenterStyled>
            <p>آیا از تایید پرونده اطمینان دارید؟</p>
          </CenterStyled>
          <br />
          <br />
          <CustomButton
            isLeft={true}
            onClick={confirmFile}
            color={lightGreenColor}
          >
            تایید پرونده
          </CustomButton>
        </>
      )}
      <div className={"mt-3"}>
        <CorrespondenceTable correspondence={item?.correspondence} />
      </div>
    </div>
  );
};
export default FileGuardSystemActionDialog;
