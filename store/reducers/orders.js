import Order from "../../models/order";
import { ADD_ORDER, SET_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        order: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };

    default:
      return state;
  }
}
