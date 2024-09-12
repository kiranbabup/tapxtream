import LsService from "../services/localstorage";

let user = LsService.getCurrentUser();

const initialState = {
  user: user && user.id ? user : null,
  isAuthenticated: user && user.id ? true : false,
  usertype: user && user.type ? user.type : null,
  isLoading: false,
  errorMessage: null,
  data: {},
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      var user = { ...state.user, ...payload.body };
      LsService.setCurrentUser(user);
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        usertype: payload.type,
      };

    case "LOGIN_UPDATED":
      var changedProfile = LsService.updateCurrentUser(payload);
      return { ...state, user: changedProfile };

    case "LOGOUT":
      LsService.removeCurrentUser();
      return { ...state, isAuthenticated: false, user: null, usertype: null };

    default:
      return state;
  }
}
