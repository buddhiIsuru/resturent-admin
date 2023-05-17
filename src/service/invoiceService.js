import { baseUrl } from "./baseUrl";
import { httpGET } from "./intercepter";

export const getInvoiceByOutlet = (id) => {
    const url = baseUrl + "/invoice/get-invoice-outlet/"+id;
    return httpGET(url);
};

export const getInvoiceData = (id) => {
    const url = baseUrl + "/invoice/get-outlet-invoice-data/"+id;
    return httpGET(url);
};
