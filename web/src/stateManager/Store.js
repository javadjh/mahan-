import { applyMiddleware, compose, createStore } from "redux";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import thunk from "redux-thunk";
import { combineReducersIndex } from "./reducers";
import {
  checkUsersTokenAction,
  getUsersArchivesAction,
  usersProfileAction,
} from "./actions/UsersAction";
import { setArchiveState } from "./actions/ArchiveAction";
import { getAppInfoAction } from "./actions/AppSettingAction";

export const store = createStore(
  combineReducersIndex,
  compose(
    applyMiddleware(thunk, loadingBarMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const init = async () => {
  if (localStorage.getItem("token") && localStorage.getItem("archive")) {
    await store.dispatch(setArchiveState(localStorage.getItem("archive")));
    await store.dispatch(checkUsersTokenAction());
    await store.dispatch(getUsersArchivesAction());
    await store.dispatch(usersProfileAction());
  }
};
init();

store.subscribe(() => console.log(store.getState()));
