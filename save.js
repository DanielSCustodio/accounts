import fs from "fs";

export default function save(accountName, accountData) {
  accountData.balance = accountData.balance.toFixed(2);

  fs.writeFileSync(
    `accounts/${accountName.toLowerCase()}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );
}
