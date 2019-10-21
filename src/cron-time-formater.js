const TOTAL_NAME_COLUMN_LENGHT = 14;
class CronTimeFormater {
  format(time) {
    const nameColumn = [
      "minute",
      "hour",
      "day of month",
      "month",
      "day of week",
      "command"
    ];
    const valuesColumn = [
      time["minutes"].join(", "),
      time["hours"].join(", "),
      time["days"].join(", "),
      time["months"].join(", "),
      time["weekdays"].join(", "),
      time["command"]
    ];
    const maxNameLenght = TOTAL_NAME_COLUMN_LENGHT;
    let output = [];

    for (let line = 0; line < nameColumn.length; line++) {
      const nameEmptySpace = maxNameLenght - nameColumn[line].length;

      output.push(
        `${nameColumn[line]}${this.repeat(nameEmptySpace, " ")}${
          valuesColumn[line]
        }`
      );
    }
    return output.join("\n");
  }

  repeat(times, char) {
    let output = "";
    for (let i = 0; i < times; i++) {
      output += char;
    }
    return output;
  }
}

module.exports = CronTimeFormater;
