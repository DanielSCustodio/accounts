import chalk from "chalk";
import inquirer from "inquirer";
import accountsExists from "./accountsExists.js";
import buildAccount from "./buildAccount.js";
import getAccount from "./getAccount.js";
import operation from "./index.js";
import checkAccount from "./checkAccount.js";

export default function getAccountBalance() {
  if (accountsExists()) {
    return buildAccount();
  }
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.white(
          `Olá, ${accountName.toLowerCase()}, o saldo da sua conta é de R$ ${accountData.balance}`
        )
      );

      operation();
    })
    .catch((err) => console.log(err));
}
