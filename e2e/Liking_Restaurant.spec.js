const assert = require('assert');

    Feature('Liking Restaurant');

    Before(({ I }) => {
    I.amOnPage('#/Favorite');
    });

    Scenario('liking one restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.waitForElement('.restaurant-item-content h3', 10);

    const firstRestaurant = locate('.restaurant-item-content h3').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item');

    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item-content');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
    });

    Scenario('unliking one restaurant', async ({I}) => {
    I.amOnPage('/');

    I.waitForElement('.restaurant-item-content h3');

    const firstRestaurant = locate('.restaurant-item-content h3').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item');

    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item-content');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.waitForElement('.restaurant-item-content h3');
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');

    I.dontSeeElement('.restaurant-item-content h3');
    });
