import { db } from '../infra/db';

const findAllLocations = async () => {
  const query = `
    SELECT * FROM location;
  `;

  return await db.many(query);
};

export const locationService = {
  findAllLocations,
};
