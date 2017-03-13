const holidayKR = require('holiday-kr');
const moment = require('moment');

function _convertHolidayKRObjectToMoment(obj) {
  return moment({
    year: obj.year,
    month: obj.month - 1,
    date: obj.day
  });
}

function _subtract(year, month, day) {
  return _convertHolidayKRObjectToMoment({
    year: year,
    month: month,
    day: day
  }).subtract(1, 'day').format('YYYY/M/D').split('/');
}

function converter(fn) {
  const _fn = function (year, month, day, iterationCount = 0) {
    const lunar = _convertHolidayKRObjectToMoment(fn(year, month, day));
    if (iterationCount > 0) {
      return (Array.from(Array(iterationCount).keys()))
        .map(i => {
          const targetYear = year + i;
          let result = null;
          if (targetYear <= 2101) {
            try {
              result = _fn(year + i, month, day)
            } catch (e) {
              if (e === '입력하신 날 또는 달이 없습니다. 다시 한번 확인하시기 바랍니다.') {
                // 음력 생일이 없는 연도도 있기 때문에 이 때는 하루전 날을 리턴한다.
                result = _fn(..._subtract(year + i, month, day))
              }
            }
          }
          return result || null;
        })
        .filter(date => date);
    }
    return lunar;
  };
  return _fn;
}

module.exports = {
  toSolar: converter(holidayKR.getSolar),
  fromSolar: converter(holidayKR.getLunar)
};