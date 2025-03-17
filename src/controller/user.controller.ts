import * as db from '../db';
import { fetchGitHubUser } from '../github';

export const findUserByUsername = async (username: string) => {
  const userData = await fetchGitHubUser(username);

  const storedUser = await db.upsertUser(userData);

  console.log('userData: ', userData);

  // console.log('storedUser: ', storedUser);
  // const user = await db.fetchUser(username);
  // if (!user) {
  //   throw new Error(`User ${username} not found`);
  // }
  // return user;
};

// export const main = async (opts: Options) => {
//   console.log('opts: ', opts);

//   if (opts.fetch) {
//     const username = opts.fetch;
//     // const userData = await github.fetchGitHubUser(username);
//     // const storedUser = await db.upsertUser(
//     //   username,
//     //   userData.name,
//     //   userData.location,
//     // );
//     // // If there is a repos_url, fetch languages
//     // if (userData.repos_url) {
//     //   const langs = await github.fetchUserLanguages(userData.repos_url);
//     //   if (langs.length) {
//     //     await db.insertLanguages(storedUser.id, langs);
//     //   }
//     // }
//     console.log(`Fetched and stored data for ${username}`);
//   }

//   // if (opts.list !== undefined) {
//   //   // If list is a string then treat it as location filter.
//   //   const location = typeof opts.list === 'string' ? opts.list : undefined;
//   //   const users = await db.fetchUsers(location);
//   //   console.log('Users in DB:');
//   //   users.forEach((user: any) => {
//   //     console.log(`- ${user.username} (${user.name}) in ${user.location}`);
//   //   });
//   // }

//   // if (opts.listLang) {
//   //   const users = await db.fetchUsersByLanguage(opts.listLang);
//   //   console.log(`Users with language ${opts.listLang}:`);
//   //   users.forEach((user: any) => {
//   //     console.log(`- ${user.username} (${user.name})`);
//   //   });
//   // }
// };
