import {
  deleteGroupLibrariesDocumentsService,
  deleteLibrariesDocumentService,
  deleteLibraryShelfService,
  getLibraryService,
  getLibraryShelfDocumentsService,
  insertLibraryShelfService,
  moveDocumentsToLibraryShelfService,
  updateLibraryShelfService,
} from "../../service/LibraryService";
import { doneToast } from "../../utility/ShowToast";

//برای حذف سندی که در کازیو میباشد
export const deleteLibrariesDocumentAction = (
  id,
  libraryShelfId,
  setReload
) => {
  return async (dispatch) => {
    const { status } = await deleteLibrariesDocumentService(id, libraryShelfId);
    setReload(id);
    if (status === 200) {
      doneToast("با موفقیت حذف گردید");
      await dispatch(getLibraryAction());
    }
  };
};

//دریافت کتابخانه (اسناد بدون پرونده)
export const getLibraryAction = () => {
  return async (dispatch) => {
    const { status, data } = await getLibraryService();
    if (status === 200) {
      await dispatch({ type: "INIT_LIBRARY", payload: data });
    }
  };
};

//ثبت قفسه جدید در کازیو
export const insertLibraryShelfAction = (libraryShelf) => {
  return async (dispatch) => {
    const { status } = await insertLibraryShelfService(libraryShelf);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(getLibraryAction());
    }
  };
};

//ثبت قفسه جدید در کازیو
export const updateLibraryShelfAction = (libraryShelf, id) => {
  return async (dispatch) => {
    const { status } = await updateLibraryShelfService(libraryShelf, id);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(getLibraryAction());
    }
  };
};

//حذف پوشه از داخل کازیو
export const deleteLibraryShelfAction = (id) => {
  return async (dispatch) => {
    const { status } = await deleteLibraryShelfService(id);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(getLibraryAction());
    }
  };
};

//دریافت اسناد یک پوشه در کازیو
export const getLibraryShelfDocumentsAction = (id) => {
  return async (dispatch) => {
    const { data, status } = await getLibraryShelfDocumentsService(id);
    if (status === 200) {
      await dispatch({ type: "INIT_LIBRARY_SHELF_DOCUMENTS", payload: data });
    }
  };
};

//حذف گروهی اسناد در کازیو
export const deleteGroupLibrariesDocumentsAction = (data, shelveId) => {
  return async (dispatch) => {
    const { status } = await deleteGroupLibrariesDocumentsService(data);
    if (status === 200) {
      if (shelveId !== undefined)
        await dispatch(getLibraryShelfDocumentsAction(shelveId));
      else await dispatch(getLibraryAction());
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//انتقال سند به پوشه های ریشه
export const moveDocumentsToLibraryShelfAction = (data) => {
  return async (dispatch) => {
    const { status } = await moveDocumentsToLibraryShelfService(data);
    if (status === 200) {
      await dispatch(getLibraryAction());
      doneToast("با موفقیت ثبت شد");
      window.$("#moveDocumentsToLibraryShelfDialog").modal("hide");
    }
  };
};
