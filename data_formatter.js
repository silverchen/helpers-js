import moment from 'moment';
import { MAX_NUMBER, CURRENCY_SYMBOL } from './../consts';

module.exports = {
  getFormattedDepreciation: function (number) {
    var currencyValue = (number).format(2);
    return CURRENCY_SYMBOL + currencyValue.replace('.00', '') + '/yr';
  },
  getFormattedInstallment: function (number) {
    var currencyValue = (number).format(2);
    return CURRENCY_SYMBOL + currencyValue.replace('.00', '') + '/mth';
  },
  getFormattedCurrencyValue: function (number) {
    var currencyValue = (number).format(2);
    return CURRENCY_SYMBOL + currencyValue.replace('.00', '');
  },
  getFormattedMileage: function (number) {
    return (number).format(0) + ' km';
  },
  getFormattedEngineCC: function (number) {
    return number + 'cc';
  },
  getFormattedDate: function (timestamp) {
    return moment.unix(timestamp).format("d MMM YYYY");
  },
  getFormattedShortMonth: function (number) {
    return moment(number, 'M').format("MMM");
  },
  // getFormattedNumberOfYears: function (number) {
  //   if (number === 0) {
  //     return 'Fresh Graduate';
  //   } else if (number === MAX_NUMBER) {
  //     return 'More than 15 years';
  //   }
  //   return number>1 ? number + ' years' : number + ' year';
  // },
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  shorthenThousandNumber: function (number) {
    return number > 999 ? (number/1000).toFixed(0) + 'K' : number
  }
};

Number.prototype.format = function(c, d, t) {
  var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
