import * as CommonConstants from '../Constants/CommonConstants.js'

export const LocalStorageService = {
    removeLoginItems
};

function removeLoginItems() {

    localStorage.removeItem(CommonConstants.USER_NAME);
    localStorage.removeItem(CommonConstants.USER_ROLE);
    localStorage.removeItem(CommonConstants.USER_EMAIL);
    localStorage.removeItem(CommonConstants.USER_ID);

}
