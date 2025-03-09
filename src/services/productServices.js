import apiCleint from "../utils/api-cleint";

export function getSuggestionAPI(search) {
  return apiCleint.get(`/products/suggestions?search=${search}`);
}