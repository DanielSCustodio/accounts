import chalk from "chalk";

export default function exit() {
  console.log(chalk.bgBlue.white("Obrigado por usar o Accounts!"));
  process.exit();
}
