import React, { createContext, ReactNode } from "react";
import LoadingScreen from "@/components/LoadingScreen";

// Data stored in the context
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Default data
const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false,
  isLoading: false,
});

// Wrapper props
type AuthContextProviderProps = {
  children: ReactNode;
}

// Wrapper
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Ping function
  const ping = async() => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5126/api/auth/ping-me", { 
          method: 'GET',
          credentials: "include"
        });
        if (res.status == 200) {
          setIsAuthenticated(true);
          return;
        } else {
          const refreshRes = await fetch("http://localhost:5126/api/auth/refresh", { 
            method: 'POST',
            credentials: "include"
          });
          if(refreshRes.status == 200) {
            setIsAuthenticated(true);
            return;
          }
          throw new Error();
        }
      } catch (err: any) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
  }

  // Call ping on mount
  React.useEffect(() => {
    ping();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {isLoading ? <LoadingScreen/> : children}
    </AuthContext.Provider>
  )
};

// Simplified interface for accessing the context
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthContextProvider }