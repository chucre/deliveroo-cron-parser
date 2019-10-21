const args = process.argv.slice(2, 8);
const Parser = require("./cron-parser");
const Formater = require("./cron-time-formater");

const parsed = new Parser(args);
const formater = new Formater();

console.log(formater.format(parsed));
