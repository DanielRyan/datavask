export function clean(phoneNumber: string): string {
  const cleaned = phoneNumber
    // Remove leading and trailing spaces.
    .trim()
    // Remove all non-digits (\D).
    .replace(/\D/g, '');

  // ?: Did the original phone number have country code?
  if (phoneNumber.startsWith('+')) {
    // -> Yes, add the + sign back as it would be removed when
    // removing all non-digits.
    return `+${cleaned}`;
  }

  return cleaned;
}
