#!/usr/bin/env node
import * as clack from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
async function main() {
  clack.intro(
    chalk.bold.bgGreenBright("Hey there! Welcome to the Diremover CLI >_<")
  );

  const allDirs = fs
    .readdirSync("./", { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => {
      return { value: item.name, label: item.name };
    });

  const selectedDirs = await clack.multiselect({
    message: "Select the directories you want to delete",
    options: allDirs,
  });

  const spinner = clack.spinner();
  spinner.start("Deleting directories...");

  selectedDirs.forEach((dir) => {
    fs.removeSync(dir);
    console.log(chalk.green(`Deleting ${dir} ... in progress. Please wait...`));
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  spinner.stop("Directory deleted successfully!");

  clack.outro(
    chalk.bold.bgGreenBright("Thanks for using Diremover. Have a great day! ^_^")
  );
}

main();
