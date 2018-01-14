import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const _SYS_ENV = 'sysEnvironment';
const _FIRST_TIME_FLAG = 'firstTimeFlag';
const _USER = 'user';
const _TOKEN = 'token';
const _USER_MODE = 'userMode';

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
})

module.exports = {
	storeSysEnvironment: function (environment) {
    storage.save({
    	key: _SYS_ENV,
    	data: environment,
    	expires: null
    });
  },
  getSysEnvironment: function (success, error) {
    storage.load({
    	key: _SYS_ENV,
    	autoSync: true,
    	syncInBackground: true,
    }).then(data => {
      success(data);
    	console.log(data);
    }).catch(err => {
      error(err);
    	console.warn(err.message);
    });
  },
	storeIsFirstTime: function (isFirstTime) {
    storage.save({
    	key: _FIRST_TIME_FLAG,
    	data: isFirstTime,
    	expires: null
    });
  },
  getIsFirstTime: function (success, error) {
    storage.load({
    	key: _FIRST_TIME_FLAG,
    	autoSync: true,
    	syncInBackground: true,
    }).then(data => {
      success(data);
    	console.log(data);
    }).catch(err => {
      error(err);
    	console.warn(err.message);
    });
  },
  storeUser: function (u) {
    storage.save({
    	key: _USER,
    	data: u,
    	expires: null
    });
  },
  getUser: function (success, error) {
    storage.load({
    	key: _USER,
    	autoSync: true,
    	syncInBackground: true,
    }).then(data => {
      success(data);
    	console.log(data);
    }).catch(err => {
      error(err);
    	console.warn(err.message);
    });
  },
	removeUser: function () {
    storage.remove({
    	key: _USER
    });
  },
	storeToken: function (t) {
    storage.save({
    	key: _TOKEN,
    	data: t,
    	expires: null
    });
  },
  getToken: function (success, error) {
    storage.load({
    	key: _TOKEN,
    	autoSync: true,
    	syncInBackground: true,
    }).then(data => {
      success(data);
    	console.log(data);
    }).catch(err => {
      error(err);
    	console.warn(err.message);
    });
  },
  removeToken: function () {
    storage.remove({
    	key: _TOKEN
    });
  },
  storeUserMode: function (m) {
    storage.save({
    	key: _USER_MODE,
    	data: m,
    	expires: null
    });
  },
  getUserMode: function (success, error) {
    storage.load({
    	key: _USER_MODE,
    	autoSync: true,
    	syncInBackground: true,
    }).then(data => {
      success(data);
    	console.log(data);
    }).catch(err => {
      error(err);
    	console.warn(err.message);
    });
  },
  removeUserMode: function () {
    storage.remove({
    	key: _USER_MODE
    });
  },
};
