import {
  changeFilesArchiveTreeService,
  deleteFileService,
  fileConfirmService,
  getArchiveFilesService,
  getArchiveTreesFileService,
  getFileFormService,
  getFileStatisticService,
  getInsertFileInsertDataService,
  getPeopleAutoService,
  getReportingFilterDataService,
  getReportingService,
  getSingleFileService,
  getWaitingFilesService,
  insertFileService,
  rejectFileService,
  searchEngineService,
  searchFileService,
  sendFileService,
  setFileFormService,
  updateFileService,
} from "../../service/FileService";
import { doneToast } from "../../utility/ShowToast";
import { getSupervisorsFilesService } from "../../service/SupervidorService";
import { getUsersFileAlertsAction } from "./FileAlertAction";

//دریافت اطلاعات مورد نیاز برای ثبت پرونده
export const getInsertFileInsertDataAction = () => {
  return async (dispatch) => {
    const { status, data } = await getInsertFileInsertDataService();
    if (status === 200) {
      await dispatch({ type: "INIT_INSERT_FILE_DATA", payload: data });
    }
  };
};

//دریافت پرونده های یک قفسه
export const archiveTreesFilesAction = (id, filter) => {
  return async (dispatch) => {
    const { status, data } = await getArchiveTreesFileService(id, filter);
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVE_TREES_FILES", payload: data });
    }
  };
};

//ثبت پرونده جدید
export const insertFileAction = (id, history) => {
  return async () => {
    const { status, data } = await insertFileService(id);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      // history.push({
      //   pathname: "/upsert-document",
      //   state: {
      //     archiveId: data.archiveId,
      //     fileId: data._id,
      //     hasForm: false,
      //   },
      // });
    }
  };
};

//ویرایش پرونده
export const updateFileAction = (file, id) => {
  return async (dispatch) => {
    const { status, data } = await updateFileService(file, id);
    if (status === 200) {
      dispatch(getSingleFileArchive(id));
      doneToast("با موفقیت ثبت شد");
      window.$("#updateFileDialog").modal("hide");
    }
  };
};

//دریافت اطلاعات مورد نیاز برای ویرایش روکش پرونده
export const getFileFormAction = (fileId) => {
  return async (dispatch) => {
    const { status, data } = await getFileFormService(fileId);
    if (status === 200) {
      await dispatch({ type: "INIT_FILE_FORM", payload: data });
    }
  };
};

//ویرایش دستی روکش پرونده
export const changeManualFileFormAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_FILE_FORM", payload: data });
  };
};

//برای بروزرسانی روکش سند استفاده می شود
export const setFileFormAction = (fileId, form) => {
  return async () => {
    const { status, data } = await setFileFormService(fileId, form);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//برای دریافت آمار پرونده استفاده می شود
export const getFileStatisticAction = (fileId) => {
  return async (dispatch) => {
    const { data, status } = await getFileStatisticService(fileId);
    if (status === 200) {
      await dispatch({ type: "INIT_FILE_STATISTIC", payload: data });
    }
  };
};

//دریافت پرونده های یک بایگانی
export const getArchiveFilesArchive = (fileId) => {
  return async (dispatch) => {
    const { data, status } = await getArchiveFilesService(fileId);
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVES_FILE", payload: data });
    }
  };
};

//دریافت اطلاعات یک پرونده
export const getSingleFileArchive = (fileId) => {
  return async (dispatch) => {
    const { data, status } = await getSingleFileService(fileId);
    if (status === 200) {
      await dispatch({ type: "INIT_FILE", payload: data });
    }
  };
};

//دریافت اطلاعات یک پرونده
export const setManualSingleFileArchive = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_FILE", payload: data });
  };
};

//حذف پرونده با استفاده از ای دی
export const deleteFileAction = (id, history) => {
  return async (dispatch) => {
    const { status } = await deleteFileService(id);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(getUsersFileAlertsAction());
    }
  };
};

//جست و جو در پرونده ها
export const searchFileAction = (searchValue) => {
  return async (dispatch) => {
    const { data, status } = await searchFileService(searchValue);
    if (status === 200) {
      await dispatch({ type: "INIT_SEARCH_FILE", payload: data });
    }
  };
};

//ثبت دستی جست و جو در پرونده ها
export const setManualSearchFileAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_SEARCH_FILE", payload: data });
  };
};

//جست و جوی پیشرفته پرونده ها
export const searchEngineAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await searchEngineService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_FILES", payload: data });
    }
  };
};

//تایید پرونده ها به همراه اسناد آن
export const fileConfirmAction = (id) => {
  return async (dispatch) => {
    const { status, data } = await fileConfirmService(id);
    if (status === 200) {
      await dispatch(getSingleFileArchive(id));
      doneToast("با موفقیت تایید شد");
    }
  };
};

//تایید پرونده ها به همراه اسناد آن
export const getWaitingFilesAction = () => {
  return async () => {
    const { status, data } = await getWaitingFilesService();
    if (status === 200) {
      doneToast("با موفقیت تایید شد");
    }
  };
};

//ارسال پرونده برای ناظر بایگانی
export const sendFileAction = (fileId, message) => {
  return async (dispatch) => {
    const { status, data } = await sendFileService(fileId, message);
    if (status === 200) {
      await dispatch(getSingleFileArchive(fileId));
      doneToast("ارسال شد");
    }
  };
};

//تغییر وضعیت پرونده به حالت نیاز به تغییر
export const rejectFileAction = (fileId, message) => {
  return async (dispatch) => {
    const { status, data } = await rejectFileService(fileId, message);
    if (status === 200) {
      await dispatch(getSingleFileArchive(fileId));
      doneToast("بازگشت داده شد");
    }
  };
};

//دریافت پرونده ها برای ناظر
//ارسالی ها : pageId,eachPerPage,searchValue,isReject,isConfirm,isWaiting
export const getSupervisorsFilesAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await getSupervisorsFilesService(filter);
    console.log(status);
    console.log(status);
    console.log(status);
    console.log(status);
    if (status === 200) {
      console.log("data");
      console.log("data");
      console.log(data);
      await dispatch({ type: "INIT_SUPERVISORS_FILES", payload: data });
    }
  };
};

//تغییر قفسه یک پرونده با استفاده از file Id و قفسه مقصد
//{ fileId,
//     destinationArchiveTree:{archive(id),_id}}
export const changeFilesArchiveTreeAction = (dataForSend) => {
  return async (dispatch) => {
    const { status } = await changeFilesArchiveTreeService(dataForSend);
    if (status === 200) {
      window.$("#searchArchivesTrees").modal("hide");
      doneToast("با موفقیت منتقل شد");
    }
  };
};

//برای دریافت گزارش گیری سامانه
//{pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus}
export const getReportingAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await getReportingService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_REPORTING", payload: data });
    }
  };
};

//دریافت اطلاعات مورد نیاز برای فیلتر کردن پرونده ها
// اشخخاص حقیقی،حقوقی،سمت سازمانی
export const getReportingFilterDataAction = () => {
  return async (dispatch) => {
    const { status, data } = await getReportingFilterDataService();
    if (status === 200) {
      await dispatch({ type: "INIT_REPORTING_FILTER_DATA", payload: data });
    }
  };
};
