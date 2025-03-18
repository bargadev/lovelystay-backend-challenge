import { LocationData } from 'src/model/location-data';
import { fetchGitHubUser } from './../github';
import { userService } from './../service/user-service';

const findAndCreateUserByUsername = async (username: string) => {
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

const findAllUsers = async () => {
  const users = await userService.findAllUsers();

  return users;
};

const findUsersByLocation = async (location: string) => {
  const users = await userService.findUsersByLocation(location);

  return users;
};

export const userController = {
  findAndCreateUserByUsername,
  findAllUsers,
  findUsersByLocation,
};
