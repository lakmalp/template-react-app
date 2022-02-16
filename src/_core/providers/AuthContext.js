import React, { useEffect, useState } from 'react';
import auth_api from '../api/auth_api';
import { decodeError } from '../utilities/exception-handler';
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isServerAvailable, setIsServerAvailable] = useState(false);
  const [isAuthWaiting, setIsAuthWaiting] = useState(true);
  const [isPingingServer, setIsPingingServer] = useState(true);
  const [user, setUser] = useState();
  const [authError, setAuthError] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const login = async (email, password) => {
    try {
      setIsAuthWaiting(true)
      let res = await auth_api.login(email, password);
      res = await auth_api.user();
      setUser(res.data)
      setIsAuthed(true)
      setAuthError("");
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(decodeError(err).message)
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setIsAuthWaiting(true)
      await auth_api.register(name, email, password);
      setAuthError("");
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err).message)
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const logout = async () => {
    try {
      setIsAuthWaiting(true)
      await auth_api.logout();
      setUser()
      setIsAuthed(false)
      setAuthError("");
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err).message)
    }
    finally {
      setIsAuthWaiting(false)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsPingingServer(true)
        await auth_api.csrf()
        setIsPingingServer(false)
        setIsServerAvailable(true)
        setIsAuthWaiting(true)
        let res = await auth_api.user();
        setUser(res.data)
        setIsAuthed(true)
        setAuthError("");
        setIsAuthWaiting(false)
      } catch (err) {
        setIsAuthed(false)
        setAuthError(decodeError(err).message)
        setIsAuthWaiting(false)
        navigate("/login");
      }
    })();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isPingingServer: isPingingServer,
        isServerAvailable: isServerAvailable,
        isAuthWaiting: isAuthWaiting,
        authError: authError,
        isAuthed: isAuthed,
        user: user,
        register: (name, email, password) => register(name, email, password),
        login: (email, password) => login(email, password),
        logout: () => logout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;