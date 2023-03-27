import chalk from "chalk";
import inquirer from "inquirer";
import accountsExists from "./accountsExists.js";
import buildAccount from "./buildAccount.js";
import checkAccount from "./checkAccount.js";
import operation from "./index.js";
import addAmount from "./addAmount.js";

export default function deposit() {
  if (accountsExists()) {
    return buildAccount();
  }

  inquirer
    .prompt([
      {
        name: "accountName",
        message: "[DEPÓSITO] Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return deposit();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          let amount;
          if (!isNaN(answer["amount"])) {
            amount = Number(answer["amount"]);
          } else {
            console.log(chalk.bgRed.white("Valor inválido. Tente novamente."));
            deposit();
            return;
          }
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
