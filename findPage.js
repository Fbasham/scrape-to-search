import fs from "fs";

// function findPage(search) {
//   let data = fs.readFileSync("pageData.json", "utf-8");
//   let pages = JSON.parse(data);
//   return pages
//     .filter((page) => new RegExp(search, "i").test(page.text))
//     .map((page) => page.href);
// }

async function findPage(search) {
  try {
    let data = await fs.promises.readFile("pageData.json", "utf-8");
    let pages = JSON.parse(data);
    return pages
      .filter((page) => new RegExp(search, "i").test(page.text))
      .map((page) => page.href);
  } catch (e) {
    return;
  }
}

async function f() {
  console.log(await findPage("agile"));
}

f();
