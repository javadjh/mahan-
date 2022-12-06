import React, { Fragment, useEffect, useState } from "react";
import { just_persian } from "../../utility/inputValidators";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { useDispatch } from "react-redux";
import {
  insertLibraryShelfAction,
  updateLibraryShelfAction,
} from "../../stateManager/actions/LibraryAction";
import { Input } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import { SpaceStyled } from "../../styled/global";
export const UpsertLibraryShelfDialog = ({ libraryShelf }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (libraryShelf._id) {
      setTitle(libraryShelf.title);
    } else {
      setTitle("");
    }
  }, [libraryShelf]);

  const sendData = async () => {
    if (libraryShelf._id) {
      await dispatch(updateLibraryShelfAction({ title }, libraryShelf._id));
    } else {
      await dispatch(insertLibraryShelfAction({ title }));
    }
    setTitle("");
  };
  return (
    <Fragment>
      <div>
        <p>افزودن پوشه</p>
        <Input
          type={"text"}
          value={title}
          placeholder={"عنوان پوشه را وارد کنید..."}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <SpaceStyled top={20}>
          <CustomButton onClick={sendData} isLeft={true}>
            ثبت
          </CustomButton>
        </SpaceStyled>
      </div>
    </Fragment>
  );
};
export default UpsertLibraryShelfDialog;
