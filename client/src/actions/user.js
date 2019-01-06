import axios from "axios";

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
} from "./types";

const userApiUrl = "/api/users";
const productApiUrl = "/api/products";

export async function userRegister(formData) {
  const { data } = await axios.post(`${userApiUrl}/register`, formData);

  return {
    type: USER_REGISTER,
    payload: data
  };
}

export async function userLogin(formData) {
  const { data } = await axios.post(`${userApiUrl}/login`, formData);

  return {
    type: USER_LOGIN,
    payload: data
  };
}

export async function authUser() {
  const { data } = await axios.get(`${userApiUrl}/auth`);

  return {
    type: AUTH_USER,
    payload: data
  };
}

export async function logoutUser() {
  const { data } = await axios.get(`${userApiUrl}/logout`);

  return {
    type: USER_LOGOUT,
    payload: data
  };
}

// Add To Cart
export async function addToCart(id) {
  const { data } = await axios.post(`${userApiUrl}/addToCart?productId=${id}`);

  return {
    type: ADD_TO_CART_USER,
    payload: data
  };
}

// Get User Cart Items
export async function getCartItems(cartItems, userCart) {
  let { data } = await axios.get(`${productApiUrl}?id=${cartItems}&type=array`);

  userCart.forEach(item => {
    data.forEach((dataItem, index) => {
      if (item.id === dataItem._id) {
        data[index].quantity = item.quantity;
      }
    });
  });

  return {
    type: GET_USER_CART_ITEM,
    payload: data
  };
}

// remove cart item
export async function removeCartItem(id) {
  const { data } = await axios.get(`${userApiUrl}/removeFromCart?_id=${id}`);

  data.cart.forEach(item =>
    data.cartDetail.forEach((detailItem, index) => {
      if (item.id === detailItem._id) {
        data.cartDetail[index].quantity = item.quantity;
      }
    })
  );

  return {
    type: REMOVE_USER_CART_ITEM,
    payload: data
  };
}

// success buy
export async function onSuccessBuy(buyData) {
  const { data } = await axios.post(`${userApiUrl}/successBuy`, buyData);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: data
  };
}

// Update User Profile Data
export async function updateProfile(formData) {
  const { data } = await axios.post(`${userApiUrl}/update_profile`, formData);

  return {
    type: UPDATE_USER_PROFILE,
    payload: data
  };
}

export function clearUpdateProfile() {
  return {
    type: CLEAR_UPDATE_USER_PROFILE,
    payload: ""
  };
}
