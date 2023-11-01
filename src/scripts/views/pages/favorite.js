import FavoriteRestaurant from '../../db-source/favorite-restaurant';
import { createRestaurantItem } from '../template-web';

const Favorite = {
    async render() {
      return `
        <div class="content">
          <h2 class="content-heading">Your Favorite Restaurant</h2>
          <div id="restaurants" class="restaurants">
  
          </div>
        </div>
      `;
    },

    async afterRender() {
      const restaurants = await FavoriteRestaurant.getAllRestaurants();
      const restaurantContainer = document.querySelector('#restaurants');
      if (restaurants.length) {
        restaurants.forEach((restaurant) => {
          restaurantContainer.innerHTML += createRestaurantItem(restaurant);
        });
      } else {
        restaurantContainer.innerHTML = `
          <div class="restaurant-item-not-found">Tidak ada restoran yang menjadi favorit anda</div>
        `;
      }
    },
  };

  export default Favorite;