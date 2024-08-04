import { exec } from 'child_process';
import fs from 'fs';

const resourceName = process.argv[2];

if (!resourceName) {
  console.error('Please provide a resource name.');
  process.exit(1);
}

const checkF = fs.existsSync(`src/${resourceName}`);
if (checkF) {
  console.error(`Resource ${resourceName} already exists.`);
  process.exit(1);
} else {
  const command = `nest g co ${resourceName} && nest g mo ${resourceName} && nest g s ${resourceName}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}
