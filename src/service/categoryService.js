import { baseUrl } from "./baseUrl";
import { httpDelete, httpGET, httpPOST } from "./intercepter";


export const saveCategry = (data) => {
    const url = baseUrl + "/category/save-category";
    return httpPOST(url, data);
};


export const getAllCategry = () => {
    const url = baseUrl + "/category/get-all-category";
    return httpGET(url);
};

export const deleteCategry = (id) => {
    const url = baseUrl + "/category/delete-category/"+id;
    return httpDelete(url);
};

export const getCategryByOutlet = (id) => {
    const url = baseUrl + "/category/get-category-by-outlet/"+id;
    return httpGET(url);
};