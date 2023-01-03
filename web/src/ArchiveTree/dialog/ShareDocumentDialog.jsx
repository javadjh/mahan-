import React, { Fragment, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../stateManager/actions/UsersAction";
import moment from "moment-jalaali";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { defaultDate } from "../../utility/dateUtil";
import { RootContext } from "../../RootComponent/RootContext";
import CustomSelect from "../../styled/components/CustomSelect";
const ShareDocumentDialog = ({ insertShareFile }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { handleHide } = useContext(RootContext);
  const [expire, setExpire] = useState(new Date().toISOString());
  const [usersReceiver, setUsersReceiver] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const usersCopy = [];
    users.map((u) => {
      usersCopy.push({
        value: u._id,
        label: u.firstName + " " + u.lastName + " - " + u.position,
      });
    });
    setUsersReceiver(usersCopy);
    console.table(usersCopy);
  }, [users]);

  const getData = async () => {
    if (!handleHide("اشتراک گذاری"))
      await dispatch(
        getAllUsersAction({
          searchValue: "",
        })
      );
  };

  return (
    <Fragment>
      <div
        className="modal fade"
        id="shareDocumentOrFileDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-4">
            <div className={"text-center"}>
              <Select
                label="مخاطبین"
                onChange={(e) => {
                  let users = [];
                  e.map((u) => {
                    users.push(u.value);
                  });
                  setUsersSelected(users);
                }}
                noOptionsMessage={() => "یافت نشد"}
                placeholder={"جست و جو در مخاطبین..."}
                closeMenuOnSelect={false}
                className="basic-multi-select mb-2"
                classNamePrefix="select"
                isMulti
                options={usersReceiver}
              />
              <div className="form-group">
                {/*<input type="text"
                                       name={"registerDate"}
                                       onChange={(e)=>{
                                           if(e.target.value.length===10){
                                               try {
                                                   const finalDate = moment(e.target.value).locale('fa').format('YYYY/MM/DD')
                                                   if(finalDate!=="Invalid date"){
                                                       setIsDateValid(true)
                                                   }else{
                                                       setIsDateValid(false)
                                                   }
                                               }catch (e){
                                                   setIsDateValid(false)
                                               }
                                           }else{
                                               setIsDateValid(false)
                                           }
                                           setExpire(e.target.value)
                                       }}
                                       className="form-control mt-3" id="validationCustom04"
                                       placeholder="تاریخ انقضا را وارد کنید (1400/05/07)" required/>*/}
                <PersianDatePickerComponent
                  value={expire}
                  label="تاریخ انتضا"
                  onSelect={(moment) => {
                    const miladiDate = moment.format("MM/DD/YYYY");
                    const persianDate = moment.format("jYYYY/jMM/jDD");
                    setExpire(moment);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  insertShareFile(usersSelected, expire);
                }}
                className="btn btn-primary btn-lg btn-block waves-effect waves-light mb-1 mt-2"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ShareDocumentDialog;
