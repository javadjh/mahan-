import {combineReducers} from "redux";
import {UsersReducer} from "./UsersReducer";
import {UpsertUserDataReducer} from "./UpsertUserDataReducer";
import {SingleUserReducer} from "./SingleUserReducer";
import {RolesReducer} from "./RolesReducer";
import {AccessReducer} from "./AccessReducer";
import {SingleRoleReducer} from "./SingleRoleReducer";
import {DeleteRoleReducer} from "./DeleteRoleReducer";
import {FormsReducer} from "./FormsReducer";
import {FormEventReducer} from "./FormEventReducer";
import {PeopleReducer} from "./PeopleReducer";
import {LegalPeopleReducer} from "./LegalPeopleReducer";
import {ArchivesReducer} from "./ArchivesReducer";
import {ReloadMainParentArchiveTreeReducer} from "./ReloadMainParentArchiveTreeReducer";
import {UsersArchivesReducer} from "./UsersArchivesReducer";
import {SearchArchiveTreesReducer} from "./SearchArchiveTreesReducer";
import {SingleArchiveReducer} from "./SingleArchiveReducer";
import {InsertFileDataReducer} from "./InsertFileDataReducer";
import {ArchiveTreesFilesReducer} from "./ArchiveTreesFilesReducer";
import {DocumentsReducer} from "./DocumentsReducer";
import {DocumentReducer} from "./DocumentReducer";
import {FileFormReducer} from "./FileFormReducer";
import {FileLogsReducer} from "./FileLogsReducer";
import {FileStatisticReducer} from "./FileStatisticReducer";
import {LibraryReducer} from "./LibraryReducer";
import {ArchivesFileReducer} from "./ArchivesFileReducer";
import {UserArchiveDetailReducer} from "./UserArchiveDetailReducer";
import {ArchiveTreesReducer} from "./ArchiveTreesReducer";
import {FileReducer} from "./FileReducer";
import {DocumentsCutReducer} from "./DocumentsCutReducer";
import {LoadingReducer} from "./LoadingReducer";
import {FileAlertsReducer} from "./FileAlertsReducer";
import {SearchFileReducer} from "./SearchFileReducer";
import {LendsReducer} from "./LendsReducer";
import {SearchReducer} from "./SearchReducer";
import {ApplicantsReducer} from "./ApplicantsReducer";
import {DeActivateDocumentsReducer} from "./DeActivateDocumentsReducer";
import {EmailsHistoryReducer} from "./EmailsHistoryReducer";
import {UsersAutocompleteReducer} from "./UsersAutocompleteReducer";
import {EmailReducer} from "./EmailReducer";
import {ArchiveStateReducer} from "./ArchiveStateReducer";
import {AppSettingReducer} from "./AppSettingReducer";
import {SupervisorsFilesReducer} from "./SupervisorsFilesReducer";
import { UsersFileAlertsReducer} from "./UsersDashboardReducer";
import {UserProfileReducer} from "./UserProfileReducer";
import {SearchArchivesTreesReducer} from "./SearchArchivesTreesReducer";
import {ArchivesSupervisorsReducer} from "./ArchivesSupervisorsReducer";
import {LibraryShelfDocumentsReducer} from "./LibraryShelfDocumentsReducer";
import {AdminDashboardReducer} from "./AdminDashboardReducer";
import {FormPreviewReducer} from "./FormPreviewReducer";
import {LogsReducer} from "./LogsReducer";
import {ReportingReducer} from "./ReportingReducer";
import {ReportingFilterDataReducer} from "./ReportingFilterDataReducer";
import {UserChangedReducer} from "./UserChangedReducer";
import {AppInfoReducer} from "./AppInfoReducer";
import {FilesAlertsReducer} from "./FilesAlertsReducer";
import {GuardSystemReducer} from "./GuardSystemReducer";

export const combineReducersIndex = combineReducers({
    users:UsersReducer,
    upsertUserData:UpsertUserDataReducer,
    singleUser:SingleUserReducer,
    roles:RolesReducer,
    access:AccessReducer,
    singleRole:SingleRoleReducer,
    deleteRole:DeleteRoleReducer,
    forms:FormsReducer,
    formEvent:FormEventReducer,
    people:PeopleReducer,
    legalPeople:LegalPeopleReducer,
    archives:ArchivesReducer,
    reloadMainParentArchiveTree:ReloadMainParentArchiveTreeReducer,
    usersArchives:UsersArchivesReducer,
    searchArchiveTrees:SearchArchiveTreesReducer,
    singleArchive:SingleArchiveReducer,
    insertFileData:InsertFileDataReducer,
    archiveTreesFiles:ArchiveTreesFilesReducer,
    documents:DocumentsReducer,
    document:DocumentReducer,
    fileForm:FileFormReducer,
    fileLogs:FileLogsReducer,
    fileStatistic:FileStatisticReducer,
    library:LibraryReducer,
    archivesFile:ArchivesFileReducer,
    userArchiveDetail:UserArchiveDetailReducer,
    archiveTrees:ArchiveTreesReducer,
    file:FileReducer,
    documentsCut:DocumentsCutReducer,
    loading:LoadingReducer,
    fileAlerts:FileAlertsReducer,
    searchFile:SearchFileReducer,
    lends:LendsReducer,
    search:SearchReducer,
    applicants:ApplicantsReducer,
    deActivateDocuments:DeActivateDocumentsReducer,
    emailsHistory:EmailsHistoryReducer,
    usersAutocomplete:UsersAutocompleteReducer,
    email:EmailReducer,
    archiveState:ArchiveStateReducer,
    appSetting:AppSettingReducer,
    supervisorsFiles:SupervisorsFilesReducer,
    usersFileAlerts:UsersFileAlertsReducer,
    userProfile:UserProfileReducer,
    searchArchivesTrees:SearchArchivesTreesReducer,
    archivesSupervisors:ArchivesSupervisorsReducer,
    libraryShelfDocuments:LibraryShelfDocumentsReducer,
    adminDashboard:AdminDashboardReducer,
    formPreview:FormPreviewReducer,
    logs:LogsReducer,
    reporting:ReportingReducer,
    reportingFilterData:ReportingFilterDataReducer,
    userChanged:UserChangedReducer,
    appInfo:AppInfoReducer,
    filesAlerts:FilesAlertsReducer,
    guardSystem:GuardSystemReducer,
})
