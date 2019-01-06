import axios from "axios";

import { GET_SITE_DATA, UPDATE_SITE_DATA } from "./types";

const siteApiUrl = "/api/site";

export async function getSiteData() {
  const { data } = await axios.get(`${siteApiUrl}/site_data`);

  return {
    type: GET_SITE_DATA,
    payload: data
  };
}

export async function updateSiteData(formData) {
  const { data } = await axios.post(`${siteApiUrl}/site_data`, formData);

  return {
    type: UPDATE_SITE_DATA,
    payload: data
  };
}
