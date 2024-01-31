import * as fs from 'fs'
import * as core from '@actions/core';
import path = require("path");

export interface PackageJson {
    name: string,
    version: string,
}

export default function(): void {
    const pathPackage = path.join(core.getInput('path'), 'CHANGELOG.md');

    logFile(pathPackage);

    fs.appendFileSync(pathPackage, 'test');

    logFile(pathPackage);


    // const packageProject: PackageJson = {
    //     name: '',
    //     version: '',
    // };

    // if (fs.existsSync(pathPackage)) {
    //     return JSON.parse(fs.readFileSync(pathPackage, { encoding: 'utf8', flag: 'r' }));
    // }

    // return packageProject;
}

function logFile(pathPackage: string) {
    const file = fs.readFileSync(pathPackage, { encoding: 'utf8', flag: 'r' })
    console.log(file);
}