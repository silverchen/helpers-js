import Mixpanel from 'react-native-mixpanel';
import DataUtil from './data_util';
import Global from './../global';
import { USER_MODE } from './../consts';

module.exports = {
  init: function (token) {
    Mixpanel.sharedInstanceWithToken(token);
  },
  track: function (eventName, props) {
    if (Global.getEnvironment() !== Global.APP_ENV_TYPE.production) {
      return;
    }
    var p = DataUtil.isNotNull(props) ? props : {};
    Mixpanel.trackWithProperties(eventName, p);
  },
  setUser: function (props) {
    Mixpanel.set(props);
  },
  setAlias: function (alias) {
    Mixpanel.createAlias(String(alias));
  },
  identifyAlias: function (alias) {
    Mixpanel.identify(String(alias));
  },
  logUser: function (user, currentUserMode) {
    var userMode = currentUserMode === USER_MODE.RecruiterMode ? 'recruiter' : 'jobSeeker';

    Mixpanel.identify(String(user.userId));
    Mixpanel.set({
      "$first_name": user.firstName,
      "$last_name": user.lastName,
      "$email": user.email,
      "$phone": user.phoneNumber,
      "Age": user.age,
      "Gender": user.gender,
      "Roles": user.roles.map(r => r === USER_MODE.RecruiterMode ? 'Recruiter' : 'Job Seeker').join()
    });
  }
};


/*
MixpanelInstance.setAlias('testuser2');

MixpanelInstance.identifyAlias('testuser2');

MixpanelInstance.setUser({
  $first_name: 'Test',
  $last_name: 'User2',
  $email: 'test2@email.com',
  props1: 'test',
  props2: 1
});

MixpanelInstance.track('test_event', {
  event_props1: 'testing',
  event_props2: 2
});
*/
