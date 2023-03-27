import inquirer from "inquirer";
import chalk from "chalk";
import accountsExists from "./accountsExists.js";
import buildAccount from "./buildAccount.js";
import checkAccount from "./checkAccount.js";
import removeAmount from "./removeAmount.js";
import operation from "./index.js";

export default function withDraw() {
  if (accountsExists()) {
    return buildAccount();
  }
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "[SAQUE] Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withDraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual o valor do saque?",
          },
        ])
        .then((answer) => {
          let amount;
          if (!isNaN(answer["amount"])) {
            amount = Number(answer["amount"]);
          } else {
            console.log(chalk.bgRed.white("Valor inválido. Tente novamente."));
            withDraw();
            return;
          }
          removeAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
