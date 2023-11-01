import API_ENDPOINT from '../config/api-endpoint';

class RestaurantSource {
    static async listRestaurants() {
        const response = await fetch(API_ENDPOINT.RESTAURANTS);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default RestaurantSource;