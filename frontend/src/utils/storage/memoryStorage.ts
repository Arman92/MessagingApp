/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
const valuesMap = new Map<string, string>();

export class MemoryStorage implements Storage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;

  [index: number]: string;

  getItem(key: string): string | null {
    const stringKey = key;
    if (valuesMap.has(key)) {
      return valuesMap.get(stringKey);
    }

    return null;
  }

  setItem(key: string, val: string): Map<string, string> {
    return valuesMap.set(key, val);
  }

  removeItem(key: string): boolean {
    return valuesMap.delete(key);
  }

  clear(): void {
    valuesMap.clear();
  }

  key(i: number): string {
    if (arguments.length === 0) {
      throw new TypeError('Failed to execute "key" on "Storage": 1 argument required, but only 0 present.');
    }

    return Array.from(valuesMap.keys())[i];
  }

  get length(): number {
    return valuesMap.size;
  }
}

export function proxify(instance: MemoryStorage): Storage {
  return new Proxy(instance, {
    set(_obj, prop: string, value) {
      if (Object.prototype.hasOwnProperty.call(MemoryStorage, prop)) {
        instance[prop] = value;
      } else {
        instance.setItem(prop, value);
      }
      return true;
    },
    get(_target, name: string) {
      if (Object.prototype.hasOwnProperty.call(MemoryStorage, name)) {
        return instance[name];
      }
      if (valuesMap.has(name)) {
        return instance.getItem(name);
      }
      return null;
    },
  });
}
