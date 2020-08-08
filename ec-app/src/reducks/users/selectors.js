import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSigndIn,
)

export const getUser = createSelector(
  [usersSelector],
  state => state,
)
export const getUserId = createSelector(
  [usersSelector],
  state => state.uid,
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
);
