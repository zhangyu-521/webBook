import request from ".";

export const login = (data: any) => request('/api/User/login', "POST", data);
export const signUp = (data: any) => request('/api/User/signUp', "POST", data);

export const BookInfoByName = (data: any) => request(`/api/User/BookInfoByName?name=${data}`, "POST");
export const BookInfoByType = (data: any) => request(`/api/User/BookInfoByType?type=${data}`, "POST");
export const BookInfos = () => request('/api/User/BookInfos', "GET", {}, false);
export const addBasket = (data: any) => request(`/api/User/addBasket?number=${data}`, "POST");
export const Notices = () => request('/api/User/Notices', "GET", {},false);
export const getOrderByAcc = () => request('/api/User/getOrderByAcc', "GET", {},false);
export const getorders = () => request('/api/User/getorders', "GET", {},false);