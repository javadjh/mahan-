import { Select } from "antd";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../styled/components/CustomButton";
const MoveDocumentsToLibraryShelfDialog = ({
  moveDocumentHandel,
  destinationId,
  setDestinationId,
}) => {
  const library = useSelector((state) => state.library);
  return (
    <Fragment>
      <h5>انتقال به پوشه</h5>
      <div>
        <div className="form-group">
          <label htmlFor="validationCustom04">انتخاب پوشه</label>
          <Select
            className="custom-select"
            onChange={(value) => {
              setDestinationId(value);
            }}
          >
            <Select.Option value={``} name={``}>
              انتخاب کنید
            </Select.Option>
            {library.libraryShelf.map((l) => (
              <Select.Option
                selected={destinationId === l._id}
                value={l._id}
                name={l._id}
              >
                {l.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <CustomButton isLeft={true} onClick={moveDocumentHandel}>
        ثبت
      </CustomButton>
    </Fragment>
  );
};
export default MoveDocumentsToLibraryShelfDialog;
