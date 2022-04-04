export type GlobalModelState = {
  activeMenu: string;
  tabMenu: any[];
};
export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {};
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    activeMenu: '',
    tabMenu: [],
  },
  effects: {},
  reducers: {
    changeActiveMenu: (state: any, { payload }: { payload: any }) => {
      return {
        ...state,
        ...payload,
      };
    },
    changeTabMenu: (state: any, { payload }: { payload: any }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default GlobalModel;
