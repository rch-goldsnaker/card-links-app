const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environments.ts` file path
  const targetPath = './src/environments/environments.ts';
  // Load node modules
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  supabaseUrl: '${process.env["SUPABASE_URL"]}',
  supabaseKey: '${process.env["SUPABASE_KEY"]}',
  appVersion: '${appVersion}',
  production: true,
};
`;
  console.log(
      'The file `environment.ts` will be written with the following content: \n'
  );
  writeFile(targetPath, envConfigFile, (err:any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
