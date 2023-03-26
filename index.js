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

      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
      } else if (action === "Depósito") {
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.white("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGrey.white("Parabéns por escolher o nosso banco!"));
  console.log(chalk.white("Defina as opções da sua conta a seguir:"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome.")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns! A sua conta foi criada."));
      opetation();
    })
    .catch((err) => console.log(err));
}
