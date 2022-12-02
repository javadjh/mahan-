import React, { Fragment, useContext, useEffect, useState } from "react";
import { UpsertFormContext } from "../UpsertFormContext";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setManualFormPreviewAction } from "../../../stateManager/actions/FormAction";

const SelectorComponent = ({ uiId }) => {
  const dispatch = useDispatch();
  const { childrenList, setChildrenList, onUpOrDownHandle, deleteData } =
    useContext(UpsertFormContext);
  const [values, setValues] = useState([]);
  const [, setReload] = useState();
  const [title, setTitle] = useState();

  let data = childrenList.find((c) => c.uiId === uiId)
    ? childrenList.find((c) => c.uiId === uiId)
    : {};
  const init = () => {
    data = childrenList.find((c) => c.uiId === uiId);
    if (data) setValues(data.values ? data.values : []);
  };

  useEffect(() => {
    init();
  }, [data]);

  const addNewOption = () => {
    let newValues = [...values];
    newValues.push(title);
    setValues(newValues);
    setTitle("");

    data.values = newValues;
    setChange();
  };
  const deleteOption = (value) => {
    let deleteValues = [...values];
    deleteValues = deleteValues.filter((v) => v !== value);
    setValues(deleteValues);
  };

  const onChangeIsRequired = (isChecked) => {
    data.isRequired = isChecked;
    setChange();
  };

  const setChange = async () => {
    const index = childrenList.find((c) => c.uiId === uiId);
    let copy = childrenList;
    copy[index] = data;
    setChildrenList(copy);
    setReload(uuidv4());
    await dispatch(setManualFormPreviewAction(childrenList));
  };

  const onChangeLabel = (value) => {
    data.label = value;
    setChange();
  };
  return (
    <Fragment>
      {data.type ? (
        <div>
          <div>
            <div className={"row text-center mb-0"}>
              <i
                className="mdi mdi-checkbox-marked mx-3 mb-0"
                style={{ fontSize: 20 }}
              />
              <p className={"mb-0"}>دریافت چند گزینه از چند گزینه</p>
            </div>
          </div>{" "}
          <div>
            <div className="custom-control custom-checkbox col-lg-5 mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                onClick={(e) => {
                  onChangeIsRequired(e.target.checked);
                }}
                checked={data.isRequired}
                id={uiId}
              />
              <label className="custom-control-label" htmlFor={uiId}>
                آیا اجباری میباشد؟
              </label>
            </div>
            <div className={"row col-lg-12 mt-2"}>
              <div className={"col-lg-6"}>
                <input
                  id="txtFirstNameBilling"
                  type="text"
                  value={data.label}
                  onChange={(e) => {
                    onChangeLabel(e.target.value);
                  }}
                  placeholder={"عنوان / برچسب"}
                  className="form-control col-lg-12 mx-2 "
                />
              </div>
              <div className={"col-lg-6"}>
                <div className={"row col-lg-12"}>
                  <input
                    id="txtFirstNameBilling"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder={"عنوان گزینه جدید"}
                    className="form-control col-lg-8"
                  />
                  <button
                    onClick={addNewOption}
                    type="button"
                    className="btn btn-light waves-effect col-lg-4 m-0"
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </div>

            <div className={"col-lg-13 row"}>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className={"mx-1"}
              >
                <i
                  className="mdi mdi-arrow-up m-0 text-center"
                  style={{ fontSize: 15, cursor: "pointer" }}
                  onClick={() => onUpOrDownHandle(uiId, false)}
                />
                <a className={"text-center"}>{data.sortNumber}</a>
                <i
                  className="mdi mdi-arrow-down m-0 text-center"
                  style={{ fontSize: 15, cursor: "pointer" }}
                  onClick={() => onUpOrDownHandle(uiId, true)}
                />
              </div>
              <div className={"col-lg-11 mt-3"}>
                <div className="form-group row mb-0 ">
                  <div className="col-lg-12">
                    <select
                      className="custom-select"
                      onChange={(e) => {
                        deleteOption(e.target.value);
                      }}
                    >
                      {values.map((v) => (
                        <option value={v} name={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={"col-lg-10"}></div>

            <button
              onClick={() => deleteData(uiId)}
              type="button"
              className="btn btn-link waves-effect float-left col-lg-2"
              style={{ color: "red" }}
            >
              حذف از فرم
            </button>
          </div>
          <hr />
        </div>
      ) : null}
    </Fragment>
  );
};
export default SelectorComponent;
