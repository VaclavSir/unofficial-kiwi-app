// @flow

export type Navigation = {
  navigate: (screen: string, parameters?: Object) => void,
  state: {
    params: Object,
  },
};
