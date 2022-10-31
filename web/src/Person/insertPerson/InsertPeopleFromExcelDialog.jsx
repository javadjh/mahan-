import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { lightGreenColor } from "../../app/appColor";
import { insertPeopleFormExcelAction } from "../../stateManager/actions/PeopleAction";
import CustomButton from "../../styled/components/CustomButton";
import { SpaceStyled } from "../../styled/global";
import { errorToast } from "../../utility/ShowToast";
const InsertPeopleFromExcelDialog = ({ setIsUploadExcelDialogShow }) => {
  const [fileName, setFileName] = useState("انتخاب فایل");
  const [fileData, setFileData] = useState();
  const dispatch = useDispatch();

  const saveFileHandler = async (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    setFileData(file);
    setFileName("فایل اکسل انتخاب شد");
  };

  const sendData = async () => {
    if (fileData) {
      await dispatch(insertPeopleFormExcelAction(fileData));
      setIsUploadExcelDialogShow(false);
    } else errorToast("لطفا فایل را انتخاب کنید");
  };

  return (
    <Fragment>
      <div>
        <div className={"text-center"}>
          <h4>بارگذاری اشخاص حقیقی </h4>
        </div>
        <b style={{ fontSize: 15 }}>
          * نام <br />
          * نام خانوادگی <br />
          * پدر <br />
          * شماره شناسنامه <br />
          * شماره ملی <br />
          * جنسیت(خانم،آقا) <br />
          * تاریخ تولد <br />
        </b>
        <div className="custom-file mt-4">
          <input
            accept=".xls,.xlsx"
            type="file"
            onChange={(e) => {
              saveFileHandler(e.target.files);
            }}
            name={"imageUrl"}
            className="custom-file-input"
            id="customFile"
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <SpaceStyled top={20}>
          <CustomButton color={lightGreenColor} onClick={sendData}>
            ثبت
          </CustomButton>
        </SpaceStyled>
      </div>
    </Fragment>
  );
};
export default InsertPeopleFromExcelDialog;
