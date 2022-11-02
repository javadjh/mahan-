import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFilesAlertsAction } from "../stateManager/actions/FileAlertAction";
import PagingComponent from "../utility/PagingComponent";
import FilesAlertsTable from "../components/filesAlerts/FilesAlertsTable";
const FilesAlertsRoot = () => {
  const filesAlerts = useSelector((state) => state.filesAlerts);
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getData();
  }, [pageId]);
  const getData = async () => {
    dispatch(
      getUsersFilesAlertsAction({
        pageId,
        eachPerPage: 12,
        searchValue,
      })
    );
  };
  return (
    <Fragment>
      <div className={"row mb-1"}>
        <h4 className="card-title ml-3 mt-1">لیست هشدار ها</h4>
      </div>
      <p className="card-title-desc">
        در این قسمت میتوانید لیست هشدار های ثبت شده را مشاهده کنید
      </p>

      <FilesAlertsTable
        pageId={filesAlerts.pageId}
        eachPerPage={filesAlerts.eachPerPage}
        total={filesAlerts.total}
        filesAlerts={filesAlerts.filesAlerts}
      />
    </Fragment>
  );
};
export default FilesAlertsRoot;
