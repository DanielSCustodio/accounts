import chalk from "chalk";
import buildAccount from "./buildAccount.js";

export default function createAccount() {
  console.log(chalk.bgGrey.white("Parabéns por escolher o nosso banco!"));
  console.log(chalk.white("Defina as opções da sua conta a seguir:"));
  buildAccount();
}
