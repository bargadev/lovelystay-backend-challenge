import { locationController } from './../src/controller/location-controller';
import { locationService } from './../src/service/location-service';

jest.mock('./../src/service/location-service');

describe('locationController', () => {
  describe('findAllLocations', () => {
    it('should call locationService.findAllLocations and return the result', async () => {
      const mockLocations = ['New York', 'Los Angeles'];
      (locationService.findAllLocations as jest.Mock).mockResolvedValue(
        mockLocations,
      );

      const result = await locationController.findAllLocations();

      expect(locationService.findAllLocations).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLocations);
    });

    it('should return an empty array if no locations are found', async () => {
      (locationService.findAllLocations as jest.Mock).mockResolvedValue([]);

      const result = await locationController.findAllLocations();

      expect(locationService.findAllLocations).toHaveBeenCalledTimes(2);
      expect(result).toEqual([]);
    });

    it('should throw an error if findAllLocations fails', async () => {
      (locationService.findAllLocations as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch locations'),
      );

      await expect(locationController.findAllLocations()).rejects.toThrow(
        'Failed to fetch locations',
      );
    });
  });
});
