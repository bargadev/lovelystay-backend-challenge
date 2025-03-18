import inquirer from 'inquirer';
import { locationController } from './controller/location.controller';
import { userController } from './controller/user.controller';

const mainMenuOptions = [
  { name: 'Find GitHub user', value: 'findUserByUsername' },
  { name: 'List all users', value: 'listAllUsers' },
  { name: 'List users by location', value: 'listAllLocation' },
  { name: 'List users by language', value: 'list_lang' },
  { name: 'Exit', value: 'exit' },
];

const promptOptions = async (options: any[]): Promise<string> => {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: options,
    },
  ]);

  return option;
};

const promptInput = async (msg: string): Promise<string> => {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: msg,
    },
  ]);
  return value;
};

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const main = async () => {
  try {
    let exit = false;

    while (!exit) {
      const option = await promptOptions(mainMenuOptions);

      const actions = {
        async findUserByUsername() {
          const username = await promptInput('Enter GitHub username:');
          const user =
            await userController.findAndCreateUserByUsername(username);

          console.log(`${GREEN}User Info:${RESET}`);
          console.log(`${GREEN}${JSON.stringify(user, null, 2)}${RESET}`);
        },
        async listAllUsers() {
          const users = await userController.findAllUsers();

          console.log(`${GREEN}All Users:${RESET}`);
          console.table(users);
        },
        async listAllLocation() {
          const locations = await locationController.findAllLocations();

          const locationOptions = locations.map((location) => ({
            name: location.location,
            value: location.location,
          }));

          const selectedLocation = await promptOptions([
            ...[{ name: 'null', value: null }],
            ...locationOptions,
          ]);

          const users =
            await userController.findUsersByLocation(selectedLocation);

          console.log(`${GREEN}All Users from ${selectedLocation}:${RESET}`);
          console.table(users);
        },
        async list_lang() {
          const language = await promptInput('Enter language:');
          // Implement list_lang logic here
        },
        async exit() {
          console.log('Exiting...');
          exit = true;
        },
      };

      if (actions[option]) {
        await actions[option]();
      } else {
        console.log('Invalid option selected.');
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
