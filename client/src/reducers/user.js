import {
  USER_LOGIN,
  USER_REGISTER,
  AUTH_USER,
  USER_LOGOUT,
  ADD_TO_CART_USER,
  GET_USER_CART_ITEM,
  REMOVE_USER_CART_ITEM,
  ON_SUCCESS_BUY_USER,
  UPDATE_USER_PROFILE,
  CLEAR_UPDATE_USER_PROFILE
} from "../actions/types";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER:
      return {
        ...state,
        registerSuccess: payload
      };
    case USER_LOGIN:
      return {
        ...state,
        loginSuccess: payload
      };
    case AUTH_USER:
      return {
        ...state,
        userData: payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        logoutSuccess: payload
      };
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: payload
        }
      };
    case GET_USER_CART_ITEM:
      return {
        ...state,
        cartDetail: payload
      };
    case REMOVE_USER_CART_ITEM:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: payload.cart
        },
        cartDetail: payload.cartDetail
      };

    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: payload.success,
        userData: {
          ...state.userData,
          cart: payload.cart
        },
        cartDetail: payload.cartDetail
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updateUser: payload
      };
    case CLEAR_UPDATE_USER_PROFILE:
      return {
        ...state,
        updateUser: payload
      };
    default:
      return state;
  }
};
