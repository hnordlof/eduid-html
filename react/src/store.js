
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import emailsReducer from 'reducers/Emails';
import configReducer from 'reducers/Config';
import openidConnectReducer from 'reducers/OpenidConnect';
import openidConnectFrejaReducer from 'reducers/OpenidConnectFreja';
import mobileReducer from 'reducers/Mobile';
import securityReducer from 'reducers/Security';
import chpassReducer from 'reducers/ChangePassword';

const eduIDApp = combineReducers({
  chpass: chpassReducer,
  config: configReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  openid_freja_data: openidConnectFrejaReducer,
  personal_data: personalDataReducer,
  phones: mobileReducer,
  security: securityReducer
});

export default eduIDApp;
