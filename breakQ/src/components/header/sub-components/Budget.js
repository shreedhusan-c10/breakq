import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import {addToBudget} from '../../../store/slices/budget-slice';
import { useEffect } from "react";
import checkedIcon from '../../../assets/images/checked-icon.svg';
import { useState } from "react";
import cogoToast from "cogo-toast";

const Budget = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [totalBudget, setTotalBudget] = useState(JSON.parse(localStorage.getItem('totalBudget')));
  
  useEffect(() => {
    setTotalBudget(budget);
  }, [budget])

  useEffect(() => {
    if(cartItems && cartItems.length > 0) {
      let totalPrice = 0;
      cartItems.map((item) => {
        const discountedPrice = getDiscountPrice(
          item.price,
          item.discount
        );
        const finalProductPrice = (
          item.price * currency.currencyRate
        ).toFixed(2);
        const finalDiscountedPrice = (
          discountedPrice * currency.currencyRate
        ).toFixed(2);

        if(discountedPrice) {
          totalPrice += finalDiscountedPrice * item.quantity;
        } else {
          totalPrice += finalProductPrice * item.quantity;
        }
      })
  
      if(totalPrice > Number(totalBudget.budget)) {
        cogoToast.warn("Total Cart Price is greater than the Budget!", {position: "bottom-left"});
      }
    }
  }, [cartItems])

  const budgetInputHandler = (e) => {
    setTotalBudget(e.target.value);
  }
  
  const budgetHandler = () => {
    if(totalBudget > 0) {
      dispatch(addToBudget(totalBudget));
      localStorage.setItem('totalBudget', JSON.stringify(totalBudget));
      console.log(totalBudget);
      cogoToast.success('Budget added Successfully', {position: "bottom-left"})
    } else {
      cogoToast.error('Budget value cannot be Empty', {position: "bottom-left"})
    }
  }

  return (
    <div className="shopping-cart-content">
      <h4>SET BUDGET</h4>
      <div className="budget-input-block">
        <p>₹</p>
        <input onChange={(e) => budgetInputHandler(e)} type="number" id="budget-input-id-selector" defaultValue={totalBudget}/>
        <img onClick={() => budgetHandler()} src={checkedIcon}/>
      </div>
      <div className="budget-info-block">
        <p>Choose and amount for your budget. We'll let you know when you exceed your budget.</p>
      </div>
      {/* {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const discountedPrice = getDiscountPrice(
                item.price,
                item.discount
              );
              const finalProductPrice = (
                item.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity);

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + item.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + item.id}
                      >
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice}
                    </span>
                    {item.selectedProductColor &&
                    item.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {item.selectedProductColor}</span>
                        <span>Size: {item.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => dispatch(deleteFromCart(item.cartItemId))}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )} */}
    </div>
  );
};

export default Budget;
