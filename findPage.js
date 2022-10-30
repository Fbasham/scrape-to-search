import fs from "fs";

function findPage(search) {
  let data = fs.readFileSync("pageData.json", "utf-8");
  let pages = JSON.parse(data);
  return pages
    .filter((page) => new RegExp(search, "i").test(page.text))
    .map((page) => page.href);
}

console.log(findPage("agile"));
