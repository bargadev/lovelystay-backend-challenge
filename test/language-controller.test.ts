import { languageController } from './../src/controller/language-controller';
import { languageService } from './../src/service/language-service';

jest.mock('./../src/service/language-service');

describe('languageController', () => {
  describe('findAllLanguages', () => {
    it('should call languageService.findAllLanguages and return the result', async () => {
      const mockLanguages = ['JavaScript', 'TypeScript'];
      (languageService.findAllLanguages as jest.Mock).mockResolvedValue(
        mockLanguages,
      );

      const result = await languageController.findAllLanguages();

      expect(languageService.findAllLanguages).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLanguages);
    });

    it('should return an empty array if no languages are found', async () => {
      (languageService.findAllLanguages as jest.Mock).mockResolvedValue([]);

      const result = await languageController.findAllLanguages();

      expect(languageService.findAllLanguages).toHaveBeenCalledTimes(2);
      expect(result).toEqual([]);
    });

    it('should throw an error if findAllLanguages fails', async () => {
      (languageService.findAllLanguages as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch languages'),
      );

      await expect(languageController.findAllLanguages()).rejects.toThrow(
        'Failed to fetch languages',
      );
    });
  });
});
