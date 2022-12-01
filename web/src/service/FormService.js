import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت همه فرم ها
export const getAllFormsService = () => {
  return axiosConfig.get(`${config.baseUrl}${config.getAllForms}`);
};

//ثبت فرم جدید
export const insertFormService = (form) => {
  return axiosConfig.post(`${config.baseUrl}${config.insertForm}`, form);
};

//ویرایش فرم
export const updateFormService = (id, form) => {
  return axiosConfig.put(`${config.baseUrl}${config.updateForm}${id}`, form);
};

//حذف فرم
export const deleteFormService = (id) => {
  return axiosConfig.delete(`${config.baseUrl}${config.deleteForm}${id}`);
};

//نمایش فرزند های یک فرم
export const getFormPreviewService = (id) => {
  return axiosConfig.get(`${config.baseUrl}${config.getFormPreview}${id}`);
};

//نمایش یک فرم
export const formService = (id) => {
  return axiosConfig.get(`${config.baseUrl}${config.form}${id}`);
};
