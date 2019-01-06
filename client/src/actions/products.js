import axios from "axios";

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
} from "./types";

const productsApiUrl = "/api/products";

export async function getProductsBySell() {
  const { data } = await axios.get(
    `${productsApiUrl}/items?sortBy=sold&order=desc&limit=4`
  );

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: data
  };
}

export async function getProductsByArrival() {
  const { data } = await axios.get(
    `${productsApiUrl}/items?sortBy=createdAt&order=desc&limit=4`
  );

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: data
  };
}

export async function getProductsToShop(
  limit,
  skip,
  filters = [],
  previousState = []
) {
  const queryData = { limit, skip, filters };

  const { data } = await axios.post(`${productsApiUrl}/shop`, queryData);

  const items = data.items ? data.items : [];
  const newState = [...previousState, ...items];

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: {
      size: data.size,
      items: newState
    }
  };
}

// Add Product
export async function addProduct(formData) {
  const { data } = await axios.post(`${productsApiUrl}/`, formData);

  return {
    type: ADD_PRODUCT,
    payload: data
  };
}

// reset product state to empty object
export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ""
  };
}

export async function getProductDetail(id) {
  const { data } = await axios.get(`${productsApiUrl}/?id=${id}&type=single`);
  if (!data) {
    console.log("no product to display");
  }
  return {
    type: GET_PRODUCT_DETAIL,
    payload: data[0]
  };
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ""
  };
}

/**
 * Products Categories
 */
export async function getBrands() {
  const { data } = await axios.get(`${productsApiUrl}/brands`);

  return {
    type: GET_BRANDS,
    payload: data
  };
}

// Add Product Brand
export async function addBrand(formData, existingBrands) {
  const { data } = await axios.post(`${productsApiUrl}/brand`, formData);

  return {
    type: ADD_BRAND,
    payload: {
      success: data.success,
      brands: [...existingBrands, data.brand]
    }
  };
}

export async function getWoods() {
  const { data } = await axios.get(`${productsApiUrl}/woods`);

  return {
    type: GET_WOODS,
    payload: data
  };
}

// Add Product Wood
export async function addWood(formData, existingWoods) {
  const { data } = await axios.post(`${productsApiUrl}/wood`, formData);

  return {
    type: ADD_WOOD,
    payload: {
      success: data.success,
      woods: [...existingWoods, data.wood]
    }
  };
}
