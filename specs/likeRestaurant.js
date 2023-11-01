import FavoriteRestaurant from '../src/scripts/db-source/favorite-restaurant';
import * as TestFactories from './testFactories';

describe('Menyukai Sebuah Restoran', () => {

  const tambahKontainerButtonSuka = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    tambahKontainerButtonSuka();
  });

  it('Seharusnya menampilkan tombol suka ketika restoran belum pernah disukai sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="suka restoran ini"]')).toBeTruthy();
  });

  it('Seharusnya tidak menampilkan tombol batalkan suka ketika restoran belum pernah disukai sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="batalkan suka restoran ini"]')).toBeFalsy();
  });

  it('Harus bisa menyukai restoran', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restoran = await FavoriteRestaurant.getRestaurant(1);

    expect(restoran).toEqual({ id: 1 });

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('Tidak boleh menambahkan restoran lagi ketika restoran sudah disukai', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurant.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('Tidak boleh menambahkan restoran ketika restoran tidak memiliki ID', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
  });
});
