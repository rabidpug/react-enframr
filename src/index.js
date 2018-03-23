#!/usr/bin/env node

import { execSync, spawn } from 'child_process';

import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import program from 'commander';
import validateName from 'validate-npm-package-name';

const startPath = process.cwd();
function validateProjectName(name) {
  const isValid = validateName(name);
  const errors = [...(isValid.warnings ? isValid.warnings : []), ...(isValid.errors ? isValid.errors : [])].join('\n');

  return isValid.validForNewPackages ? true : errors;
}

function validatePath(path) {
  const isValid = fs.existsSync(path);
  return isValid || 'Path does not exist';
}

function makePackageJson(config) {
  let template = fs.readFileSync(path.resolve(__dirname, '../templates/package.template.json'), 'utf8');
  const mgr = config ? config.manager : 'yarn';
  let npmVersion, yarnVersion, nodeVersion;
  try {
    npmVersion = execSync('npm --version').toString();
  } catch (e) {}
  try {
    yarnVersion = execSync('yarn --version').toString();
  } catch (e) {}
  try {
    nodeVersion = execSync('node --version').toString();
  } catch (e) {}
  const strings = {
    npm: {
      $pmgrname: 'npm',
      $pmgrver: npmVersion && `${npmVersion[0]}.x`,
      $pmgrtest: 'npm run test',
      $pmgrinst: 'npm install',
    },
    yarn: {
      $pmgrname: 'yarn',
      $pmgrver: yarnVersion && `${yarnVersion[0]}.x`,
      $pmgrtest: 'yarn test',
      $pmgrinst: 'yarn',
    },
  };
  if (!nodeVersion) console.log('node cannot be found in PATH');
  else if (!strings[mgr].$pmgrver) console.log(`${mgr} cannot be found in PATH`);
  else {
    template = template.replace(/\$nodever/g, nodeVersion[1] + '.x');
    template = template.replace(/\$prjname/g, config.name);
    Object.keys(strings[mgr]).forEach(item => {
      const replacement = strings[mgr][item];
      const replace = new RegExp('\\' + item, 'g');
      template = template.replace(replace, replacement);
    });
    return template;
  }
}

function generateFiles(config) {
  console.log('creating folder and generating package.json dependencies...');
  !fs.existsSync(config.path) && fs.mkdirSync(config.path);
  const packageJson = makePackageJson(config);
  packageJson && fs.writeFileSync(path.join(config.path, 'package.json'), packageJson);
  console.log('...completed.');
}
function copyStructure(config) {
  console.log('copying project structure and example files to folder...');
  !fs.existsSync(config.path) && fs.mkdirSync(config.path);
  const structurePath = path.resolve(__dirname, '../payload');
  fs.copySync(structurePath, config.path, { overwrite: true });
  console.log('...completed.');
}
function installModules(config) {
  console.log(`installing dependencies...`);
  const installer = spawn(config.manager, config.manager === 'npm' ? ['install'] : [], {
    cwd: config.path,
    stdio: 'inherit',
  });
  installer.on('close', code => {
    code === 0
      ? console.log(
          `...completed.\nTime to:\ncd ${config.path} && git init && ${config.manager} init\n${
            config.manager === 'npm' ? 'npm run' : 'yarn'
          } dev to start developing.\nDon't forget to link heroku, travis and coveralls to your repo. Refer to ENFRAMR.md for more info`,
        )
      : console.log('Shit, something fucked up');
  });
}

function configBP(name) {
  const questions = [
    {
      type: 'list',
      name: 'manager',
      message: 'Package manager:',
      choices: ['npm', 'yarn'],
      default: 'yarn',
    },
    {
      type: 'input',
      name: 'path',
      message: 'Project parent folder:',
      default: './',
      validate: validatePath,
    },
  ];
  inquirer.prompt(questions).then(config => {
    config.name = name;
    config.path = path.resolve(path.join(startPath, config.path, config.name));
    createProject(config);
  });
}
function createProject(config) {
  console.log(
    `Creating a React-ENFRAMR project named ${chalk.green(config.name)} in the folder ${chalk.yellow(
      config.path,
    )} for the package manager ${chalk.magenta(config.manager)}`,
  );
  generateFiles(config);
  copyStructure(config);
  installModules(config);
}
function initBP(name) {
  const config = {
    name,
    path: path.resolve(path.join(startPath, name)),
    manager: 'yarn',
  };
  createProject(config);
}

program
  .version('0.1.9')
  .arguments('<name>')
  .description('enter the name of the project you want to generate')
  .option('-c, --config', 'Customise package options for the project')
  .action((name, cmd) => {
    const isValid = validateProjectName(name);
    if (isValid === true) {
      (cmd.config ? configBP : initBP)(name);
    } else console.log(isValid);
  });

program.parse(process.argv);
