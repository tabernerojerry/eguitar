import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "../actions/types";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: payload
      };
    case GET_PRODUCTS_TO_SHOP:
      return { ...state, toShop: payload.items, toShopSize: payload.size };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: payload };
    case GET_BRANDS:
      return { ...state, brands: payload };
    case ADD_BRAND:
      return { ...state, addBrand: payload.success, brands: payload.brands };
    case GET_WOODS:
      return { ...state, woods: payload };
    case ADD_WOOD:
      return {
        ...state,
        addWood: payload.success,
        woods: payload.woods
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        addProduct: payload
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload
      };
    default:
      return state;
  }
};
