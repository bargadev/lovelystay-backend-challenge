import { LocationData } from 'src/model/location-data';
import { fetchGitHubUser } from './../github';
import { userService } from './../service/user-service';

export const findAndCreateUserByUsername = async (username: string) => {
  let userData = await userService.findUserByUsername(username);

  if (!userData) {
    userData = await fetchGitHubUser(username);

    let locationData: LocationData;

    if (userData.location) {
      locationData = await userService.saveUserLocation(userData.location);
    }

    userService.createUser(userData, locationData?.location_id || null);
  }

  return userData;
};

export const findAllUsers = async () => {
  const users = await userService.findAllUsers();

  return users;
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
