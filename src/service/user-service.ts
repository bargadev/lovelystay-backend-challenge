import { LocationData } from 'src/model/location-data';
import { db } from './../infra/db';
import { UserData } from './../model/user-data';

import { ulid } from 'ulid';

const TABLE = '"github_user"';

const createUser = async (userData: UserData, locationId: string) => {
  const query = `
    INSERT INTO ${TABLE} (
      github_user_id, username, fullname, location_id,
      public_repositories, followers, following,
      profile_url, avatar_url, created_at, updated_at
    )
    VALUES (
      $1, $2, $3, $4,
      $5, $6, $7,
      $8, $9, $10, $11
    )
    ON CONFLICT (username) DO UPDATE
    SET
      username = EXCLUDED.username,
      fullname = EXCLUDED.fullname,
      location_id = EXCLUDED.location_id,
      public_repositories = EXCLUDED.public_repositories,
      followers = EXCLUDED.followers,
      following = EXCLUDED.following,
      profile_url = EXCLUDED.profile_url,
      avatar_url = EXCLUDED.avatar_url,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;

  const values = [
    ulid(),
    userData.username,
    userData.fullname,
    locationId,
    userData.public_repositories,
    userData.followers,
    userData.following,
    userData.profile_url,
    userData.avatar_url,
    userData.created_at,
    userData.updated_at,
  ];

  return await db.one(query, values);
};

const findUserByUsername = async (username: string) => {
  const query = `
    SELECT * FROM ${TABLE} WHERE username = $1
  `;

  return await db.oneOrNone(query, [username]);
};

const findAllUsers = async () => {
  const query = `
    SELECT gu.github_user_id, gu.username, gu.fullname, l.location
    FROM github_user gu
    LEFT JOIN location l ON gu.location_id = l.location_id;
  `;

  return await db.many(query);
};

// lucasbittencurt

const saveUserLocation = async (location: string): Promise<LocationData> => {
  const query = `
    INSERT INTO "location" (location_id, location)
    VALUES ($1, $2)
    ON CONFLICT (location) DO UPDATE
    SET location_id = EXCLUDED.location_id
    RETURNING *
  `;

  return await db.one(query, [ulid(), location]);
};

export const userService = {
  createUser,
  findUserByUsername,
  findAllUsers,
  saveUserLocation,
};
