import React, { Component } from 'react'
import fakeData from '../fakeData/index';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from "../utility/local-storage";
export default class Shop extends Component {
    constructor() {
        super();
        this.state = {
            products:[],
            cart:[]
        }
    }
    
    componentDidMount(){
        const firstTen = fakeData.slice(0,10);
        this.setState({
            products:firstTen
        })

        const storedCart = getDatabaseCart();
        const savedCart = [];

        for (let id in storedCart){
            const product = fakeData.find(product => product.id === id);
            product.quantity = storedCart[id];
            savedCart.push(product);
        }
        this.setState({cart:savedCart});
    }

    handleAddToCart = (product) => {
        const newCart = [...this.state.cart, product];
        this.setState({cart:newCart});
        const quantity = newCart.filter( product => product.id === product.id).length;
        addToDatabaseCart(product.id, quantity);
    }

    render() {
    return (
        <div className="shop">
            <div className="product-container">
                <h1>Buy what you like</h1>
                {
                    this.state.products.map(product => <Product 
                        product={product} 
                        key={product.id}
                        addToCart={this.handleAddToCart}/>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={this.state.cart}/>
            </div>
            
        </div>
    )
    }
}
