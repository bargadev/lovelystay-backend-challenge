import { LocationData } from '../model/location-data';
import { conn } from './../infra/db';
import { UserData } from './../model/user-data';

import { ulid } from 'ulid';

const TABLE = '"user"';

const insertUser = async (
  userData: UserData,
  locationId: string | null,
): Promise<{ user_id: string }> => {
  const query = `
    INSERT INTO ${TABLE} (
      user_id, username, fullname, location_id,
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

  return await conn().one(query, values);
};

const findUserByUsername = async (username: string) => {
  const query = `
    SELECT * FROM ${TABLE} WHERE username = $1
  `;

  return await conn().oneOrNone(query, [username]);
};

const findAllUsers = async () => {
  const query = `
    SELECT u.user_id, u.username, u.fullname, l.location
    FROM "user" u
    LEFT JOIN location l ON u.location_id = l.location_id;
  `;

  const users = await conn().any(query);

  if (users.length === 0) {
    console.log('No users found.');
  }

  return users;
};

const saveUserLocation = async (location: string): Promise<LocationData> => {
  const query = `
    INSERT INTO "location" (location_id, location)
    VALUES ($1, $2)
    ON CONFLICT (location) DO UPDATE
    SET location_id = EXCLUDED.location_id
    RETURNING *
  `;

  return await conn().one(query, [ulid(), location]);
};

const findUsersByLocation = async (location: string) => {
  const query = `
    SELECT u.user_id, u.username, u.fullname, l.location
    FROM "user" u
    LEFT JOIN location l ON u.location_id = l.location_id
    WHERE l.location ${location === null ? 'IS NULL' : '= $1'};
  `;

  return await conn().any(query, [location]);
};

const findUsersByLanguage = async (language: string) => {
  const query = `
    SELECT u.user_id, u.username, u.fullname, l.location
    FROM "user" u
    LEFT JOIN location l ON u.location_id = l.location_id
    WHERE u.user_id IN (
      SELECT user_id
      FROM user_language
      WHERE language_id = (
        SELECT language_id
        FROM language
        WHERE name = $1
      )
    );
  `;

  return await conn().any(query, [language]);
};

export const userService = {
  createUser: insertUser,
  findUserByUsername,
  findAllUsers,
  saveUserLocation,
  findUsersByLocation,
  findUsersByLanguage,
};
