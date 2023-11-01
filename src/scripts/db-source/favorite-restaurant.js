import { openDB } from 'idb';
import CONFIG from '../config/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return null;
    }
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    return store.get(id);
  },
  async getAllRestaurants() {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    return store.getAll();
  },
  async putRestaurant(restaurant) {
    if (!restaurant || !restaurant.id) {
      return null;
    }
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    await store.put(restaurant);
    return tx.complete;
  },
  async deleteRestaurant(id) {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    await store.delete(id);
    return tx.complete;
  },
};

export default FavoriteRestaurantIdb;