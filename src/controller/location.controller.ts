import { locationService } from './../service/location-service';

const findAllLocations = async () => {
  const users = await locationService.findAllLocations();

  return users;
};

export const locationController = {
  findAllLocations,
};
