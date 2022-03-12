const initialState = {
  data: [],
  loading: true,
  error: false,
}

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
      };
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case "ERROR_DATA":
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default dataReducer;