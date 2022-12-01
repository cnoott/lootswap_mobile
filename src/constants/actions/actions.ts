export const createActionConst = (name: String) => {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    UPDATE: `${name}.SUCCESS`,
    FAILURE: `${name}.FAILURE`,
    RESET: `${name}.RESET`,
  };
};

export const actions = {
  CHAIN_DATA: 'CHAIN_DATA',
  WALLET_DATA: 'WALLET_DATA',
  AUTH_DATA: 'AUTH_DATA',
  SIGN_UP_DATA: 'SIGN_UP_DATA',
};
