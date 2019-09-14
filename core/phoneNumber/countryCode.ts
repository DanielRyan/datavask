export function removeCountryCode(phoneNumber: string) {
  // ?: Does the phone number contain country code?
  if (!phoneNumber.startsWith('+')) {
    // -> No, don't do anything with the phone number.
    return phoneNumber;
  }
  // -> Yes, it contains country code, remove it.

  // Remove the country code, it is assumed the country code is two digits
  // and the + sign, e.g. +47.
  return phoneNumber.substring(3);
}
