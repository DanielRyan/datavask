import { DuplicateMap } from '../core/map/DuplicateMap';
import { State } from '../core/map/State';

describe('Duplicate map', () => {
  test('should push new value', () => {
    const map = new DuplicateMap<{}>();
    const original = 'asd';
    const cleaned = 'asd123';

    // Push new value.
    const result = map.push(original, cleaned, {});

    expect(result).toBe(State.NewEntry);

    // Should have one unique value.
    expect(map.values.length).toBe(1);

    expect(map.values[0]).toBeDefined();

    // Ensure the values are set.
    expect(map.values[0].value.cleaned).toBe(cleaned);
    expect(map.values[0].value.original).toBe(original);
  });

  test('should push new value with info data', () => {
    const info = {
      name: 'John Smith',
      age: 99,
    };
    const map = new DuplicateMap<typeof info>();
    const original = 'asd';
    const cleaned = 'asd123';

    // Push new value.
    const result = map.push(original, cleaned, info);

    expect(result).toBe(State.NewEntry);

    // Should have one unique value.
    expect(map.values.length).toBe(1);

    expect(map.values[0].info).toBeDefined();

    // Ensure the info values are set.
    expect(map.values[0].info.name).toBe(info.name);
    expect(map.values[0].info.age).toBe(info.age);
  });

  test('should push duplicate value', () => {
    const map = new DuplicateMap<{}>();
    const original = 'asd';
    const originalDuplicate = 'Asd';
    const cleaned = 'asd123';

    // Push new value.
    map.push(original, cleaned, {});

    // Push duplicate value.
    const duplicateEntryResult = map.push(originalDuplicate, cleaned, {});

    expect(duplicateEntryResult).toBe(State.Duplicate);

    // Should only have one unique value.
    expect(map.values.length).toBe(1);

    // Should have a value in the duplicates list.
    expect(map.duplicates.length).toBe(1);
    expect(map.duplicates[0]).toBeDefined();

    // The duplicate entry.
    const [key, value] = map.duplicates[0];

    expect(key).toBe(cleaned);

    // The duplicate entry should have an array with both the original
    // and the duplicate value.
    expect(value.length).toBe(2);
    expect(value[0]).toBeDefined();
    expect(value[1]).toBeDefined();

    // Ensure the original entry values are set.
    expect(value[0].value.original).toBe(original);
    expect(value[0].value.cleaned).toBe(cleaned);

    // Ensure the duplicate entry values are set.
    expect(value[1].value.original).toBe(originalDuplicate);
    expect(value[1].value.cleaned).toBe(cleaned);
  });

  test('should push duplicate value with info data', () => {
    const info = {
      name: 'John Smith',
      age: 99,
    };
    const infoDuplicate = {
      name: 'John "Jimmy" Smith',
      age: 99,
    };
    const map = new DuplicateMap<typeof info>();
    const original = 'asd';
    const cleaned = 'asd123';

    // Push new value.
    map.push(original, cleaned, info);

    // Push duplicate value.
    map.push(original, cleaned, infoDuplicate);

    // The duplicate entry.
    const [key, value] = map.duplicates[0];

    expect(key).toBe(cleaned);

    // There should be two duplicate values.
    // The original entry and the first duplicate..
    expect(value.length).toBe(2);

    // Ensure the original entry info values are set.
    expect(value[0].info.name).toBe(info.name);
    expect(value[0].info.age).toBe(info.age);

    // Ensure the duplicate entry info values are set.
    expect(value[1].info.name).toBe(infoDuplicate.name);
    expect(value[1].info.age).toBe(infoDuplicate.age);
  });

  test('should push multiple duplicate values', () => {
    const map = new DuplicateMap<{}>();
    const original = 'asd';
    const cleaned = 'asd123';

    // Push new value.
    map.push(original, cleaned, {});

    // Push duplicate value.
    map.push(original, cleaned, {});

    // Push another duplicate value.
    const duplicateEntryResult = map.push(original, cleaned, {});

    expect(duplicateEntryResult).toBe(State.Duplicate);

    // Should only have one unique value.
    expect(map.values.length).toBe(1);

    // Should have one value in the duplicates list.
    expect(map.duplicates.length).toBe(1);
    expect(map.duplicates[0]).toBeDefined();

    // The duplicate entry.
    const [key, value] = map.duplicates[0];

    expect(key).toBe(cleaned);

    // There should be three duplicate values.
    // The original entry, the first duplicate and the second duplicate.
    expect(value.length).toBe(3);
    expect(value[0]).toBeDefined();
    expect(value[1]).toBeDefined();
    expect(value[2]).toBeDefined();
  });
});
