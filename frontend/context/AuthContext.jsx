import { createContext, useContext, useEffect, useReducer } from "react";
import { getCurrentUser, logout } from "../utils/api";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    getCurrentUser()
      .then(({ data }) => dispatch({ type: "LOGIN", payload: data }))
      .catch(() => dispatch({ type: "LOGOUT" }));
  }, []);

  const handleLogout = async () => {
    await logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
