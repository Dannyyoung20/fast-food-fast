import generator from './helpers';

class Store {
  constructor() {
    this.store = [];
  }

  // generate uniqe id for an order
  static generateUid() {
    return generator();
  }

  // @params _body req.body
  // @desc Storing the post data
  storeOrder(_body) {
    // Construct a db Object for the order
    const order = {
      user: {
        name: _body.name,
        address: _body.address,
      },
      order: {
        id: Store.generateUid(),
        item: _body.item,
        price: _body.price,
        size: _body.size,
        quantity: _body.quantity,
        toppings: _body.toppings,
      },
    };
    // Store the order details in our store
    this.store.push(order);
    return this.store;
  }

  // @desc Displaying all the orders
  showAllOrders() {
    return this.store;
  }

  // @params _orderID req.params
  // @desc Displays a specific order
  showSpecificOrder(_orderID) {
    const data = this.store.find(order => order.order.id === _orderID);
    return data;
  }

  // @params _orderID req.params, _body req.body
  // @desc Updates a specific order
  updateSpecificOrder(_orderID, _body) {
    // Getting the order item index
    const orderIndex = this.store.findIndex(order => order.order.id === _orderID);

    // Remove the order from our store
    const orderData = this.store.splice(orderIndex, 1);

    // Construct a db Object for the order
    const order = {
      user: {
        name: orderData[0].user.name,
        address: orderData[0].user.address,
      },
      order: {
        id: orderData[0].order.id,
        item: _body.item,
        price: _body.price,
        size: _body.size,
        quantity: _body.quantity,
        toppings: _body.toppings,
      },
    };
    // Store the order details in our store
    this.store.push(order);
    return order;
  }

  // @params _orderID req.params
  // @desc Displays a specific order
  deleteSpecificOrder(_orderID) {
    // Getting the order item index
    const orderIndex = this.store.findIndex(order => order.order.id === _orderID);

    // Remove the order from our store
    this.store.splice(orderIndex, 1);
    return true;
  }
}

export default Store;
