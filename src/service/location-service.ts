import { db } from '../infra/db';

const findAllLocations = async () => {
  const query = `
    SELECT * FROM location;
  `;

  return await db.any(query);
};

export const locationService = {
  findAllLocations,
};
