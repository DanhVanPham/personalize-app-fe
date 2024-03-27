export const ACTION_TYPE = {
  openSidenav: "OPEN_SIDENAV",
  sidenavType: "SIDENAV_TYPE",
  sidenavColor: "SIDENAV_COLOR",
  transparentNavbar: "TRANSPARENT_NAVBAR",
  fixedNavbar: "FIXED_NAVBAR",
  openConfiguration: "OPEN_CONFIGURATOR",
};

export const initialState = {
  openSidenav: false,
  sidenavColor: "dark",
  sidenavType: "white",
  transparentNavbar: true,
  fixedNavbar: false,
  openConfigurator: false,
};
