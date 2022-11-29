import React, { Fragment, useEffect } from "react";
import HeaderRootComponent from "./HeaderRootComponent";
import SidebarRootComponent from "./SidedbarRootComponent";
import FooterRootComponent from "./FooterRootComponent";
import MainLayoutRootComponent from "./MainLayoutRootComponent";
import { Route, Switch, withRouter } from "react-router";
import UsersRootComponent from "../User/users/UsersRootComponent";
import UpsertUserRootComponent from "../User/insertUser/UpsertUserRootComponent";
import UpsertUserContextProvider from "../User/insertUser/UpsertUserContextProvider";
import { ToastContainer } from "react-toastify";
import RolesRootComponent from "../Role/roles/RolesRootComponent";
import InsertRoleRootComponent from "../Role/insertRole/InsertRoleRootComponent";
import UpsertRoleContextProvider from "../Role/insertRole/UpsertRoleContextProvider";
import FormsRootComponent from "../Form/forms/FormsRootComponent";
import InsertFormRootComponent from "../Form/insertForm/InsertFormRootComponent";
import UpsertFormContextProvider from "../Form/insertForm/UpsertFormContextProvider";
import PeopleRootComponent from "../Person/people/PeopleRootComponent";
import LegalPeopleRootComponent from "../LegalPerson/legalPeople/LegalPeopleRootComponent";
import ArchivesRootComponent from "../Archive/Archives/ArchivesRootComponent";
import ArchiveTreeRootComponent from "../ArchiveTree/ArchiveTreeRootComponent";
import ArchiveTreeContextProvider from "../ArchiveTree/ArchiveTreeContextProvider";
import LoginComponent from "../Login/LoginComponent";
import RootContextProvider from "./RootContextProvider";
import LogRootComponent from "../Log/LogRootComponent";
import UpsertDocumentRoot from "../ArchiveTree/document/UpsertDocumentRoot";
import LibraryRootComponent from "../Library/LibraryRootComponent";
import LibraryContextProvider from "../Library/LibraryContextProvider";
import ImageEditorRootComponent from "../ImageEditor/ImageEditorRootComponent";
import ArchiveTreeLineRoot from "../ArchiveTree/archiveTreeLine/ArchiveTreeLineRoot";
import ArchiveTreeLineProvider from "../ArchiveTree/archiveTreeLine/ArchiveTreeLineProvider";
import LendsRoot from "../Lend/lends/LendsRoot";
import ShowEmailContentRoot from "../Email/showEmailContent/ShowEmailContentRoot";
import LoginEmailsUserComponent from "../Email/showEmailContent/LoginEmailsUserComponent";
import SupervisorsFileRootComponent from "../SupervisorsFile/SupervisorsFileRootComponent";
import UsersDashboardRoot from "../dashboard/UsersDashboardRoot";
import ProfileRootComponent from "../Profile/ProfileRootComponent";
import { useCookies } from "react-cookie";
import ArchiveTreeRoot from "../ArchiveTree/ArchiveTreeRoot";
import ResetPasswordDialog from "../dialog/ResetPasswordDialog";
import AppSettingDialog from "../dialog/AppSettingDialog";
import ApplicantRoot from "../companyChart/companyCharts/ApplicantRoot";
import ReportingRootComponent from "../Reporting/ReportingRootComponent";
import UpsertDocumentContextProvider from "../ArchiveTree/document/UpsertDocumentContextProvider";
import FilesAlertsRoot from "../FileAlerts/FilesAlertsRoot";
import GuardSystemRoot from "../guardSystem/GuardSystemRoot";
import FilesGuardSystemRoot from "../guardSystem/FilesGuardSystemRoot";
import TextComponent from "../TextComponent";
import AdminLayoutComponent from "./AdminLayoutComponent";
import ArchiveViewerRoot from "../newArchive/ArchiveViewerRoot";
import FileRoot from "../newFile/FileRoot";
import FormsRoot from "../newForm/forms/FormsRoot";
import UpsertFormRoot from "../newForm/upsert/UpsertFormRoot";
const PanelRootComponent = ({ history, location }) => {
  const [cookies] = useCookies(["isLogin"]);

  useEffect(() => {
    if (!cookies) {
      localStorage.clear();
      history.push("/login");
    }
  }, []);
  return (
    <Fragment>
      {!localStorage.getItem("token") ? (
        <Route path={"/"} component={LoginComponent} />
      ) : (
        <>
          {location?.pathname?.includes("/edit") ? (
            <>
              <Route
                component={ImageEditorRootComponent}
                exact={true}
                path={"/edit-:fileId-:lastdocument"}
              />
              <Route
                component={ImageEditorRootComponent}
                exact={true}
                path={"/edit"}
              />
            </>
          ) : (
            <>
              <div>
                <AdminLayoutComponent location={location}>
                  <Switch>
                    {!localStorage.getItem("token") ? (
                      <Route path={"/"} component={LoginComponent} />
                    ) : (
                      <>
                        <Route
                          path={"/users"}
                          component={UsersRootComponent}
                          exact
                        />
                        <Route
                          path={"/upsert-user"}
                          render={() => (
                            <UpsertUserContextProvider>
                              <UpsertUserRootComponent />
                            </UpsertUserContextProvider>
                          )}
                          exact
                        />
                        <Route
                          path={"/roles"}
                          component={RolesRootComponent}
                          exact
                        />
                        <Route
                          path={"/upsert-role"}
                          render={() => (
                            <UpsertRoleContextProvider>
                              <InsertRoleRootComponent />
                            </UpsertRoleContextProvider>
                          )}
                          exact
                        />
                        {/* <Route
                          path={"/forms"}
                          component={FormsRootComponent}
                          exact
                        /> */}
                        <Route path={"/forms"} component={FormsRoot} exact />
                        <Route
                          path={"/forms/upsert/form/:id"}
                          component={UpsertFormRoot}
                          exact
                        />
                        <Route
                          path={"/people"}
                          component={PeopleRootComponent}
                          exact
                        />
                        <Route
                          path={"/legal-people"}
                          component={LegalPeopleRootComponent}
                          exact
                        />
                        <Route
                          path={"/archives"}
                          component={ArchivesRootComponent}
                          exact
                        />
                        <Route
                          path={"/archive-trees"}
                          component={ArchiveViewerRoot}
                          exact
                        />
                        <Route
                          path={"/logs"}
                          component={LogRootComponent}
                          exact
                        />
                        <Route path={"/file/:id"} component={FileRoot} exact />
                        {/* <Route
                          path={"/upsert-document"}
                          render={() => (
                            <UpsertDocumentContextProvider>
                              <LibraryContextProvider>
                                <UpsertDocumentRoot />
                              </LibraryContextProvider>
                            </UpsertDocumentContextProvider>
                          )}
                          exact
                        /> */}
                        <Route
                          path={"/library"}
                          render={() => (
                            <LibraryContextProvider>
                              <LibraryRootComponent />
                            </LibraryContextProvider>
                          )}
                          exact
                        />

                        <Route
                          render={() => (
                            <ArchiveTreeLineProvider>
                              <ArchiveTreeLineRoot />
                            </ArchiveTreeLineProvider>
                          )}
                          path={"/archive-line"}
                        />

                        <Route component={LendsRoot} path={"/lends"} />
                        <Route component={ApplicantRoot} path={"/applicants"} />
                        <Route
                          component={LoginEmailsUserComponent}
                          path={"/email-:id"}
                        />
                        <Route
                          component={SupervisorsFileRootComponent}
                          path={"/supervisor"}
                        />
                        <Route
                          component={UsersDashboardRoot}
                          exact={true}
                          path={"/"}
                        />
                        <Route
                          component={ProfileRootComponent}
                          exact={true}
                          path={"/profile"}
                        />
                        <Route
                          component={ReportingRootComponent}
                          exact={true}
                          path={"/reporting"}
                        />
                        <Route
                          component={FilesAlertsRoot}
                          exact={true}
                          path={"/files-alerts"}
                        />
                        <Route
                          component={GuardSystemRoot}
                          exact={true}
                          path={"/guard-system"}
                        />
                        <Route
                          component={FilesGuardSystemRoot}
                          exact={true}
                          path={"/files-guard-system"}
                        />
                        <Route
                          component={TextComponent}
                          exact={true}
                          path={"/text"}
                        />
                      </>
                    )}
                  </Switch>
                </AdminLayoutComponent>

                {/* <FooterRootComponent /> */}
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer />
    </Fragment>
  );
};
export default withRouter(PanelRootComponent);
