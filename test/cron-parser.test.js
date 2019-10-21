const assert = require("assert");
const Parser = require("../src/cron-parser");

describe("Parser", () => {
  describe("#constructor()", () => {
    it("It should throw exception if args size is wrong", () => {
      assert.throws(() => new Parser([]), Error, "Wrong number of arguments");
    });

    it("It should parse asterisk as partterns", () => {
      const asteriskPatterns = ["*", "*", "*", "*", "*", "./some-command.sh"];
      const parsed = new Parser(asteriskPatterns);
      assert.ok(parsed);
      const minutes = Array.from(Array(60).keys());
      const hours = Array.from(Array(24).keys());
      const days = Array.from(Array(31).keys());
      const months = Array.from(Array(12).keys());
      const weekdays = Array.from(Array(7).keys());

      assert.deepEqual(parsed.minutes, minutes);
      assert.deepEqual(parsed.hours, hours);
      assert.deepEqual(parsed.days, days);
      assert.deepEqual(parsed.months, months);
      assert.deepEqual(parsed.weekdays, weekdays);
      assert.deepEqual(parsed.command, "./some-command.sh");
    });

    it("It should parse list separeted with comma as partterns", () => {
      const asteriskPatterns = [
        "1,2,3",
        "3,4",
        "3,5",
        "6,7",
        "0,3,6",
        "./some-command.sh"
      ];
      const parsed = new Parser(asteriskPatterns);
      assert.ok(parsed);
      const minutes = [1, 2, 3];
      const hours = [3, 4];
      const days = [3, 5];
      const months = [6, 7];
      const weekdays = [0, 3, 6];

      assert.deepEqual(parsed.minutes, minutes);
      assert.deepEqual(parsed.hours, hours);
      assert.deepEqual(parsed.days, days);
      assert.deepEqual(parsed.months, months);
      assert.deepEqual(parsed.weekdays, weekdays);
      assert.deepEqual(parsed.command, "./some-command.sh");
    });

    it("It should parse fraction partterns", () => {
      const asteriskPatterns = [
        "*/15",
        "*/4",
        "*/10",
        "*/3",
        "*/2",
        "./some-command.sh"
      ];
      const parsed = new Parser(asteriskPatterns);
      assert.ok(parsed);
      const minutes = [0, 15, 30, 45];
      const hours = [0, 4, 8, 12, 16, 20];
      const days = [0, 10, 20, 30];
      const months = [0, 3, 6, 9];
      const weekdays = [0, 2, 4, 6];

      assert.deepEqual(parsed.minutes, minutes);
      assert.deepEqual(parsed.hours, hours);
      assert.deepEqual(parsed.days, days);
      assert.deepEqual(parsed.months, months);
      assert.deepEqual(parsed.weekdays, weekdays);
      assert.deepEqual(parsed.command, "./some-command.sh");
    });

    it("It should parse range partterns", () => {
      const asteriskPatterns = [
        "10-15",
        "2-4",
        "4-10",
        "3-6",
        "1-5",
        "./some-command.sh"
      ];
      const parsed = new Parser(asteriskPatterns);
      assert.ok(parsed);
      const minutes = [10, 11, 12, 13, 14, 15];
      const hours = [2, 3, 4];
      const days = [4, 5, 6, 7, 8, 9, 10];
      const months = [3, 4, 5, 6];
      const weekdays = [1, 2, 3, 4, 5];

      assert.deepEqual(parsed.minutes, minutes);
      assert.deepEqual(parsed.hours, hours);
      assert.deepEqual(parsed.days, days);
      assert.deepEqual(parsed.months, months);
      assert.deepEqual(parsed.weekdays, weekdays);
      assert.deepEqual(parsed.command, "./some-command.sh");
    });
  });
});
