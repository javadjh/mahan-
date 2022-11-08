import {
  changeArchiveTreesNameService,
  deleteArchiveTreeService,
  getArchiveTreesService,
  insertArchiveTreeService,
  mainArchiveTreesFormService,
  searchArchivesTreesService,
  searchArchiveTreesService,
  settingArchiveTreesService,
} from "../../service/ArchiveTreeService";
import { doneToast } from "../../utility/ShowToast";

//جهت افزودن یک درخت جدید استفاده می شود
export const insertArchiveTreeAction = (archiveTree) => {
  return async (dispatch) => {
    const { data, status } = await insertArchiveTreeService(archiveTree);
    if (status === 200) {
      await dispatch({
        type: "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE",
        payload: { mainParent: data.mainParent },
      });
      window.$("#addTreeDialog").modal("hide");
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//جهت ویرایش نام یک درخت میباشد
export const changeArchiveTreesNameAction = (id, archiveTreesTitle) => {
  return async (dispatch) => {
    const { data, status } = await changeArchiveTreesNameService(
      id,
      archiveTreesTitle
    );
    if (status === 200) {
      await dispatch({
        type: "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE",
        payload: { mainParent: data.mainParent },
      });
      window.$("#addTreeDialog").modal("hide");
      doneToast("با موفقیت بروز شد");
    }
  };
};

//برای ثبت تنظیمات درخت استفاده می شود
export const settingArchiveTreesAction = (id, setting) => {
  return async (dispatch) => {
    const { data, status } = await settingArchiveTreesService(id, setting);
    if (status === 200) {
      await dispatch({
        type: "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE",
        payload: { mainParent: data.mainParent },
      });
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//جهت جست و جو در درخت استفاده می شود
export const searchArchiveTreesAction = (searchValue) => {
  return async (dispatch) => {
    const { data, status } = await searchArchiveTreesService(searchValue);
    if (status === 200) {
      await dispatch({ type: "INIT_SEARCH_ARCHIVE_TREES", payload: data });
    }
  };
};

//دریافت لیست قفسه های یک بایگانی- زیر مجموعه های قفسه با mainParent
export const getArchiveTreesAction = (isMain, mainParent, archiveId) => {
  return async (dispatch) => {
    const { data, status } = await getArchiveTreesService({
      isMain,
      mainParent,
      archiveId,
    });
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVE_TREES", payload: data });
    }
  };
};

//دریافت لیست قفسه های یک بایگانی- زیر مجموعه های قفسه با mainParent
export const setManualArchiveTreesAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_ARCHIVE_TREES", payload: data });
  };
};

//حذف قفسه در صورتی که پرونده نداشته باشد
export const deleteArchiveTreeAction = (id) => {
  return async (dispatch) => {
    const { status, data } = await deleteArchiveTreeService(id);
    if (status === 200) {
      await dispatch({
        type: "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE",
        payload: { mainParent: data.mainParent },
      });
      doneToast("با موفقیت حذف شد");
    }
  };
};

//جست و جوی درخت های یک بایگانی
export const searchArchivesTreesAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await searchArchivesTreesService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_SEARCH_ARCHIVES_TREES", payload: data });
    }
  };
};

//تغییر فرم یک قفسه مادر
export const mainArchiveTreesFormAction = (archiveTreeId, bodyData) => {
  return async (dispatch) => {
    const { status, data } = await mainArchiveTreesFormService(
      archiveTreeId,
      bodyData
    );
    if (status === 200) {
      await dispatch(
        getArchiveTreesAction(true, undefined, localStorage.getItem("archive"))
      );
      await dispatch({
        type: "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE",
        payload: { date: Date.now() },
      });
    }
  };
};
