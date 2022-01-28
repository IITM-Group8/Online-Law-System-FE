export const ONLINE_LAW_SYSTEM_MS_HOST = 'http://localhost:';
export const ONLINE_LAW_SYSTEM_MS_PORT = '5001';

export const POST = 'POST'
export const GET = 'GET'

export const ADMIN = 'Admin'
export const LAWYER = 'Lawyer'
export const PUBLIC = 'Public'

export const LOGIN_USER = '/user/login';
export const REGISTER_USER = '/user/registerUser';

export const FETCH_USERS_BY_ROLE = '/user/usersByRole/';
const UPDATE_USER_STATUS = '/user/userStatus';
const SEARCH_LAWYER_DETAILS = '/user/lawyer/searchLawyer';
const FETCH_IPC_LAWS = '/laws/ipcLaws';
const UPDATE_IPC_LAWS = '/laws/ipcLaw';
const FETCH_COURT_BY_AREA = '/court/courts/{area}';
const UPDATE_COURT_DETAILS = '/court/courts';
const VIEW_A_CASE_STATUS = '/case/caseDetails/{Case-Status}';
const FILE_A_CASE_BY_PUBLIC = '/case/public/fileACase';
const FILE_A_CASE_BY_LAWYER = '/case/lawyer/fileACase';

const GENERATE_REPORTS = '/reports/generateReports';

export const LIST_OF_MENUS_FOR_ADMIN = [
    {
        title: 'Search Users',
        path: FETCH_USERS_BY_ROLE,
        cName: "nav-text",
        stateName: 'searchUsers',
        setStateName: 'setSearchUsers'
    },
    {
        title: 'Update User Status',
        path: UPDATE_USER_STATUS,
        cName: "nav-text",
        stateName: 'updateUserStatus',
        setStateName: 'setUpdateUserStatus'
    },
    {
        title: 'IPC Laws',
        path: FETCH_IPC_LAWS,
        cName: "nav-text",
        stateName: 'ipcLaw',
        setStateName: 'setIpcLaw'
    },
    {
        title: 'Update IPC Laws',
        path: UPDATE_IPC_LAWS,
        cName: "nav-text",
        stateName: 'updateIpcLaws',
        setStateName: 'setUpdateIpcLaws'
    },
    {
        title: 'List out Court',
        path: FETCH_COURT_BY_AREA,
        cName: "nav-text",
        stateName: 'courtByArea',
        setStateName: 'setCourtByArea'
    },
    {
        title: 'Update Court Details',
        path: UPDATE_COURT_DETAILS,
        cName: "nav-text",
        stateName: 'updateCourtDet',
        setStateName: 'setUpdateCourtDet'
    },
    {
        title: 'View Case Status',
        path: VIEW_A_CASE_STATUS,
        cName: "nav-text",
        stateName: 'viewCaseDet',
        setStateName: 'setViewCaseDet'
    },
    {
        title: 'Generate Reports',
        path: GENERATE_REPORTS,
        cName: "nav-text",
        stateName: 'generateReports',
        setStateName: 'setGenerateReports'
    }
];

export const LIST_OF_MENUS_FOR_LAWYER = [
    {
        title: 'IPC Laws',
        path: FETCH_IPC_LAWS,
        cName: "nav-text"
    },
    {
        title: 'List out Court',
        path: FETCH_COURT_BY_AREA,
        cName: "nav-text"
    },
    {
        title: 'View Case Status',
        path: VIEW_A_CASE_STATUS,
        cName: "nav-text"
    },
    {
        title: 'File a Case',
        path: FILE_A_CASE_BY_LAWYER,
        cName: "nav-text"
    }
];

export const LIST_OF_MENUS_FOR_PUBLIC = [
    {
        title: 'IPC Laws',
        path: FETCH_IPC_LAWS,
        cName: "nav-text"
    },
    {
        title: 'List out Court',
        path: FETCH_COURT_BY_AREA,
        cName: "nav-text"
    },
    {
        title: 'Search Lawyers',
        path: SEARCH_LAWYER_DETAILS,
        cName: "nav-text"
    },
    {
        title: 'View Case Status',
        path: VIEW_A_CASE_STATUS,
        cName: "nav-text"
    },
    {
        title: 'File a Case',
        path: FILE_A_CASE_BY_PUBLIC,
        cName: "nav-text"
    }
];

