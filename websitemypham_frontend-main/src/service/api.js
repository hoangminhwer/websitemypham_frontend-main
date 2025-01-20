

//GUEST
export const GUEST_GET_CATEGORY = 'http://localhost:8080/api/categories';
export const GUEST_GET_CATEGORY_By_ID = (categoryId) =>  `http://localhost:8080/api/categories/${categoryId}`;
export const GUEST_GET_PRODUCT = 'http://localhost:8080/api/products';
export const GUEST_GET_PRODUCT_By_ID = (productId) => `http://localhost:8080/api/products/${productId}`;
export const GUEST_GET_PRODUCT_TOP6 = 'http://localhost:8080/api/products/top6';
export const GUEST_GET_PRODUCT_By_Price = (minPrice,maxPrice) => `http://localhost:8080/api/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`;

export const POST_ACCOUNT_REGISTER = 'http://localhost:8080/account/dang-ky';
export const POST_ACCOUNT_LOGIN = 'http://localhost:8080/api/login/authenticate';

//PRODUCT - DETAIL
export const GET_PRODUCT_DETAIL = (productID) => `http://localhost:8080/api/products/${productID}`;
export const GET_REVIEW_PRODUCT_SUMMY = (productID) => `http://localhost:8080/api/products/reviews-summary/${productID}`;
export const POST_REVIEW_PRODUCT_DETAIL = (productID) => `http://localhost:8080/api/products/reviews/${productID}`;

//SHOP 
export const GET_PRODUCT_BY_CATEGORY_ID = (categoryId,page,pageSize) => `http://localhost:8080/api/products/categoryId/${categoryId}?page=${page}&size=${pageSize}`;
export const GET_PRODUCT_LIST = (currentPage,pageSize) => `http://localhost:8080/api/products/page?page=${currentPage}&size=${pageSize}`;
export const GET_PRODUCT_COUNT = "http://localhost:8080/api/products/product-counts";
export const GET_PRODUCT_MIN_MAX_PRICE = (minPrice,maxPrice,currentPage,pageSize) => `http://localhost:8080/api/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}&size=${pageSize}`;