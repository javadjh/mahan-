import {
  deleteArchiveService,
  getAllArchivesService,
  getArchivesDetailService,
  getArchivesFilesGuardSystemService,
  getArchivesFormService,
  getGuardSystemService,
  getSingleArchiveService,
  insertArchiveService,
  insertMoreSettingArchiveService,
  setArchiveGuardSystemService,
  setGuardSystemService,
  updateArchiveService,
} from "../../service/ArchiveService";
import { doneToast } from "../../utility/ShowToast";

//برای دریافت تمامیه بایگانی ها میباشد
export const getAllArchivesAction = () => {
  return async (dispatch) => {
    const { status, data } = await getAllArchivesService();
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVES", payload: data });
    }
  };
};

//برای ثبت بایگانی جدید استفاده می شود
export const insertArchiveAction = (archive) => {
  return async (dispatch) => {
    const { status, data } = await insertArchiveService(archive);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(getAllArchivesAction());
    }
  };
};

//برای دریافت اطلاعات یک بایگانی خاص
export const getSingleArchiveAction = (id) => {
  return async (dispatch) => {
    const { status, data } = await getSingleArchiveService(id);
    if (status === 200) {
      await dispatch({ type: "INIT_SINGLE_ARCHIVE", payload: data });
      window.$("#insertMoreSetting").modal("show");
    }
  };
};

//برای ویرایش بایگانی استفاده می شود
export const updateArchiveAction = (id, archive) => {
  return async (dispatch) => {
    const { status } = await updateArchiveService(id, archive);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(getAllArchivesAction());
      window.location.reload();
    }
  };
};

//برای ویرایش بایگانی استفاده می شود
export const insertMoreSettingArchiveAction = (id, info) => {
  return async (dispatch) => {
    const { status } = await insertMoreSettingArchiveService(id, info);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      window.$("#insertMoreSetting").modal("hide");
    }
  };
};

//برای ویرایش بایگانی استفاده می شود
export const deleteArchiveAction = (id) => {
  return async (dispatch) => {
    const { status } = await deleteArchiveService(id);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(getAllArchivesAction());
    }
  };
};

//دریافت بایگانی با اطلاعات تکمیلی
export const getArchivesDetailActive = () => {
  return async (dispatch) => {
    const { data, status } = await getArchivesDetailService();
    if (status === 200) {
      await dispatch({ type: "INIT_USER_ARCHIVE_DETAIL", payload: data });
    }
  };
};

//دریافت بایگانی با اطلاعات تکمیلی
export const setArchiveState = (archiveId) => {
  console.log(archiveId);
  return async (dispatch) => {
    localStorage.setItem("archive", archiveId);
    await dispatch({ type: "SET_ARCHIVE_STATE", payload: { archiveId } });
  };
};

//دریافت سیستم گار بایگانی
export const setGuardSystemAction = (archiveId) => {
  return async (dispatch) => {
    const { data, status } = await getGuardSystemService(archiveId);
    if (status === 200) {
      await dispatch({ type: "GUARD_SYSTEM", payload: data });
    }
  };
};

//ست کردن گارد برای بایگانی
export const setArchiveGuardSystemAction = (guardSystem) => {
  return async (dispatch) => {
    const { data, status } = await setArchiveGuardSystemService(guardSystem);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
    }
  };
};

export const getArchivesFilesGuardSystemAction = (filter) => {
  return async (dispatch) => {
    const { data, status } = await getArchivesFilesGuardSystemService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVE_TREES_FILES", payload: data });
    }
  };
};
