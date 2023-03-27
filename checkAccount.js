import fs from "fs";
import chalk from "chalk";

export default function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName.toLowerCase()}.json`)) {
    console.log(chalk.bgRed.white("Esta conta não existe,tente novamente."));
    return false;
  }
  return true;
}
