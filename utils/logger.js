const chalk = require("chalk");

let log = (message) => {
    const date = new Date().toISOString();
    console.log(`${chalk.gray(date)}: ${message}`);
};

log.warn = (message) => {
    const date = new Date().toISOString();
    console.log(`${chalk.gray(date)}: ${chalk.yellow(message)}`);
}

log.err = (message) => {
    const date = new Date().toISOString();
    console.log(`${chalk.gray(date)}: ${chalk.red(message)}`);
}

module.exports = log