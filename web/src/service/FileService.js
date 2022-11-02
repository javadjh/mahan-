import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت اطلاعات مورد نیاز برای ثبت پرونده
export const getInsertFileInsertDataService = () => {
  return axiosConfig.get(`${config.baseUrl}${config.getInsertFileInsertData}`);
};

//برای دریافت پرونده های یک قفسه استفاده می شود
export const getArchiveTreesFileService = (id, filter) => {
  return axiosConfig.get(
    `${config.baseUrl}${config.getArchiveTreesFile}${id}`,
    {
      params: filter,
    }
  );
};

//ثبت پرونده جدید
export const insertFileService = (file) => {
  return axiosConfig.post(`${config.baseUrl}${config.insertFile}`, file);
};

//ویرایش پرونده
export const updateFileService = (file, id) => {
  return axiosConfig.put(`${config.baseUrl}${config.updateFile}${id}`, file);
};

//دریافت اطلاعات مورد نظر برای ویرایش روکش پرونده
export const getFileFormService = (fileId) => {
  return axiosConfig.get(`${config.baseUrl}${config.getFileForm}${fileId}`);
};

//برای درج اطلاعات فرم برای پرونده میباشد
export const setFileFormService = (fileId, form) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.setFileForm}${fileId}`,
    form
  );
};

//برای دریافت آمار یک پرونده استفاده می شود
export const getFileStatisticService = (fileId) => {
  return axiosConfig.get(
    `${config.baseUrl}${config.getFileStatistic}${fileId}`
  );
};

//برای دریافت پرونده های یک بایگانی
export const getArchiveFilesService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getArchiveFiles}`, {
    params: filter,
  });
};

//دریافت اطلاعات یک پرونده
export const getSingleFileService = (id) => {
  return axiosConfig.get(`${config.baseUrl}${config.getSingleFile}${id}`);
};

//حذف پرونده با ای دی
export const deleteFileService = (id) => {
  return axiosConfig.delete(`${config.baseUrl}${config.deleteFile}${id}`);
};

//جست و جو در پرونده هایی که به بایگانی آن ها دسترسی دارید
export const searchFileService = (searchValue) => {
  return axiosConfig.get(`${config.baseUrl}${config.fileSearch}${searchValue}`);
};

//جستجو پیشرفته پرونده ها

/*
جست و جو در:
مخاطبین
کلیدواژه
یادداشت ها
شماره پرونده
تاریخ پرونده
هشدار ها
*/
export const searchEngineService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.searchEngine}`, {
    params: filter,
  });
};

//دریافت تصویر اصلی سند برای ادیتور
export const getImageDocumentService = (id) => {
  return axiosConfig.get(`${config.baseUrl}${config.getImageDocument}${id}`, {
    responseType: "blob",
  });
};

//تایید پرونده و اسناد آن
export const fileConfirmService = (id) => {
  return axiosConfig.put(`${config.baseUrl}${config.fileConfirm}${id}`);
};

//دریافت پرونده های در انتظار تایید
export const getWaitingFilesService = () => {
  return axiosConfig.get(`${config.baseUrl}${config.getWaitingFiles}`);
};

//ارسال پرونده برای ناظر بایگانی
export const sendFileService = (fileId, message) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.sendFile}${fileId}`,
    message
  );
};

//تغییر وضعیت پرونده به حالت نیاز به تغییر
export const rejectFileService = (fileId, message) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.rejectFile}${fileId}`,
    message
  );
};

//تغییر وضعیت پرونده به حالت نیاز به تغییر
export const changeFilesArchiveTreeService = (data) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.changeFilesArchiveTree}`,
    data
  );
};

//برای دریافت گزارش گیری سامانه
//{pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus}
export const getReportingService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getReporting}`, {
    params: filter,
  });
};

//دریافت اطلاعات مورد نیاز برای فیلتر کردن پرونده ها
// اشخخاص حقیقی،حقوقی،سمت سازمانی
export const getReportingFilterDataService = () => {
  return axiosConfig.get(`${config.baseUrl}${config.getReportingFilterData}`);
};

//دریافت فایل اکسل شده
export const getReportingFilterFileService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getReportingFilterELSX}`, {
    params: filter,
    responseType: "blob",
  });
};

//دریافت فایل اکسل شده
export const getPeopleAutoService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getPeopleAuto}`, {
    params: filter,
  });
};
