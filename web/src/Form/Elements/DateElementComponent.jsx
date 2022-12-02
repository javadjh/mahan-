import React, { useContext, useState } from "react";
import { ElementsContext } from "./ElementsContext";
import moment from "moment-jalaali";
import { v4 as uuidv4 } from "uuid";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { useDispatch } from "react-redux";
import { setManualFormPreviewAction } from "../../stateManager/actions/FormAction";

const DateElementComponent = ({ option, isPreview }) => {
  const { childrenList, setChildrenList } = useContext(ElementsContext);
  const [isShowValidator, setIsShowValidator] = useState(false);
  const [, setReload] = useState();
  let data = childrenList.find((c) => c.uiId === option.uiId)
    ? childrenList.find((c) => c.uiId === option.uiId)
    : {};
  const setChange = async () => {
    const index = childrenList.find((c) => c.uiId === option.uiId);
    let copy = childrenList;
    copy[index] = data;
    setChildrenList(copy);
    setReload(uuidv4());
  };
  return (
    <>
      <div className="form-group">
        <label htmlFor="validationCustom04">
          {option.label} {data.answer}
          <span style={{ color: "red" }}>{option.isRequired ? " * " : ""}</span>
        </label>
        {/*<input
                    type="text"
                    value={data.answer}
                       name={"input"}
                       onChange={(e)=>{
                           if(e.target.value.length===10){
                               try {
                                   const finalDate = moment(e.target.value).locale('fa').format('YYYY/MM/DD')
                                   if(finalDate!=="Invalid date"){
                                       data.answer = finalDate
                                       setIsShowValidator(false)
                                       data.isValid = true
                                       setChange()
                                   }else{
                                       setIsShowValidator(true)
                                       data.isValid = false
                                   }
                               }catch (e){
                                   setIsShowValidator(true)
                                   data.isValid = false
                               }
                           }else{
                               setIsShowValidator(true)
                               data.isValid = false
                           }
                           data.answer = e.target.value
                           setChange()
                       }}
                       className="form-control" id="validationCustom04"
                       placeholder="عنوان بایگانی را وارد کنید..." required/>
                {isShowValidator?(
                    <p style={{color:"red"}}>نمونه تاریخ مورد قبول : 1370/02/08</p>
                ):null}*/}
        <PersianDatePickerComponent
          value={data.answer}
          onSelect={(moment) => {
            const miladiDate = moment.format("MM/DD/YYYY");
            const persianDate = moment.format("jYYYY/jMM/jDD");

            data.answer = persianDate;
            data.isValid = true;
            if (!isPreview) setChange();
          }}
        />
        <hr className={"mt-4 mb-0"} />
      </div>
    </>
  );
};
export default DateElementComponent;
