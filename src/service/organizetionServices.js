import { httpGET, httpPOST, httpPUT } from "./intercepter";
import { baseUrl } from "./baseUrl";

export const getOrganization = (page,limit,status,text) => {
  const url = baseUrl + "api/organizations/get-all-organizations?page="+page+"&size="+limit;
  return httpGET(url);
};

export const addOrganization = (data) => {
  const url = baseUrl + "api/organizations/create-organization";
  return httpPOST(url,data);
};

export const updateOrganization = (data) => {
  const url = baseUrl + "api/organizations/update-organization";
  return httpPUT(url,data);
};

export const getOrganizationInId = (id) => {
  const url = baseUrl + "api/organizations/get-organization?id="+id;
  return httpGET(url);
};
