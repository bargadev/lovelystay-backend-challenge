import { userController } from '../src/controller/user-controller';
import { githubService } from '../src/service/github-service';
import { languageService } from '../src/service/language-service';
import { userService } from '../src/service/user-service';

jest.mock('./../src/service/user-service');
jest.mock('./../src/service/github-service');
jest.mock('./../src/service/language-service');

describe('userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAndCreateUserByUsername', () => {
    const dummyUsername = 'testuser';
    const dummyGitHubUser = {
      username: dummyUsername,
      location: 'Test Location',
      repos_url: 'https://api.github.com/users/testuser/repos',
    };
    const dummyLocationData = {
      location_id: 123,
    };
    const dummyStoredUser = {
      user_id: 456,
    };

    it('should return existing user if found', async () => {
      (userService.findUserByUsername as jest.Mock).mockResolvedValue(
        dummyGitHubUser,
      );

      const result =
        await userController.findAndCreateUserByUsername(dummyUsername);

      expect(userService.findUserByUsername).toHaveBeenCalledWith(
        dummyUsername,
      );
      expect(result).toEqual(dummyGitHubUser);
      expect(githubService.fetchGitHubUser).not.toHaveBeenCalled();
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('should fetch, create user, save location, and insert languages if user not found', async () => {
      (userService.findUserByUsername as jest.Mock).mockResolvedValue(null);
      (githubService.fetchGitHubUser as jest.Mock).mockResolvedValue(
        dummyGitHubUser,
      );
      (userService.saveUserLocation as jest.Mock).mockResolvedValue(
        dummyLocationData,
      );
      (userService.createUser as jest.Mock).mockResolvedValue(dummyStoredUser);
      (githubService.fetchUserLanguages as jest.Mock).mockResolvedValue([
        'JavaScript',
        'TypeScript',
      ]);
      (languageService.insertLanguageList as jest.Mock).mockResolvedValue(null);

      const result =
        await userController.findAndCreateUserByUsername(dummyUsername);

      expect(userService.findUserByUsername).toHaveBeenCalledWith(
        dummyUsername,
      );

      expect(userService.saveUserLocation).toHaveBeenCalledWith(
        dummyGitHubUser.location,
      );

      expect(userService.createUser).toHaveBeenCalledWith(
        dummyGitHubUser,
        dummyLocationData.location_id,
      );

      expect(result).toEqual(dummyGitHubUser);
    });

    it('should handle absence of location data', async () => {
      const userWithoutLocation = { ...dummyGitHubUser, location: null };
      (userService.findUserByUsername as jest.Mock).mockResolvedValue(null);
      (githubService.fetchGitHubUser as jest.Mock).mockResolvedValue(
        userWithoutLocation,
      );
      (userService.createUser as jest.Mock).mockResolvedValue(dummyStoredUser);
      (githubService.fetchUserLanguages as jest.Mock).mockResolvedValue([]);

      const result =
        await userController.findAndCreateUserByUsername(dummyUsername);

      expect(userService.saveUserLocation).not.toHaveBeenCalled();
      expect(userService.createUser).toHaveBeenCalledWith(
        userWithoutLocation,
        null,
      );
      expect(languageService.insertLanguageList).not.toHaveBeenCalled();
      expect(result).toEqual(userWithoutLocation);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const dummyUsers = [{ user_id: 1 }, { user_id: 2 }];
      (userService.findAllUsers as jest.Mock).mockResolvedValue(dummyUsers);

      const result = await userController.findAllUsers();

      expect(userService.findAllUsers).toHaveBeenCalled();
      expect(result).toEqual(dummyUsers);
    });
  });

  describe('findUsersByLocation', () => {
    it('should return users for a given location', async () => {
      const dummyLocation = 'Test Location';
      const dummyUsers = [{ user_id: 1, location: dummyLocation }];
      (userService.findUsersByLocation as jest.Mock).mockResolvedValue(
        dummyUsers,
      );

      const result = await userController.findUsersByLocation(dummyLocation);

      expect(userService.findUsersByLocation).toHaveBeenCalledWith(
        dummyLocation,
      );
      expect(result).toEqual(dummyUsers);
    });
  });

  describe('findUsersByLanguage', () => {
    it('should return users for a given language', async () => {
      const dummyLanguage = 'TypeScript';
      const dummyUsers = [{ user_id: 1, languages: [dummyLanguage] }];
      (userService.findUsersByLanguage as jest.Mock).mockResolvedValue(
        dummyUsers,
      );

      const result = await userController.findUsersByLanguage(dummyLanguage);

      expect(userService.findUsersByLanguage).toHaveBeenCalledWith(
        dummyLanguage,
      );
      expect(result).toEqual(dummyUsers);
    });
  });
});
