# fast-food-fast
---

[![Build Status](https://travis-ci.org/Dannyyoung20/fast-food-fast.svg?branch=master)](https://travis-ci.org/Dannyyoung20/fast-food-fast)
[![Coverage Status](https://img.shields.io/coveralls/github/Dannyyoung20/fast-food-fast/master.svg?branch=master&service=github)](https://coveralls.io/github/Dannyyoung20/fast-food-fast?branch=master&service=github)

Fast-Food-Fast ​ is a food delivery service app for a restaurant.  
The TechStack include:  
1. `Nodejs`
2. `Express`
3. `CSS`
4. `HTML`

## Some useful api endpoints:
---  
* `/api/v1/orders` - `GET` Request - Fetches all the orders from the DB.  
* `/api/v1/orders` - `POST` Request - Added orders to the DB.
* `/api/v1/orders/OrderID` - `GET` Request - Fetches a specific request from the server.  
* `/api/v1/orders/OrderID` - `PUT` Request - Edits a specific order from the server.  
* `/api/v1/orders/OrderID` - `DELETE` Request - Removes a specific order from the DB.  

### UI Elements
The ui design are all located in the `ui` folder.

### Running the server application  
To run the application, follow these steps:  
* Run `git clone https://github.com/Dannyyoung20/fast-food-fast` in your preferred directory. 
* `cd` into the created directory.  
* Run `npm start` to start the server.  
* Head over to `localhost:6000/api/v1/orders` to view the orders.  

## Running the frontend application  
To run the frontend application head over to `ui` folder and open the `index.html` file.