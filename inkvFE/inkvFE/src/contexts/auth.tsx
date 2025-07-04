import React, { createContext, ReactNode } from "react";

// Data stored in the context
type AuthContextType = {
  isAuthenticated: boolean;
};

// Default data
const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false,
});

// Wrapper props
type AuthContextProviderProps = {
  children: ReactNode;
}

// Wrapper
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // Ping function
  const ping = async() => {
      try {
        const res = await fetch("http://localhost:5126/api/auth/ping-me", { 
          method: 'GET',
          credentials: "include"
        });
        if (res.status == 200) {
          setIsAuthenticated(true);
          return;
        } else {
          throw new Error();
        }
      } catch (err: any) {
        setIsAuthenticated(false);
      }
  }

  // Call ping on mount
  React.useEffect(() => {
    ping();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
};

// Simplified interface for accessing the context
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthContextProvider }