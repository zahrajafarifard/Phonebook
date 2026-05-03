const initialState = {
  token: "",
  userId: "",
  mobile: "",
  error: "",
  isAdmin: false,
  addContact: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        mobile: action.mobile,
        userId: action.userId,
        isAdmin: action.isAdmin,
        addContact: action.addContact,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        error: action.error,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: "",
        mobile: "",
        token: "",
        error: "",
        isAdmin: false,
        addContact: false,
      };

    default:
      return state;
  }
};

export default Reducer;
