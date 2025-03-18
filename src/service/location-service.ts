import { conn } from './../infra/db';

const findAllLocations = async () => {
  const query = `
    SELECT * FROM location;
  `;

  return await conn().any(query);
};

export const locationService = {
  findAllLocations,
};
