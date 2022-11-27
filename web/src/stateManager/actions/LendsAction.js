import { getLendsService, insertLendService } from "../../service/LendService";
import { doneToast } from "../../utility/ShowToast";

export const getLendsAction = () => {
  return async (dispatch) => {
    const { status, data } = await getLendsService();
    if (status === 200) {
      await dispatch({ type: "INIT_LENDS", payload: data });
    }
  };
};

export const insertLendAction = (lend) => {
  return async (dispatch) => {
    const { status } = await insertLendService(lend);
    if (status === 200) {
      doneToast("با موفقیت ثبت شد");
    }
  };
};
