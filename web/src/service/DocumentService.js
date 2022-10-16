import axiosConfig from "./axiosConfig";
import config from "./config.json";
import axios from "axios";

//ثبت سند
export const insertDocumentService = (
  archiveId,
  fileId,
  uiId,
  document,
  mainParent,
  libraryShelfId
) => {
  return axiosConfig.post(
    `${config.baseUrl}${config.insertDocument}${archiveId}/${fileId}/${uiId}/${mainParent}/${libraryShelfId}`,
    document
  );
};

//دریافت قهرست سند ها
export const getDocumentsService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getDocuments}`, {
    params: filter,
  });
};

//حذف سند
export const deleteDocumentService = (documentId) => {
  return axiosConfig.delete(
    `${config.baseUrl}${config.deleteDocuments}${documentId}`
  );
};

//نمایش اطلاعات یک سند
export const getDocumentService = (documentId) => {
  return axiosConfig.get(
    `${config.baseUrl}${config.getSingleDocument}${documentId}`
  );
};

//دریافت فایل یک سند
export const getDocumentFileService = async (documentId) => {
  return axiosConfig.get(
    `${config.baseUrl}${config.getDocumentFile}${documentId}`,
    {
      responseType: "blob",
    }
  );
};

//ثبت یادداشت برای سند
export const addNewNoteForDocumentService = (note) => {
  return axiosConfig.post(
    `${config.baseUrl}${config.addNewNoteForDocument}`,
    note
  );
};

//حذف یادداشت از سند
export const removeNoteFromDocumentService = (documentId, id) => {
  return axiosConfig.delete(
    `${config.baseUrl}${config.removeNoteFromDocument}${documentId}/${id}`
  );
};

//حذف یادداشت از سند
export const changeDocumentsNameService = (id, title) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.changeDocumentsName}${id}`,
    title
  );
};

//ثبت بایگانی و پرونده برای اسناد قافد بایگانی و قفسه
export const setDocumentsFileService = (document) => {
  return axiosConfig.post(
    `${config.baseUrl}${config.setDocumentsFile}`,
    document
  );
};

//حذف گروهی اسناد
export const deleteGroupDocumentsService = (documents) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.deleteGroupDocuments}`,
    documents
  );
};

//افزودن گروهی یادداشت برای اسناد
export const groupAddNoteDocumentService = (data) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.groupAddNoteDocument}`,
    data
  );
};

//دریافت گروهی اسناد پرونده
export const getGroupDocumentsFileService = (documents) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.getGroupDocumentsFile}`,
    documents,
    {
      responseType: "blob",
    }
  );
};

//ویرایش پرونده ی اسناد
export const changeDocumentFileService = (data) => {
  return axiosConfig.put(`${config.baseUrl}${config.changeDocumentFile}`, data);
};

//دریافت اسناد غیر فعال شده
export const getDeActivateDocumentsService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getDeActivateDocuments}`, {
    params: filter,
  });
};

//بازگردانی سند به حالت فعال
export const restoreDocumentService = (id) => {
  return axiosConfig.delete(`${config.baseUrl}${config.restoreDocument}${id}`);
};

//افزودن نشانه روی ویدیو
export const addVideoFlagService = (flag) => {
  return axiosConfig.post(`${config.baseUrl}${config.addVideoFlag}`, flag);
};

//افزودن نشانه روی ویدیو
export const removeVideoFlagService = (documentId, flagId) => {
  return axiosConfig.delete(
    `${config.baseUrl}${config.removeVideoFlag}${documentId}/${flagId}`
  );
};

//گزارش خرابی سند
export const reportDamageDocumentService = (id) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.reportDamageDocument}${id}`
  );
};
