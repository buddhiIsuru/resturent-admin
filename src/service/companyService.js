import { httpGET, httpPOST } from "./intercepter";
import { baseUrl } from './baseUrl';

export const getCompany = (id) => {
  const url = baseUrl + "/api/v1/company/get-company";
  return httpGET(url);
};
