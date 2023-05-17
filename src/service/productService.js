import { baseUrl } from "./baseUrl";
import { httpDelete, httpGET, httpPOST } from "./intercepter";


export const saveProduct = (data) => {
    const url = baseUrl + "/product/save-product";
    return httpPOST(url, data);
};


export const addImage = (data) => {
    const url = baseUrl + "/api/file/upload";
    return httpPOST(url, data);
};


export const getAllProduct = () => {
    const url = baseUrl + "/product/get-all-product";
    return httpGET(url);
};

export const getCategryViceProduct = (id) => {
    const url = baseUrl + "/product/get-all-product-by-category/"+id;
    return httpGET(url);
};
export const getProductBuId = (id) => {
    const url = baseUrl + "/product/get-product-by-id/"+id;
    return httpGET(url);
};

export const deleteCategry = (id) => {
    const url = baseUrl + "/category/delete-category/"+id;
    return httpDelete(url);
};