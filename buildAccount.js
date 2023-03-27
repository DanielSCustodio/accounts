import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import operation from "./index.js"

export default function buildAccount() {
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
            "A sua conta deve possuir um nome válido. Tente novamente.\nNão possuir espaços em branco.\nNão possuir números.\nNão possuir acentos.\nNão possuir caractéres especiais."
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
      operation();
    })
    .catch((err) => console.log(err));
}
