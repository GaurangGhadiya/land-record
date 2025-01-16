import Cookies from "js-cookie";
import { decryptData, encryptDataPost } from "./encryptDecrypt";

// Save the token in localStorage
export const saveToken = (data) => {
  Cookies.set("land_userName", encryptDataPost(JSON.stringify(data?.name))); // expires in 1 days
  Cookies.set("land_district", encryptDataPost(JSON.stringify(data?.districtID || ""))); // expires in 1 days
  Cookies.set("land_tehsil", encryptDataPost(JSON.stringify(data?.tehsilID || ""))); // expires in 1 days
  Cookies.set("land_patwar", encryptDataPost(JSON.stringify(data?.patwarCircleID || ""))); // expires in 1 days
  Cookies.set("land_village", encryptDataPost(JSON.stringify(data?.village || "")));
  Cookies.set("land_divisionCode", encryptDataPost(data?.districtID));
  Cookies.set("land_divisionName", encryptDataPost(data?.divisionName));
  Cookies.set("land_subDivisionCode", encryptDataPost(JSON.stringify(data?.subDivisionID)));
  Cookies.set("land_subDivisionName", encryptDataPost(JSON.stringify(data?.subdivisionName)));
  Cookies.set("land_name", encryptDataPost(JSON.stringify(data?.name)));
  Cookies.set("land_roles", encryptDataPost(JSON.stringify(data?.roles)));
  // Cookies.set('authToken', data?.token, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
  Cookies.set('land_authToken', data?.token || "abcd", { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
  Cookies.set('land_ulb', data?.userid, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
};

// Retrieve the token from localStorage
export const getToken = () => {
  return Cookies.get("land_authToken");
};

export const getdistrictCode = () => {
  return decryptData(Cookies.get("land_district"));
};
export const gettehsilCode = () => {
  return decryptData(Cookies.get("land_tehsil"));
};
export const getPatwarCode = () => {
  return decryptData(Cookies.get("land_patwar"));
};
export const getVillageCode= () => {
  return decryptData(Cookies.get("land_village"));
};
export const getUserName = () => {
  return decryptData(Cookies.get("land_userName"));
};
export const getName = () => {
  return decryptData(Cookies.get("land_name"));
};

export const getRoles = () => {
  return decryptData(Cookies.get("land_roles"));
};
export const getBlock = () => {
  return Cookies.get("land_block");
};
export const getDistrict = () => {
  return Cookies.get("land_district");
};
export const getPanchayat = () => {
  return Cookies.get("land_panchayat");
};
export const getUlb = () => {
  return Cookies.get("land_id");
};

// Remove the token from localStorage
export const removeToken = () => {
  // Cookies.set('userName', null, { expires: 1 }); // expires in 1 days
  // Cookies.set('authToken', null, { expires: 1 });
  // Cookies.set('ulb', null, { expires: 1 }); // expires in 1 days

  Cookies.remove("land_authToken");
  Cookies.remove("land_userName");
  Cookies.remove("land_name");
  Cookies.remove("land_roles");
  Cookies.remove("land_block");
  Cookies.remove("land_district");
  Cookies.remove("land_panchayat");
  Cookies.remove("land_village");

  // Cookies.remove('authToken', { path: '' })
  // Cookies.remove('userName', { path: '' })
  // Cookies.remove('ulb', { path: '' })

  const cookies = Cookies.get(); // Get all cookies

  for (const cookie in cookies) {
    if (cookies.hasOwnProperty(cookie)) {
      Cookies.remove(cookie); // Remove each cookie
    }
  }
};
