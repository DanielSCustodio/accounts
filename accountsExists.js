import fs from "fs";
import chalk from "chalk";

export default function accountsExists() {
  if (!fs.existsSync("accounts")) {
    console.log(
      chalk.bgRed.white(
        "Não existem contas cadastradas. Adicione uma conta para continuar."
      )
    );
    return true;
  }
}
