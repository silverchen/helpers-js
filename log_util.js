import { Sentry, SentrySeverity } from 'react-native-sentry';
import DeviceUtil from './device_util';

module.exports = {
  setUser: function (email, userId, name) {
    Sentry.setUserContext({
      email: email,
      userID: userId,
      username: name
    });
  },
  setGlobalTags: function (tags) {
    Sentry.setTagsContext(tags);
  },
  logErrorMessage: function (message, tags) {
    if (!DeviceUtil.isProductionMode()) {
      return;
    }
    Sentry.captureMessage(message, {
      level: SentrySeverity.Error,
      tags: tags
    });
  },
  test: function (lineNumber) {
    return lineNumber;
    // var err = this;
    // var caller_line = err.stack.split("\n")[4];

    // var line = (new Error).stack.split("\n")[2];
    // line = (line.indexOf(' (') >= 0
    //         ? line.split(' (')[1].substring(0, line.length - 1)
    //         : line.split('at ')[1]
    //         );
    //
    // return this.lineNumber;
  }
};

/* Sample usage
  LogUtil.logErrorMessage("Something went wrong", {
    "lineNumber": 12,
    "file": "home.js"
  });
*/
