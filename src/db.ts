import * as dotenv from 'dotenv';
import * as pgPromise from 'pg-promise';
import { ulid } from 'ulid';
import { UserData } from './model/user-data';

dotenv.config({ path: '.env' });

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL);

// Inserts or updates a GitHub user safely using parameterized queries.
export const upsertUser = async (userData: UserData) => {
  const query = `
    INSERT INTO "user" (
      user_id, username, fullname, location,
      public_repositories, followers, following,
      profile_url, avatar_url, created_at, updated_at
    )
    VALUES (
      $1, $2, $3, $4,
      $5, $6, $7,
      $8, $9, $10, $11
    )
    ON CONFLICT (user_id) DO UPDATE
    SET
      username = EXCLUDED.username,
      fullname = EXCLUDED.fullname,
      location = EXCLUDED.location,
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
    userData.location,
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

// // Inserts programming languages for a given user.
// export const insertLanguages = async (userId: number, languages: string[]) => {
//   const queries = languages.map((lang) => {
//     return db.none(
//       'INSERT INTO languages (user_id, language) VALUES ($1, $2)',
//       [userId, lang],
//     );
//   });
//   return await Promise.all(queries);
// };

// // Fetch all users or filter by location if provided.
// export const fetchUsers = async (location?: string) => {
//   if (location) {
//     return await db.any('SELECT * FROM github_users WHERE location = $1', [
//       location,
//     ]);
//   }
//   return await db.any('SELECT * FROM github_users');
// };

// // Optionally, join with languages table to filter by programming language.
// export const fetchUsersByLanguage = async (language: string) => {
//   const query = `
//     SELECT u.*
//     FROM github_users u
//     JOIN languages l ON u.id = l.user_id
//     WHERE l.language = $1
//   `;
//   return await db.any(query, [language]);
// };
