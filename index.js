// módulos externos
import inquirer from "inquirer";
import chalk from "chalk";

// módulos internos
import fs from "fs";

opetation();

function opetation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "o que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depósito",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      console.log(action);
    })
    .catch((err) => console.log(err));
}
