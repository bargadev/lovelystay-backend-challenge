import { ulid } from 'ulid';
import { db } from './../infra/db';

const insertLanguageList = async (languages: string[], userId: string) => {
  const insertLanguagesQuery = languages.map((lang) => {
    return db.one(
      `
        INSERT INTO "language" (language_id, name) 
        VALUES ($1, $2)
        ON CONFLICT(name) DO UPDATE 
        SET name = EXCLUDED.name
        RETURNING language_id;
      `,
      [ulid(), lang],
    );
  });

  const languagesData = await Promise.all(insertLanguagesQuery);

  const languageIds = languagesData.map((result) => result.language_id);

  const insertUserLanguageQuery = languageIds.map((languageId) => {
    return db.one(
      'INSERT INTO "user_language" (user_id, language_id) VALUES ($1, $2) ' +
        'ON CONFLICT DO NOTHING ' +
        'RETURNING language_id',
      [userId, languageId],
    );
  });

  const insertUserLanguageData = await Promise.all(insertUserLanguageQuery);

  return insertUserLanguageData;
};

const findAllLanguages = async () => {
  const query = `
    SELECT * FROM "language";
  `;

  return await db.any(query);
};

export const languageService = {
  insertLanguageList,
  findAllLanguages,
};
