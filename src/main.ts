import inquirer from 'inquirer';
import {
  findAllUsers,
  findAndCreateUserByUsername,
} from './controller/user.controller';

const promptOptions = async (): Promise<string> => {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: [
        { name: 'Find GitHub user', value: 'findUserByUsername' },
        { name: 'List all users', value: 'listAllUsers' },
        { name: 'List users by location', value: 'list_location' },
        { name: 'List users by language', value: 'list_lang' },
        { name: 'Exit', value: 'exit' },
      ],
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
      const option = await promptOptions();

      const actions = {
        async findUserByUsername() {
          const username = await promptInput('Enter GitHub username:');
          const user = await findAndCreateUserByUsername(username);

          console.log(`${GREEN}User Info:${RESET}`);
          console.log(`${GREEN}${JSON.stringify(user, null, 2)}${RESET}`);
        },
        async listAllUsers() {
          const users = await findAllUsers();

          console.log(`${GREEN}All Users:${RESET}`);
          console.table(users);
        },
        async list_location() {
          const location = await promptInput('Enter location:');
          // Implement list_location logic here
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
