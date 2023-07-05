import { baseUrl } from "./baseUrl";
import { httpGET, httpPOST } from "./intercepter";


export const saveDevices = (data) => {
    const url = baseUrl + "/api/v1/custom-devices";
    return httpPOST(url, data);
};
export const getDevicesOutletId = (outlet_id) => {
    const url = baseUrl + "/api/v1/custom-devices/get-devices/"+outlet_id;
    return httpGET(url);
};