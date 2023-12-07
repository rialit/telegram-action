import * as fs from 'fs'
import path = require("path");

export interface PackageJson {
    name: string,
    version: string,
}

export default function(): PackageJson {
    let patchBack = '../';
    for (let index = 0; index < 10; index++) {
        console.log('index - ' + index);
        console.log(fs.readdirSync(path.join(__dirname, patchBack)));
        patchBack += '../'
    }

    const pathPackage = path.join(__dirname, '../../../../package.json');
    const packageProject: PackageJson = {
        name: '',
        version: '',
    };

    if (fs.existsSync(pathPackage)) {
        return JSON.parse(fs.readFileSync(pathPackage, { encoding: 'utf8', flag: 'r' }));
    }

    return packageProject;
}