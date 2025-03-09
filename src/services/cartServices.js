import apiCleint from "../utils/api-cleint";

// add to cart
export function addToCartAPI(id, quantity) {
  return apiCleint.post(`/cart/${id}`, { quantity });
}

export function getCartAPI() {
  return apiCleint.get("/cart");
}

export function removeFromCartAPI(id) {
  return apiCleint.patch(`/cart/remove/${id}`);
} 
export function increaseProductAPI(id) {
  return apiCleint.patch(`/cart/increase/${id}`);
} 
export function decreaseProductAPI(id) {
  return apiCleint.patch(`/cart/decrease/${id}`);
} 

