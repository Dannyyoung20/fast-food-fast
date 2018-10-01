// Functions
export { default } from './generator';
export { default as isEmpty } from './empty';
export { default as hashPassword } from './hashPassword';
export { default as tokenGenerate } from './generateToken';
export { default as tokenVerify } from './verifyToken';
export { default as verifyPassword } from './verifyPassword';
export { default as ErrorHandler } from './errorHandler';

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
export const INVALID_EMAIL_PASSWORD_MSG = 'Invalid email or password';
export const SERVER_ERROR_MSG = 'Internal Server Error';
