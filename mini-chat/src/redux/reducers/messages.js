const initialState = {
  messages: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "DIALOGS:SET_MESSAGES":
      return {
        messages: payload,
      };
    default:
      return state;
  }
};
