import inquirer from 'inquirer';
import { findUserByUsername } from './controller/user.controller';

const promptOptions = async (): Promise<string> => {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: [
        { name: 'Fetch GitHub user', value: 'fetch' },
        { name: 'List all users', value: 'list' },
        { name: 'List users by location', value: 'list_location' },
        { name: 'List users by language', value: 'list_lang' },
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

(async () => {
  try {
    const option = await promptOptions();

    const actions = {
      async fetch() {
        const username = await promptInput('Enter GitHub username:');
        await findUserByUsername(username);
      },
      async list() {
        // await main({ list: false });
      },
      async list_location() {
        const location = await promptInput('Enter location:');
        // await main({ list: location });
      },
      async list_lang() {
        const language = await promptInput('Enter language:');
        // await main({ listLang: language });
      },
    };

    // Execute the corresponding function if the option exists
    if (actions[option]) {
      await actions[option]();
    } else {
      console.log('Invalid option selected.');
    }
  } catch (err) {
    console.error(err);
  }
})();
