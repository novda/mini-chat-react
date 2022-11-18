import messages from "../../utils/api";

const actions = {
  setMessages: (messages) => ({
    type: "DIALOGS:SET_MESSAGES",
    payload: messages,
  }),
  fetchMessages: () => (dispatch) => {
    messages().then((data) => {
        dispatch(actions.setMessages(data))
    });
  },
};

export default actions