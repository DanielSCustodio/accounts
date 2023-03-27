import chalk from "chalk";
import getAccount from "./getAccount.js";
import save from "./save.js";

export default function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    return console.log(chalk.bgRed.white("Insira um valor válido, por favor."));
  } else if (Math.sign(amount) === -1) {
    return console.log(chalk.bgRed.white("Não é permitido números negativos."));
  }

  if (accountData.balance < amount) {
    return console.log(chalk.bgRed.white("Valor indisponível."));
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  save(accountName, accountData);

  console.log(chalk.green(`Valor sacado: R$ ${amount.toFixed(2)}`));
}
