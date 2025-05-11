import request from ".";


export const login = async (data: any) => await request("/api/Admin/login", 'POST', data);
export const getBookinfo = async () => await request("/api/Admin/BookInfos", 'GET', {}, false);
export const getAllCategory = async () => await request("/api/Admin/getAllCategory", "GET", {}, false);
export const addNotice = async (data:any) => await request("/api/Admin/addNotice", "POST", data);
export const getAllOrders = async () => await request("/api/Admin/getAllOrders", "GET", {}, false);
export const getAllUserInfo = async () => await request("/api/Admin/getAllUserInfo", "GET", {}, false);
export const addCategoryInfo = async (data: any) => await request(`/api/Admin/addCategoryInfo?type=${data.type}`, 'GET');
export const UpdateOrderStatus = async (data: any) => await request(`/api/Admin/UpdateOrderStatus?id=${data.id}&status=${data.status}`, 'GET');
export const UpdateCategoryInfo = async (data: any) => await request(`/api/Admin/UpdateCategoryInfo?id=${data.id}&type=${data.type}`, 'GET');
export const deleteCategoryInfo = async (data: any) => await request(`/api/Admin/deleteCategoryInfo?id=${data.id}`, 'GET');
export const addBook = async (data: any) => await request(`/api/Admin/addBook`, 'POST', data);
export const updateBook = async (data: any) => await request(`/api/Admin/updateBook`, 'POST', data);
export const deleteBook = async (data: any) => await request(`/api/Admin/deleteBook?id=${data}`);

