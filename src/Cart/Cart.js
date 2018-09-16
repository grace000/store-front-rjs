import React, { Component } from 'react'

export default class Cart extends Component {
  render() {
      const cart = this.props.cart;
      const totalPrice = cart.reduce((total, product) => total+product.price, 0);
    
      return (
      <div>
        <h4>Order Summary</h4>
        <p>Items Ordered: {cart.length}</p>
        <p>Total Price: {totalPrice.toFixed(2)}</p>
        <br/>
        {this.props.children}
      </div>
    )
  }
}
