import { removeCountryCode } from '../core/phoneNumber/countryCode';

describe('Country code', () => {
  test('should remove coutry code', () => {
    const phoneNumber = '+4711111111';

    const cleanedPhoneNumber = removeCountryCode(phoneNumber);

    expect(cleanedPhoneNumber).toBe('11111111');
  });

  test('should return original input if country code is not present', () => {
    const phoneNumber = '11111111';

    const cleanedPhoneNumber = removeCountryCode(phoneNumber);

    expect(cleanedPhoneNumber).toBe(phoneNumber);
  });

  test('should return original input if + sign is not in the beginning', () => {
    const phoneNumber = '1111+1111';

    const cleanedPhoneNumber = removeCountryCode(phoneNumber);

    expect(cleanedPhoneNumber).toBe(phoneNumber);
  });
});
