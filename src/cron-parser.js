class Parser {
  constructor(splitedValues) {
    if (splitedValues.length < 6) {
      throw new Error(`Wrong number of arguments`);
    }
    const timeParameters = [
      {
        time_name: "minutes",
        max: 60
      },
      {
        time_name: "hours",
        max: 24
      },
      {
        time_name: "days",
        max: 31
      },
      {
        time_name: "months",
        max: 12
      },
      {
        time_name: "weekdays",
        max: 7
      }
    ];
    timeParameters.forEach((parameter, index) => {
      this.parseTimes(splitedValues[index], parameter.time_name, parameter.max);
    });
    this.parseCommand(splitedValues[5]);
  }

  getPatternType(pattern, portion) {
    if (pattern == "*") {
      return "ALL";
    } else if (pattern.match(/^[0-9]+-[0-9]+$/)) {
      return "RANGE";
    } else if (pattern.match(/^\*+\/[0-9]+$/)) {
      return "FRACTION";
    } else if (pattern.match(/^[0-9]+(,[0-9]+)*$/)) {
      return "LIST";
    } else {
      throw new Error(`the pattern ${pattern} is invalid for ${portion}`);
    }
  }
  extractRange(pattern) {
    const parts = pattern.split("-");
    return {
      start: parts[0],
      end: parts[1]
    };
  }

  extractFraction(pattern) {
    const parts = pattern.split("/");
    return parts[1];
  }

  parseTimes(pattern, time_name, max) {
    this[time_name] = [];
    const patternType = this.getPatternType(pattern, time_name);
    let fraction;
    let range;
    switch (patternType) {
      case "RANGE":
        range = this.extractRange(pattern);
        break;
      case "FRACTION":
        fraction = this.extractFraction(pattern);
        break;
      case "LIST":
        this[time_name] = pattern.split(",");
        return;
    }

    for (let part = 0; part < max; part++) {
      switch (patternType) {
        case "ALL":
          this[time_name].push(part);
          break;
        case "RANGE":
          if (part >= range.start && part <= range.end) {
            this[time_name].push(part);
          }
          break;
        case "FRACTION":
          if (part % fraction == 0) {
            this[time_name].push(part);
          }
          break;
      }
    }
  }

  parseCommand(command) {
    this.command = command;
  }
}

module.exports = Parser;
