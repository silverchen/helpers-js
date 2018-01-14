import DataUtil from './data_util';
import { Platform, StatusBar, Dimensions } from 'react-native';
import Toast from '@remobile/react-native-toast';
import SVProgressHUD from './SVProgressHUD';
import Global from './../global';

const { height, width } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

var UIUtil = module.exports = {
  scale: size => width / guidelineBaseWidth * size,
  verticalScale: size => height / guidelineBaseHeight * size,
  moderateScale: (size, factor = 0.5) => size + ( UIUtil.scale(size) - size ) * factor,
  showAlertDialog: function (msg) {
    setTimeout(() => {
      alert(msg);
    }, 100);
  },
  showErrorDialog: function (error) {
    if (DataUtil.isStringEmpty(error)) {
      return;
    }

    //InteractionManager.runAfterInteractions(() => {
      Toast.showLongCenter(error);
    //});
  },
  dismissErrorDialog: function () {
    //InteractionManager.runAfterInteractions(() => {
      Toast.hide();
    //});
  },
  showSpinner: function () {
    SVProgressHUD.showWithMaskType(SVProgressHUD.MaskType.Clear);
  },
  hideSpinner: function () {
    SVProgressHUD.dismiss();
  },
  setStatusBarStyle: function (statusBarStyle) {
    if (Global.getEnvironment() !== Global.APP_ENV_TYPE.production) {
      StatusBar.setBarStyle('dark-content', true);

      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
  			StatusBar.setBackgroundColor('rgb(255, 51, 51)', true);
  		}

      return;
    }

    StatusBar.setBarStyle(statusBarStyle?statusBarStyle:'default', true);

		if (Platform.OS === 'android') {
			StatusBar.setTranslucent(true);
			StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.1)', true);
		}
  }
};
