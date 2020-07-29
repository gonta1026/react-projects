import {createSelector} from "reselect"; 

const usersSelector = (state) => state.users;

export const getIsSignedIn  = createSelector(
  [usersSelector],
  state => state.isSigndIn,
)

export const getUser = createSelector(
  [usersSelector],
  state => state,
)

