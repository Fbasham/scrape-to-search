import fetch from "node-fetch";
import { parse } from "node-html-parser";
import fs from "fs";

const BASE = "https://digital-dojo-engagement-main.bdm-dev.dts-stn.com";

async function getAllHrefs() {
  let res = await fetch(`${BASE}/home`);
  const root = parse(await res.text());
  return new Set(
    root.querySelectorAll("header nav a").map((e) => e.getAttribute("href"))
  );
}

async function getPage(href) {
  let res = await fetch(`${BASE}${href}`);
  return {
    href,
    text: await res.text(),
  };
}

async function main() {
  let hrefs = await getAllHrefs();
  let data = await Promise.all([...hrefs].map((href) => getPage(href)));
  fs.writeFile("pageData.json", JSON.stringify(data, null, 2), (err) => {
    if (err) console.log(err);
  });
}
