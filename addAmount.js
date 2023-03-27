import chalk from "chalk";
import getAccount from "./getAccount.js";
import save from "./save.js";

export default function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    return console.log(chalk.bgRed.white("Insira um valor, por favor."));
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  save(accountName, accountData);

  console.log(chalk.green(`Valor depositado: R$ ${amount.toFixed(2)}`));
}
