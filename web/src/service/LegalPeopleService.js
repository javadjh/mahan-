import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت اشخاص حقوقی با فیلتر و paging
export const getLegalPeopleService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getLegalPeople}`, {
    params: filter,
  });
};

//ثبت شخص حقوقی جدید
export const insertLegalPersonService = (legalPerson) => {
  return axiosConfig.post(
    `${config.baseUrl}${config.insertLegalPerson}`,
    legalPerson
  );
};

//ویرایش شخص حقوقی
export const updateLegalPersonService = (id, legalPerson) => {
  return axiosConfig.put(
    `${config.baseUrl}${config.updateLegalPerson}${id}`,
    legalPerson
  );
};

//حذف شخص حقوقی
export const deleteLegalPersonService = (id) => {
  return axiosConfig.delete(
    `${config.baseUrl}${config.deleteLegalPerson}${id}`
  );
};

//افزودن گروهی اشخاص حقوقی با استفاده از excel
export const insertLegalPeopleFormExcelService = (file) => {
  return axiosConfig.post(
    `${config.baseUrl}${config.insertLegalPeopleFormExcel}`,
    file
  );
};

//دریافت اشخاص حقوقی
export const getLegalPeopleAutoService = (filter) => {
  return axiosConfig.get(`${config.baseUrl}${config.getLegalPeopleAuto}`, {
    params: filter,
  });
};
