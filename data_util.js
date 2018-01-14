import isString from 'lodash/isString';
import moment from 'moment';

module.exports = {
  isString: function (s) {
    return isString(s);
  },
  isStringEmpty: function (s) {
    if (!this.isNotNull(s)) {
      return true;
    }
    return s.length == 0;
  },
  isNumber: function (o) {
    return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
  },
  isObject: function (o) {
    return o !== null && typeof o === 'object';
  },
  isNotNull: function (o) {
    return o != null && o !== undefined;
  },
  replaceStringAt: function (string, startIndex, length, replacementCharacter) {
    return string.substring(0, startIndex) + replacementCharacter + Array(length).join(replacementCharacter);
  },
  getNumberFromBoolean: function (o) {
    if (this.isString(o)) {
      return o.toLowerCase() == 'true' ? 1 : 0;
    }

    return o == 1 ? 1 : 0;
  },
  getDateFromString: function (format, year, month, day) {
    var m = month ? moment().month(month).format("M") : 0;
    var d = day ? moment().month(day).format("D") : 0;
    return moment(new Date(year, m, d)).format(format);
  },
  getStringFromDate: function (d, format) {
    return moment(d, format);
  },
  getNumberFromCurrency: function (s) {
    return Number(s.replace(/[^0-9\.-]+/g, ""));
  },
  getValuesFromObjects: function (objects) {
    var arr = [];
    objects.map((obj) => {
      for (let key in obj) {
        arr.push(obj[key]);
      }
    });
    return arr;
  },
  getValuesFromRange: function (range) {
    var arr = [];
    for (i = range.from; i <= range.to; i+=range.interval) {
      arr.push(i);
    }
    return arr;
  },
  getKeyFromObjectsByValue: function (value, objects) {
    for (i = 0; i < objects.length; i++) {
      for (let key in objects[i]) {
        if (objects[i][key] === value) {
          return key;
        }
      }
    }
    return null;
  },
  getValueFromObjectsByKey: function (key, objects) {
    for (i = 0; i < objects.length; i++) {
      for (let objKey in objects[i]) {
        if (objKey === key) {
          return objects[i][objKey];
        }
      }
    }
    return null;
  },
  composeErrMsgFromError: function (err) {
    var errMsg = '';
    if (this.isNotNull(err.validations)) {
			for (i = 0; i < err.validations.length; i++) {
				for (j = 0; j < err.validations[i].message.length; j++) {
					if (errMsg.length > 0) {
						errMsg = errMsg + '\n';
					}

					errMsg = errMsg + err.validations[i].message[j];
				}
			}
		}
		return errMsg;
  }
};
