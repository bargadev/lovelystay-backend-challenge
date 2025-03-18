import { githubService } from '../service/github-service';
import { LocationData } from './../model/location-data';
import { languageService } from './../service/language-service';
import { userService } from './../service/user-service';

const findAndCreateUserByUsername = async (username: string) => {
  let userData = await userService.findUserByUsername(username);

  if (!userData) {
    userData = await githubService.fetchGitHubUser(username);

    let locationData: LocationData;

    if (userData.location) {
      locationData = await userService.saveUserLocation(userData.location);
    }

    const storedUser = await userService.createUser(
      userData,
      locationData?.location_id || null,
    );

    // setImmediate(async () => {
    if (userData.repos_url) {
      const langs = await githubService.fetchUserLanguages(userData.repos_url);

      if (langs.length) {
        console.log(langs);
        await languageService.insertLanguageList(langs, storedUser.user_id);
      }
    }
    // });
  }

  return userData;
};

const findAllUsers = async () => {
  const users = await userService.findAllUsers();

  return users;
};

const findUsersByLocation = async (location: string) => {
  const users = await userService.findUsersByLocation(location);

  return users;
};

const findUsersByLanguage = async (language: string) => {
  const users = await userService.findUsersByLanguage(language);

  return users;
};

export const userController = {
  findAndCreateUserByUsername,
  findAllUsers,
  findUsersByLocation,
  findUsersByLanguage,
};
