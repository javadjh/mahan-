import {
  addNewNoteForDocumentService,
  addVideoFlagService,
  changeDocumentFileService,
  changeDocumentsNameService,
  deleteDocumentService,
  deleteGroupDocumentsService,
  getDeActivateDocumentsService,
  getDocumentService,
  getDocumentsService,
  groupAddNoteDocumentService,
  removeNoteFromDocumentService,
  removeVideoFlagService,
  reportDamageDocumentService,
  restoreDocumentService,
  setDocumentsFileService,
} from "../../service/DocumentService";
import { doneToast, infoToast } from "../../utility/ShowToast";
import { getFileLogsAction } from "./LogsAction";
import {
  getLibraryAction,
  getLibraryShelfDocumentsAction,
} from "./LibraryAction";

//دریافت لیست سند های یک پرونده
export const getDocumentsAction = (filter) => {
  return async (dispatch) => {
    const { data, status } = await getDocumentsService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_DOCUMENTS", payload: data });
    }
  };
};

//حذف سند
export const deleteDocumentAction = (documentId, fileId) => {
  return async (dispatch) => {
    const { status, data } = await deleteDocumentService(documentId);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(
        getDocumentsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
    }
  };
};

//نمایش اطلاعات یک سند
export const getDocumentAction = (documentId) => {
  return async (dispatch) => {
    const { status, data } = await getDocumentService(documentId);
    if (status === 200) {
      await dispatch({ type: "INIT_DOCUMENT", payload: data });
    }
  };
};

//ثبت دستی یک سند
export const setManualDocumentAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_DOCUMENT", payload: data });
  };
};

//ثبت یادداشت برای سند
export const addNewNoteForDocumentAction = (note, fileId) => {
  return async (dispatch) => {
    const { status, data } = await addNewNoteForDocumentService(note);
    if (status === 200) {
      await dispatch(
        getFileLogsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
      await dispatch(getDocumentAction(data._id));
    }
  };
};

//ثبت یادداشت برای سند
export const removeNoteFromDocumentAction = (documentId, id, fileId) => {
  return async (dispatch) => {
    const { status, data } = await removeNoteFromDocumentService(
      documentId,
      id
    );
    if (status === 200) {
      await dispatch(
        getFileLogsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
      await dispatch(getDocumentAction(data._id));
    }
  };
};

//ویرایش نام سند
export const changeDocumentsNameAction = (id, title, fileId) => {
  return async (dispatch) => {
    const { status, data } = await changeDocumentsNameService(id, title);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(
        getFileLogsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
      await dispatch(
        getDocumentsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
    }
  };
};

//ثبت بایگانی و پرونده برای اسناد قافد بایگانی و قفسه
export const setDocumentsFileAction = (document, libraryShelfContext) => {
  return async (dispatch) => {
    const { status, data } = await setDocumentsFileService(document);
    if (status === 200) {
      if (libraryShelfContext._id)
        await dispatch(getLibraryShelfDocumentsAction(libraryShelfContext._id));
      else await dispatch(getLibraryAction());
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//حذف گروهی اسناد
export const deleteGroupDocumentsAction = (documents, fileId) => {
  return async (dispatch) => {
    const { status } = await deleteGroupDocumentsService(documents);
    if (status === 200) {
      await dispatch(
        getDocumentsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
      doneToast("با موفقیت حذف شد");
    }
  };
};

//افزودن یادداشت برای گروهی از اسناد یک پرونده
export const groupAddNoteDocumentAction = (data, fileId) => {
  return async (dispatch) => {
    const { status } = await groupAddNoteDocumentService(data);
    if (status === 200) {
      await dispatch(
        getDocumentsAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
          fileId,
        })
      );
      window.$("#addGroupNoteDialog").modal("hide");
      doneToast("با موفقیت اضافه شد");
    }
  };
};

//ذخیره اسناد در حافظه جهت انتقال به پرونده جدید
export const saveDocumentsInfoAction = (data, history, isDone = false) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_DOCUMENTS_CUT", payload: data });
    if (!isDone) {
      window.$("#searchFileDialog").modal("show");
      infoToast("پرونده مقصد را انتخاب کنید");
    }
  };
};

//ویرایش پرونده ی اسناد
export const changeDocumentFileAction = (reqData) => {
  return async (dispatch) => {
    const { data, status } = await changeDocumentFileService(reqData);
    if (status === 200) {
      doneToast("با موفقیت انتقال یافت");
      await dispatch(
        saveDocumentsInfoAction(
          {
            origin: undefined,
            documents: [],
          },
          null,
          true
        )
      );
    }
  };
};

//بازگردانی سند به حالت فعال
export const getDeActivateDocumentsAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await getDeActivateDocumentsService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_DEACTIVATE_DOCUMENTS", payload: data });
    }
  };
};

//بازگردانی سند به حالت فعال
export const restoreDocumentAction = (id, fileId) => {
  return async (dispatch) => {
    const { data, status } = await restoreDocumentService(id);
    if (status === 200) {
      doneToast("با موفقیت بازگردانده شد");
      await dispatch(
        getDeActivateDocumentsAction({
          pageId: 1,
          eachPerPage: 12,
          fileId,
        })
      );
    }
  };
};

//افزودن نشانه به روی ویدیو
export const addVideoFlagAction = (flag) => {
  return async (dispatch) => {
    const { data, status } = await addVideoFlagService(flag);
    if (status === 200) {
      doneToast("با موفقیت اضافه شد");
      await dispatch(getDocumentAction(flag.documentId));
    }
  };
};

//حذف نشانه روی ویدیو
export const removeVideoFlagAction = (documentId, flagId) => {
  return async (dispatch) => {
    const { data, status } = await removeVideoFlagService(documentId, flagId);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(getDocumentAction(documentId));
    }
  };
};

//گزارش خرابی سند
export const reportDamageDocumentAction = (id) => {
  return async () => {
    const { status } = await reportDamageDocumentService(id);
    if (status === 200) {
      doneToast("با موفقیت برطرف شد");
    }
  };
};
