import RestaurantSource from '../../db-source/restaurant-source';
import { createRestaurantItem } from '../template-web';

const Restaurants = {
    async render() {
      return `
        <div class="content">
          <h2 class="content-heading">List of Restaurants</h2>
          <div id="restaurants" class="restaurants">
  
          </div>
        </div>
      `;
    },

    async afterRender() {
      const restaurants = await RestaurantSource.listRestaurants();
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItem(restaurant);
      });
    },
  };

  export default Restaurants;