import { clean } from '../core/phoneNumber/clean';

describe('Clean phone number', () => {
  test('should remove leading trailing spaces', () => {
    const phoneNumber = ' 11111111';

    const cleaned = clean(phoneNumber);

    expect(cleaned).toBe('11111111');
  });

  test('should remove trailing spaces', () => {
    const phoneNumber = '11111111 ';

    const cleaned = clean(phoneNumber);

    expect(cleaned).toBe('11111111');
  });

  test('should remove spaces in the middle', () => {
    const phoneNumber = '111 111 11';

    const cleaned = clean(phoneNumber);

    expect(cleaned).toBe('11111111');
  });

  test('should remove all non-numerical characters', () => {
    const phoneNumber = '(11)11-11+1.1.';

    const cleaned = clean(phoneNumber);

    expect(cleaned).toBe('11111111');
  });

  test('should have + sign if it is the first character', () => {
    const phoneNumber = '+4711111111';

    const cleaned = clean(phoneNumber);

    expect(cleaned).toBe('+4711111111');
  });
});
