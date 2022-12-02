import {
  deleteLegalPersonService,
  getLegalPeopleService,
  insertLegalPeopleFormExcelService,
  insertLegalPersonService,
  updateLegalPersonService,
} from "../../service/LegalPeopleService";
import { doneToast } from "../../utility/ShowToast";

//دریافت اشخاص حقوقی سامانه
export const getLegalPeopleAction = (filter) => {
  return async (dispatch) => {
    const { status, data } = await getLegalPeopleService(filter);
    if (status === 200) {
      await dispatch({ type: "INIT_LEGAL_PEOPLE", payload: data });
    }
  };
};

//ثبت شخص حقوقی جدید در سامانه
export const insertLegalPeopleAction = (legalPerson) => {
  return async (dispatch) => {
    const { status, data } = await insertLegalPersonService(legalPerson);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(
        getLegalPeopleAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
        })
      );
    }
  };
};

//ویرایش یک شخص حقوقی
export const updateLegalPeopleAction = (id, legalPerson) => {
  return async (dispatch) => {
    const { status, data } = await updateLegalPersonService(id, legalPerson);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(
        getLegalPeopleAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
        })
      );
    }
  };
};

//حذف یک شخص حقوقی
export const deleteLegalPeopleAction = (id) => {
  return async (dispatch) => {
    const { status, data } = await deleteLegalPersonService(id);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(
        getLegalPeopleAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
        })
      );
    }
  };
};

//افزودن گروهی اشخاص حقوقی با استفاده از excel
export const insertLegalPeopleFormExcelAction = (file) => {
  return async (dispatch) => {
    const { status, data } = await insertLegalPeopleFormExcelService(file);
    if (status === 200) {
      doneToast("با موفقیت اضافه شدند");
      await dispatch(
        getLegalPeopleAction({
          pageId: 1,
          eachPerPage: 12,
          searchValue: "",
        })
      );
    }
  };
};
