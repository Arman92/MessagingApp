/* eslint-disable import/no-mutable-exports */
import { proxify, MemoryStorage } from './memoryStorage';

let LocalStorage: Storage;
try {
  LocalStorage = localStorage;
} catch (err) {
  const instanceLocalStorage = new MemoryStorage();

  LocalStorage = proxify(instanceLocalStorage);
}
export { LocalStorage };
