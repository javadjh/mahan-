import {
  fileAlertsService,
  insertFileAlertService,
} from "../../service/FileAlertService";
import { doneToast } from "../../utility/ShowToast";
import {
  getUsersFileAlertsService,
  getUsersFilesAlertsService,
} from "../../service/UsersService";

//ثبت هشدار برای پرونده
export const insertFileAlertAction = (fileAlert) => {
  return async (dispatch) => {
    const { status } = await insertFileAlertService(fileAlert);
    if (status === 200) {
      await dispatch(
        fileAlertsAction({
          fileId: fileAlert.fileId,
          archiveId: fileAlert.archiveId,
        })
      );
      await dispatch(getUsersFileAlertsAction());
    }
  };
};

//دریافت لیست هشدار های یک پرونده
export const fileAlertsAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await fileAlertsService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_FILE_ALERTS", payload: data });
    }
  };
};

//دریافت هشدار های پرونده هایی که به بایگانی هاشون دسترسی داره
export const getUsersFileAlertsAction = () => {
  return async (dispatch) => {
    const { status, data } = await getUsersFileAlertsService();
    if (status === 200) {
      await dispatch({ type: "INIT_USERS_FILE_ALERTS", payload: data });
    }
  };
};

//دریافت فهرست هشدار ها
export const getUsersFilesAlertsAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await getUsersFilesAlertsService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_FILES_ALERTS", payload: data });
    }
  };
};
