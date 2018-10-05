// Functions
export { default } from './generator';
export { default as isEmpty } from './empty';
export { default as hashPassword } from './hashPassword';
export { default as tokenGenerate } from './generateToken';
export { default as tokenVerify } from './verifyToken';
export { default as verifyPassword } from './verifyPassword';
export { default as errorHandler } from './errorHandler';
export { default as handleResponse } from '.';
export { default as checkIsEmail } from './emailValidation';

// Messages
// Unique violation message
export const UNIQUE_VIOLATION_MSG = 'Menu Item Exist';
export const NO_USER_MSG = 'User does not exist';
export const SUCCESSFUL_REQUEST_MSG = 'Request Successful';
export const SUCCESSFUL_CREATED_MSG = 'Added Successfully';
export const FAILED_CREATED_MSG = 'Could not add item';
export const NO_ORDER_MSG = 'No orders';
export const NOT_FOUND_MSG = 'Not Found';
export const LOGIN_SUCCESS_MSG = 'Successfully logged in';
export const INVALID_EMAIL_MSG = 'Invalid email';
export const INVALID_ADDRESS_MSG = 'Invalid Address Provided, max length: 50, min-length:8';
export const INVALID_EMAIL_PASSWORD_MSG = 'Invalid email or password';
export const SERVER_ERROR_MSG = 'Internal Server Error';
export const UNAUTHORIZED_MSG = 'Unauthorized Access';
export const AUTH_MESSAGE = 'UnAuthorized Acess';
export const TOKEN_INVALID_MSG = 'Invalid Token! Please login';
export const TOKEN_NOT_PASSED_MSG = 'Token not provided';
export const EMAIL_PASSWORD_REQUIRED = 'Email and password are required';
export const EMAIL_PASSWORD_ADDRESS_REQUIRED = 'Email, Address and password are required';
export const EMAIL_EXIST_MSG = 'Email address already exist';
export const REQUIRED_MENU_FIELDS = 'Name, imageUrl and price are reuired';
