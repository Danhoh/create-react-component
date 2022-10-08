// node libs
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2); 

const rootPath = path.resolve('.');


let componentName = args[0];
let componentPath = args[1] ? path.join(rootPath, args[1], componentName) : path.join(rootPath, 'components', componentName);


const createFile = (path, content='Hello content!') => {
  fs.writeFile(path, content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 
}


if (!fs.existsSync(componentPath)){
  fs.mkdirSync(componentPath, {recursive: true});
  createFile(path.join(componentPath, `${componentName}.tsx`), 
  `import styles from './${componentName}.module.css';
import { ${componentName}Props } from './${componentName}.props';

export const ${componentName} = ({}: ${componentName}Props) => {
  return <div>${componentName}</div>
}
  `
  );

  createFile(path.join(componentPath, `${componentName}.props.ts`), 
  `import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ${componentName}Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
  
}`
  );

  createFile(path.join(componentPath, `${componentName}.module.css`), `.${componentName.toLowerCase()} {

}`);
}

// console.log('Component path is', componentPath);

 




