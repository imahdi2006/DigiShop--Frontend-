import apiCleint from "../utils/api-cleint";

export function checkoutAPI() {
  return apiCleint.post("/order/checkout");
}

