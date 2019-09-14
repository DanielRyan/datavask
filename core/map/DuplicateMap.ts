import { Entry } from './Entry';
import { State } from './State';

export class DuplicateMap<T> {
  private cleanedValues = new Map<string, Entry<T>>();
  private duplicateValues = new Map<string, Entry<T>[]>();

  /**
   * Push value to the map, only unique values will be added to the list.
   * Duplicate values will be added to a separate duplicates list.
   *
   * @param originalValue The original string before any processing.
   * @param cleanedValue The string after processing is done.
   * @param info Extra data that can better identify the duplicate values.
   */
  public push(originalValue: string, cleanedValue: string, info: T) {
    const entry: Entry<T> = {
      info,
      value: {
        original: originalValue,
        cleaned: cleanedValue,
      },
    };

    const existing = this.cleanedValues.get(cleanedValue);

    // ?: Do we have an existing value?
    if (!existing) {
      // -> No, this is a new entry.
      this.cleanedValues.set(cleanedValue, entry);
      return State.NewEntry;
    }
    // E-> Yes, we already have an existing value.

    const duplicates = this.duplicateValues.get(cleanedValue);

    // ?: Do we have duplicates from earlier?
    if (duplicates) {
      // -> Yes, add it to the list with the existing duplicates.
      duplicates.push(entry);
    } else {
      // -> No, this is the first duplicate.
      // Initialize array with the already existing entry and
      // the duplicate entry. Thus we have all the duplicated values here.
      this.duplicateValues.set(cleanedValue, [existing, entry]);
    }

    return State.Duplicate;
  }

  /**
   * Get all unique values.
   */
  public get values() {
    return [...this.cleanedValues.values()];
  }

  /**
   * Get all duplicate values.
   */
  public get duplicates() {
    return [...this.duplicateValues.entries()];
  }
}
