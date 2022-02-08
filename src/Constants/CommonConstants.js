export const ONLINE_LAW_SYSTEM_MS_HOST = 'http://localhost:';
export const ONLINE_LAW_SYSTEM_MS_PORT = '5001';

export const POST = 'POST'
export const GET = 'GET'
export const PUT = 'PUT'

export const ADMIN = 'Admin'
export const LAWYER = 'Lawyer'
export const PUBLIC = 'Public'
export const USER_NAME = 'User Name'
export const USER_ROLE = 'User Role'
export const USER_EMAIL = 'User Email'
export const USER_ID = 'User Id'

export const LOGIN_USER = '/user/login';
export const REGISTER_USER = '/user/registerUser';
export const FETCH_USERS_BY_ROLE = '/user/usersByRole/';
export const FETCH_IPC_LAWS = '/laws/ipcLaws/';
export const UPDATE_USER_STATUS = '/user/userStatus';
export const UPDATE_IPC_LAWS = '/laws/ipcLaw';
export const UPDATE_COURT_DETAILS = '/court/courts';
export const FETCH_COURT_BY_AREA = '/court/fetch/courts';


const VIEW_A_CASE_STATUS = '/case/caseDetails/{Case-Status}';
const FILE_A_CASE_BY_PUBLIC = '/case/public/fileACase';
const FILE_A_CASE_BY_LAWYER = '/case/lawyer/fileACase';
const GENERATE_REPORTS = '/reports/generateReports';

export const LIST_OF_MENUS_FOR_ADMIN = [
    {
        title: 'Search Users',
        cName: "nav-text",
        stateName: 'searchUsers'
    },
    {
        title: 'IPC Laws',
        cName: "nav-text",
        stateName: 'ipcLaw'
    },
    {
        title: 'Update IPC Laws',
        cName: "nav-text",
        stateName: 'updateIpcLaws'
    },
    {
        title: 'List out Court',
        cName: "nav-text",
        stateName: 'courtByArea'
    },
    {
        title: 'Update Court Details',
        cName: "nav-text",
        stateName: 'updateCourtDet'
    },
    {
        title: 'View Case Status',
        cName: "nav-text",
        stateName: 'viewCaseDet'
    },
    {
        title: 'Generate Reports',
        cName: "nav-text",
        stateName: 'generateReports'
    }
];

export const LIST_OF_MENUS_FOR_LAWYER = [
    {
        title: 'IPC Laws',
        cName: "nav-text",
        stateName: 'ipcLaw'
    },
    {
        title: 'List out Court',
        cName: "nav-text",
        stateName: 'courtByArea'
    },
    {
        title: 'View Case Status',
        cName: "nav-text",
        stateName: 'viewCaseDet'
    },
    {
        title: 'File a Case',
        cName: "nav-text",
        stateName: 'fileACase'
    }
];

export const LIST_OF_MENUS_FOR_PUBLIC = [
    {
        title: 'IPC Laws',
        cName: "nav-text",
        stateName: 'ipcLaw'
    },
    {
        title: 'List out Court',
        cName: "nav-text",
        stateName: 'courtByArea'
    },
    {
        title: 'View Case Status',
        cName: "nav-text",
        stateName: 'viewACase'
    },
    {
        title: 'File a Case',
        cName: "nav-text",
        stateName: 'fileACase'
    }
];

