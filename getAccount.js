import fs from "fs";

export default function getAccount(accountName) {
  const accountJSON = fs.readFileSync(
    `accounts/${accountName.toLowerCase()}.json`,
    {
      encoding: "utf-8",
      flag: "r",
    }
  );
  return JSON.parse(accountJSON);
}
