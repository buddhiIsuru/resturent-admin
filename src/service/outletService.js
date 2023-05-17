import { baseUrl } from "./baseUrl";
import { httpGET, httpPOST } from "./intercepter";


export const saveOutlet = (data) => {
    const url = baseUrl + "/outlet/save-outlet";
    return httpPOST(url, data);
};


export const getAllOutlet = () => {
    const url = baseUrl + "/outlet/get-all-outlet";
    return httpGET(url);
};