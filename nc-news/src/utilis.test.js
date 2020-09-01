const formatDate = require("../src/utilis/utilisFuncs");

describe("formatDate()", () => {
  test("returns a string ", () => {
    expect(typeof formatDate("")).toBe("string");
  });
  test("formats string with only the date and time ", () => {
    const input = "2017-06-02T02:32:50.127Z";
    const output = "02:32:50 on 02/06/2017";
    expect(formatDate(input)).toBe(output);
  });
});
