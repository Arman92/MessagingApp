/* eslint-disable import/no-mutable-exports */
import { proxify, MemoryStorage } from './memoryStorage';

let SessionStorage: Storage;

if (sessionStorage) {
  SessionStorage = sessionStorage;
} else {
  const instanceSessionStorage = new MemoryStorage();

  SessionStorage = proxify(instanceSessionStorage);
}
export { SessionStorage };
