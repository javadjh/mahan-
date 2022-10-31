import {
  deletePersonService,
  getPeopleService,
  insertPeopleFormExcelService,
  insertPersonService,
  updatePersonService,
} from "../../service/PeopleService";
import { doneToast } from "../../utility/ShowToast";

//جهت دریافت اشخاص حقیقی استفاده می شود
export const getPeopleAction = (filter) => {
  return async (dispatch) => {
    const { data, status } = await getPeopleService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_PEOPLE", payload: data });
    }
  };
};

//جهت افزودن یک شخص حقیقی جدید
export const insertPersonAction = (person) => {
  return async (dispatch) => {
    const { data, status } = await insertPersonService(person);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(
        getPeopleAction({ pageId: 1, eachPerPage: 12, searchValue: "" })
      );
    }
  };
};

//جهت ویرایش یک شخص حقیقی جدید
export const updatePersonAction = (id, person) => {
  return async (dispatch) => {
    const { data, status } = await updatePersonService(id, person);
    if (status === 200) {
      doneToast("با موفقیت ویرایش شد");
      await dispatch(
        getPeopleAction({ pageId: 1, eachPerPage: 12, searchValue: "" })
      );
    }
  };
};

//حذف شخص حقیقی
export const deletePersonAction = (id) => {
  return async (dispatch) => {
    const { data, status } = await deletePersonService(id);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(
        getPeopleAction({ pageId: 1, eachPerPage: 12, searchValue: "" })
      );
    }
  };
};

//ثبت گروهی اشخاص حقیقی با فایل excel
export const insertPeopleFormExcelAction = (file) => {
  return async (dispatch) => {
    const { status } = await insertPeopleFormExcelService(file);
    if (status === 200) {
      doneToast("با موفقیت اضافه شدند");
      await dispatch(
        getPeopleAction({ pageId: 1, eachPerPage: 12, searchValue: "" })
      );
    }
  };
};
