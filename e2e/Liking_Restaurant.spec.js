const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('Tidak ada restoran yang menjadi favorit anda', '.restaurant-item-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran yang menjadi favorit anda', '.restaurant-item-not-found');
  I.amOnPage('/');
  I.seeElement('.restaurant-item-content');
  const firstRestaurant = locate('.restaurant-item-content h3').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#mainContent');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item-content');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-item-content h3');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
 
Scenario('removing one favorite restaurant', async ({ I }) => {
  I.see('Tidak ada restoran yang menjadi favorit anda', '.restaurant-item-not-found');
  I.amOnPage('/');
  I.seeElement('.restaurant-item-content');
  const firstRestaurant = locate('.restaurant-item-content h3').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#mainContent');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item-content');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-item-content h3');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item-content');
  const firstFavoriteRestaurant = locate('.restaurant-item-content h3').first();
  I.click(firstFavoriteRestaurant);
  I.seeElement('#mainContent');
  I.click('#likedButton');
  I.amOnPage('/#/favorite');
  I.see('Tidak ada restoran yang menjadi favorit anda', '.restaurant-item-not-found');
});
