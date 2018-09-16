import React, { Component } from 'react'
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../utility/local-storage';
import fakeData from '../fakeData/index';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import giphy from '../images/giphy.gif'

export default class Review extends Component {
    constructor() {
        super();
        this.state = {
            cart:[],
            orderPlaced:false
        }
        
    }
    componentDidMount(){
        const storedCart = getDatabaseCart();
        const savedCart = [];

        for (let id in storedCart){
            const product = fakeData.find(product => product.id === id);
            product.quantity = storedCart[id];
            savedCart.push(product);
        }
        this.setState({cart:savedCart});
    }

    handleRemoveItem = (product) => {
       const newCart = this.state.cart.filter(product => product.id !== product.id);
       this.setState({cart:newCart});
       removeFromDatabaseCart(product.id);
    }

    placeOrder = () => {
        this.setState({orderPlaced:true, cart:[]})
        processOrder();
    }
    
    render() {
        let happyImage;
        if (this.state.orderPlaced){
            happyImage = <img src={giphy}/>
        }
    return (
      <div className="shop">
         <h1>Review Order</h1>
        <div className="product-container">
        {
            this.state.cart.map(product => <Product 
                key={product.id} 
                product={product}
                removeItem={this.handleRemoveItem}
                isReview/>)
        }
        {happyImage}
        </div>
        <div className="cart-container">
            <Cart cart={this.state.cart}>
                <button onClick={this.placeOrder}>Place Order</button>
            </Cart>
        </div>
      </div>
    )
  }
}
