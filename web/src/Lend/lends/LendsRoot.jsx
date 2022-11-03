import React, { useEffect, useState } from "react";
import MainLayout from "../../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLendsAction } from "../../stateManager/actions/LendsAction";
import LendsTableComponent from "./LendsTableComponent";
import ShowDocumentsLendsDialog from "./ShowDocumentsLendsDialog";
const LendsRoot = () => {
  const dispatch = useDispatch();
  const lends = useSelector((state) => state.lends);
  const [dialogData, setDialogData] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(getLendsAction());
  };
  useEffect(() => {
    // window.$('#showDocumentsLendsDialog').modal('show')
  }, [dialogData]);
  return (
    <MainLayout title={"لیست پرونده ها"} isMain={true}>
      {dialogData.fileId ? (
        <ShowDocumentsLendsDialog dialogData={dialogData} />
      ) : null}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className={"row"}>
                <div className={"col-lg-8"}>
                  <div className={"row mb-1"}>
                    <h4 className="card-title ml-3 mt-1">لیست پرونده ها</h4>
                  </div>
                  <p className="card-title-desc">
                    در این بخش میتوانید پرونده هایی که برای شما به اشتراک گذاشته
                    شده است را ملاحظه نمایید
                  </p>
                </div>
              </div>
              <LendsTableComponent
                lends={lends}
                setDialogData={setDialogData}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default LendsRoot;
