import DeviceInfo from 'react-native-device-info';

module.exports = {
  getAppVersion: function () {
    const nativeAppVersion = DeviceInfo.getVersion();
    const PACKAGE = require('../../package.json');
    const reactNativeAppVersion = PACKAGE.version;

    return DeviceInfo.getVersion() + "." + reactNativeAppVersion;
  },
  getAppBuildNumber: function () {
    return DeviceInfo.getBuildNumber();
  },
  getAppBundleId: function () {
    return DeviceInfo.getBundleId();
  },
  getDeviceLocale: function () {
    return DeviceInfo.getDeviceLocale();
  },
  getDeviceCountry: function () {
    return DeviceInfo.getDeviceCountry();
  },
  getTimezone: function () {
    return DeviceInfo.getTimezone();
  },
  getDeviceOS: function () {
    return DeviceInfo.getSystemName();
  },
  getDeviceUniqueID: function () {
    return DeviceInfo.getUniqueID();
  },
  isProductionMode: function () {
    return !this.getAppBundleId().endsWith(".debug") && !this.getAppBundleId().endsWith(".staging");
  }
};
