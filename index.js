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
        deposit();
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        exit();
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
      let accountName;
      if (
        !answer["accountName"] ||
        answer["accountName"].indexOf(" ") >= 0 ||
        !/^[a-z]+$/i.test(answer["accountName"])
      ) {
        console.log(
          chalk.bgRed.white(
            "A sua conta deve possuir um nome válido.\nNão possuir espaços em branco.\nNão possuir números.\nNão possuir acentos.\nNão possuir caractéres especiais"
          )
        );
        return buildAccount();
      } else {
        accountName = answer["accountName"];
        console.info(accountName);
      }

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName.toLowerCase()}.json`)) {
        console.log(
          chalk.bgRed.white("Esta conta já existe, escolha outro nome.")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName.toLowerCase()}.json`,
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

function exit() {
  console.log(chalk.bgBlue.white("Obrigado por usar o Accounts!"));
  process.exit();
}

function deposit() {
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
          opetation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName.toLowerCase()}.json`)) {
    console.log(chalk.bgRed.white("Esta conta não existe,tente novamente."));
    return false;
  }
  return true;
}

function accountsExists() {
  if (!fs.existsSync("accounts")) {
    console.log(
      chalk.bgRed.white(
        "Não existem contas cadastradas. Adicione uma conta para continuar."
      )
    );
    return true;
  }
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.white("Insira um valor, por favor."));
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName.toLowerCase()}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(chalk.green(`Valor depositado: R$ ${amount}`));
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(
    `accounts/${accountName.toLowerCase()}.json`,
    {
      encoding: "utf-8",
      flag: "r",
    }
  );
  return JSON.parse(accountJSON);
}
