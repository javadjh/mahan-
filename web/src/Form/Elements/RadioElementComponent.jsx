import React, { useContext, useEffect, useState } from "react";
import { ElementsContext } from "./ElementsContext";
import { v4 as uuidv4 } from "uuid";
import { setManualFormPreviewAction } from "../../stateManager/actions/FormAction";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
const RadioElementComponent = ({ option, isDisable, isPreview }) => {
  const [values, setValues] = useState([]);
  const { childrenList, setChildrenList } = useContext(ElementsContext);
  const formPreview = useSelector((state) => state.formPreview);
  const [, setReload] = useState();

  let data = {};
  useEffect(() => {
    data = childrenList.find((c) => c.uiId === option.uiId)
      ? childrenList.find((c) => c.uiId === option.uiId)
      : {};
    setValues(data.values ? data.values : []);
  }, [data, formPreview]);
  const setChange = async () => {
    const index = childrenList.find((c) => c.uiId === option.uiId);
    let copy = childrenList;
    copy[index] = data;
    setChildrenList(copy);
    setReload(uuidv4());
  };
  return (
    <div className="form-group">
      <label htmlFor="validationCustom04">
        {option.label}
        <span style={{ color: "red" }}>{option.isRequired ? " * " : ""}</span>
      </label>
      <div>
        <Radio.Group>
          {values.map((v) => (
            <div>
              <Radio
                checked={data.answer ? data.answer.includes(v) : false}
                onClick={() => {
                  data.answer = v;
                  data.isValid = true;
                  if (!isPreview) setChange();
                }}
                disabled={isDisable}
                value={v}
              >
                {v}
              </Radio>
            </div>
          ))}
        </Radio.Group>
        {/*{values.map(v=>(
                    <div className="mb-2" >
                        <div className="custom-control custom-radio">
                            <input
                                disabled={isDisable}
                                checked={data.answer?data.answer.includes(v):false}
                                onClick={()=>{
                                    data.answer = v
                                    data.isValid = true
                                    if(!isPreview)
                                        setChange()
                            }} type="radio" id={v} name={data.uiId} className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor={v}>{v}</label>
                        </div>
                    </div>
                ))}*/}
        <hr className={"mt-4 mb-0"} />
      </div>
    </div>
  );
};
export default RadioElementComponent;
