import UrlParser from '../../routes/url';
import RestaurantSource from '../../db-source/restaurant-source';
import { createRestaurantDetail } from '../template-web';
import LikeButton from '../../utils/like-button';

const Detail = {
    async render() {
      return `
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
      `;
    },

    async afterRender() {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const { restaurant } = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = createRestaurantDetail(restaurant);

      LikeButton.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });
    },
  };

  export default Detail;