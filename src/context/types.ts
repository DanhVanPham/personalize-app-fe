export type State = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

type ValueTypes<T> = T[keyof T];

export type StateUnion = ValueTypes<State>;

export type ACTION = {
  type: string;
  value: StateUnion;
};
