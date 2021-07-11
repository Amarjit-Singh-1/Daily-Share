const settingsInit = {
  isSearchOpen: false
};

const settingsReducer = (state = settingsInit, { type, payload }) => {
  switch (type) {
    case "TOGGLE_SEARCH": {
      return { ...state, isSearchOpen: payload.toggle };
    }
    default:
      return state;
  }
};

export default settingsReducer;
