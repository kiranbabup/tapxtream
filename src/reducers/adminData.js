// reducers/adminData.js
const initialState = {
  userCount: 0,
  eventsCount: 0,
};

export default function adminData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_COUNT":
      return { ...state, userCount: payload };
    case "SET_EVENTS_COUNT":
      return { ...state, eventsCount: payload };
    default:
      return state;
  }
}