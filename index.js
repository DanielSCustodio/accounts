import inquirer from "inquirer";
import exit from "./exit.js";
import createAccount from "./createAccount.js";
import getAccountBalance from "./getAccountBalance.js";
import deposit from "./deposit.js";
import withDraw from "./withDraw.js";

export default function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depósito",
          "Saque",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depósito") {
        deposit();
      } else if (action === "Saque") {
        withDraw();
      } else if (action === "Sair") {
        exit();
      }
    })
    .catch((err) => console.log(err));
}

operation();
