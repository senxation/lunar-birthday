const lunarBirthday = require('../');
const holidayKR = require('holiday-kr');
const assert = require('assert');
const moment = require('moment');

describe('convert lunar dates to solar dates.', function() {
  describe('toSolar(2017, 1, 1)', function() {
    it('should return moment object of (2017, 1, 28)', function() {
      assert.equal(
        moment({ year: 2017, month: 0, date: 28 }).format('YYYY/MM/DD'),
        lunarBirthday.toSolar(2017, 1, 1).format('YYYY/MM/DD')
      );
    });
  });

  describe('toSolar(1983, 3, 30)', function() {
    it('should return moment object of (1983, 5, 12)', function() {
      assert.equal(
        moment({ year: 1983, month: 4, date: 12 }).format('YYYY/MM/DD'),
        lunarBirthday.toSolar(1983, 3, 30).format('YYYY/MM/DD')
      );
    });
  });

  describe('toSolar(1983, 3, 30, 100)', function() {
    it('should return an array of moment objects for 100 years from 1983, every year on 3/3(lunar)', function() {
      assert.ok(
        lunarBirthday.toSolar(1983, 3, 30, 100).every(m => m.isValid())
      );
    });
  });
});

describe('convert solar dates to lunar dates.', function() {
  describe('fromSolar(2017, 1, 1)', function() {
    it('should return moment object of (2017, 1, 28)', function() {
      assert.equal(
        moment({ year: 2016, month: 11, date: 4 }).format('YYYY/MM/DD'),
        lunarBirthday.fromSolar(2017, 1, 1).format('YYYY/MM/DD')
      );
    });
  });

  describe('fromSolar(1983, 5, 12)', function() {
    it('should return moment object of (1983, 3, 30)', function() {
      assert.equal(
        moment({ year: 1983, month: 2, date: 30 }).format('YYYY/MM/DD'),
        lunarBirthday.fromSolar(1983, 5, 12).format('YYYY/MM/DD')
      );
    });
  });

  describe('fromSolar(1983, 5, 12, 100)', function() {
    it('should return an array of moment objects for 100 years from 1983, every year on 5/12(solar)', function() {
      assert.ok(
        lunarBirthday.fromSolar(1983, 5, 12, 100).every(m => m.isValid())
      );
    });
  });
});
