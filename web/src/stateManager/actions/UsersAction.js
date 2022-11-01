import {
  changePasswordService,
  changeUsersPasswordAdminService,
  checkUsersTokenService,
  deleteUserService,
  getAdminDashboardService,
  getAllUsersService,
  getArchivesSupervisorsService,
  getSupervisorsService,
  getUsersArchivesService,
  insertUserService,
  loginService,
  setUsersProfileImageService,
  updateProfileService,
  updateUserService,
  upsertUserDataService,
  userForgetPasswordService,
  usersAutocompleteService,
  usersProfileService,
} from "../../service/UsersService";
import { doneToast } from "../../utility/ShowToast";
import jwt_decode from "jwt-decode";

//جهت دریافت تمام کاربران سامانه میباشد
export const getAllUsersAction = (searchValue) => {
  return async (dispatch) => {
    const { data, status } = await getAllUsersService(searchValue);
    if (status === 200) {
      await dispatch({ type: "INIT_USERS", payload: data });
    }
  };
};

//جهت دریافت اطلاعات برای ثبت یوزر جدید(شامل بایگانی ها و نقش های میباشد)
export const upsertUserDataAction = () => {
  return async (dispatch) => {
    const { data, status } = await upsertUserDataService();
    if (status === 200) {
      await dispatch({ type: "INIT_UPSERT_USER_DATA", payload: data });
    }
  };
};

//فقط ثبت کاربر میباشد
export const insertUserAction = (user, history) => {
  return async () => {
    const { status } = await insertUserService(user);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      history.goBack();
    }
  };
};

//ویرایش کاربر
export const updateUserAction = (id, user, history) => {
  return async () => {
    const { status } = await updateUserService(id, user);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      history.goBack();
    }
  };
};

//جهت ذخیره یک کاربر در state میباشد
export const singleUserAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: "INIT_SINGLE_USER", payload: data });
  };
};

//جهت حذف کاربر استفاده می شود
export const deleteUserAction = (userId) => {
  return async (dispatch) => {
    const { status } = await deleteUserService(userId);
    if (status === 200) {
      doneToast("با موفقیت حذف شد");
      await dispatch(getAllUsersAction({ searchValue: "" }));
    }
  };
};

//دریافت بایگانی های یک یوزر
export const getUsersArchivesAction = () => {
  return async (dispatch) => {
    const { data, status } = await getUsersArchivesService();
    if (status === 200) {
      await dispatch({ type: "INIT_USERS_ARCHIVES", payload: data.role });
    }
  };
};

//جهت لاگین کاربر به کار میرود
export const loginAction = (user, setCookie) => {
  return async () => {
    const { data, status } = await loginService(user);
    if (status === 200) {
      const decoded = jwt_decode(data.token);
      localStorage.setItem("fullName", decoded.fullName);
      localStorage.setItem("token", data.token);
      localStorage.setItem("archive", data.archive[0].archiveId._id);
      localStorage.setItem("userId", decoded.userId);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
};

//دریافت کاربران برای اتوکامپلیت
export const usersAutocompleteAction = () => {
  return async (dispatch) => {
    const { data, status } = await usersAutocompleteService();
    if (status === 200) {
      await dispatch({ type: "INIT_USERS_AUTOCOMPLETE", payload: data });
    }
  };
};

//فراموشی رمز عبور
export const userForgetPasswordAction = (user) => {
  return async (dispatch) => {
    const { data, status } = await userForgetPasswordService(user);
    if (status === 200) {
      doneToast("با موفقیت ارسال شد");
    }
  };
};

//دریافت پروفایل کاربر
export const usersProfileAction = () => {
  return async (dispatch) => {
    const { data, status } = await usersProfileService();
    if (status === 200) {
      await dispatch({ type: "INIT_USER_PROFILE", payload: data });
    }
  };
};

//تغییر کلمه عبور کاربر (فقط مال خودش) ورودی ها(newPassword,oldPassword)
export const changePasswordAction = (passwordData) => {
  return async (dispatch) => {
    const { data, status } = await changePasswordService(passwordData);
    if (status === 200) {
      await dispatch(usersProfileAction());
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//جهت ویرایش پروفایل کاربر از این ماژول استفاده می شود
export const updateProfileAction = (profile) => {
  return async (dispatch) => {
    const { data, status } = await updateProfileService(profile);
    if (status === 200) {
      await dispatch({ type: "INIT_USER_PROFILE", payload: data });
      doneToast("با موفقیت ثبت شد");
    }
  };
};

//دریافت ناظر های یک بایگانی جهت انتخاب در ارسال برای ناظر
export const getArchivesSupervisorsAction = () => {
  return async (dispatch) => {
    const { data, status } = await getArchivesSupervisorsService();
    if (status === 200) {
      await dispatch({ type: "INIT_ARCHIVES_SUPERVISORS", payload: data });
    }
  };
};

//دریافت داشبورد مدیریت
export const getAdminDashboardAction = () => {
  return async (dispatch) => {
    const { status, data } = await getAdminDashboardService();
    if (status === 200) {
      await dispatch({ type: "INIT_ADMIN_DASHBOARD", payload: data });
    }
  };
};

//تعویض پروفایل کاربر
export const setUsersProfileImageAction = (image) => {
  return async (dispatch) => {
    const { status } = await setUsersProfileImageService(image);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
      await dispatch(usersProfileAction());
    }
  };
};

//تعویض پروفایل کاربر
export const changeUsersPasswordAdminAction = (id) => {
  return async (dispatch) => {
    const { data, status } = await changeUsersPasswordAdminService(id);
    if (status === 200) {
      await dispatch({ type: "INIT_USER_CHANGED", payload: data });
    }
  };
};

//دریافت کاربران ناظر سامانه
export const getSupervisorsAction = () => {
  return async (dispatch) => {
    const { data, status } = await getSupervisorsService();
    if (status === 200) {
      await dispatch({ type: "INIT_USERS_AUTOCOMPLETE", payload: data });
    }
  };
};

//چک کردن توکن کاربر
export const checkUsersTokenAction = () => {
  return async () => {
    const { data, status } = await checkUsersTokenService();
    if (status === 200) {
      if (!data.hasTime) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };
};
