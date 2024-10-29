export const { URL_API_BE } = process.env;
export const { URL_API_BE_PRODUCT } = process.env;
export const PATH_APINEXT = '/api';

export const PATH_PAGE_AUTH = '/auth';
export const PATH_PAGE_AUTH_LOGIN = `${PATH_PAGE_AUTH}/login`;
export const PATH_PAGE_AUTH_REGISTER = `${PATH_PAGE_AUTH}/register`;
export const PATH_PAGE_DASHBOARD = '/dashboard';

export const PATH_API_NEXT_AUTH = `${PATH_APINEXT}/auth`;
export const PATH_API_NEXT_AUTH_LOGIN = `${PATH_API_NEXT_AUTH}/login`;
export const PATH_API_NEXT_AUTH_REGISTER = `${PATH_API_NEXT_AUTH}/register`;
export const PATH_API_NEXT_USER_LOGOUT = `${PATH_API_NEXT_AUTH}/logout`;

export const PATH_API_BE_LOGIN = `${URL_API_BE}/login`;
export const PATH_API_BE_REGISTER = `${URL_API_BE}/register`;

export const PATH_API_NEXT_USER = `${PATH_APINEXT}/user`;
export const PATH_API_NEXT_USER_DETAIL = `${PATH_API_NEXT_USER}`;

export const PATH_API_BE_USER = `${URL_API_BE}/users`;
export const PATH_API_BE_USER_DETAIL = `${PATH_API_BE_USER}/:id`;

export const PATH_API_NEXT_PRODUCT = `${PATH_APINEXT}/product`;
export const PATH_API_NEXT_DETAIL_PRODUCT = `${PATH_API_NEXT_PRODUCT}/:id`;
export const PATH_API_NEXT_UPDATE_PRODUCT = PATH_API_NEXT_DETAIL_PRODUCT;

export const PATH_API_BE_LIST_PRODUCTS = `${URL_API_BE_PRODUCT}/products`;
export const PATH_API_BE_CREATE_PRODUCT = PATH_API_BE_LIST_PRODUCTS;
export const PATH_API_BE_UPDATE_PRODUCT = `${PATH_API_BE_LIST_PRODUCTS}/:id`;
export const PATH_API_BE_DETAIL_PRODUCT = PATH_API_BE_UPDATE_PRODUCT;

export const PATH_API_NEXT_CATEGORY = `${PATH_APINEXT}/category`;

export const PATH_API_BE_LIST_CATEGORIES = `${URL_API_BE_PRODUCT}/categories`;
