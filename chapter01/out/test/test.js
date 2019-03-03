"use strict";
describe("get length", function () {
    it('"abc" should have length 3', function () {
        getLength("abc").should.equal(3);
    });
    it('"" should have length 0', function () {
        getLength('').should.equal(1);
    });
});
