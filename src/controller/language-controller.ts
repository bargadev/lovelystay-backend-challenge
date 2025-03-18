import { languageService } from '../service/language-service';

const findAllLanguages = async () => {
  const languages = await languageService.findAllLanguages();

  return languages;
};

export const languageController = {
  findAllLanguages,
};
