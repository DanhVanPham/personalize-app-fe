import React from "react";
import PropTypes from "prop-types";
import { ACTION_TYPE, initialState } from "./constants";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPE.openSidenav: {
      return { ...state, openSidenav: action.value.openSidenav };
    }
    case ACTION_TYPE.sidenavType: {
      return { ...state, sidenavType: action.value };
    }
    case ACTION_TYPE.sidenavColor: {
      return { ...state, sidenavColor: action.value };
    }
    case ACTION_TYPE.transparentNavbar: {
      return { ...state, transparentNavbar: action.value };
    }
    case ACTION_TYPE.fixedNavbar: {
      return { ...state, fixedNavbar: action.value };
    }
    case ACTION_TYPE.openConfiguration: {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [controller, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch],
  );

  return (
    <MaterialTailwind.Provider value={value as any}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider.",
    );
  }
  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.openSidenav, value });

export const setSidenavType = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.sidenavType, value });

export const setSidenavColor = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.sidenavColor, value });

export const setTransparentNavbar = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.transparentNavbar, value });

export const setFixedNavbar = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.fixedNavbar, value });

export const setOpenConfigurator = (dispatch: any, value: any) =>
  dispatch({ type: ACTION_TYPE.openConfiguration, value });
