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
        console.log(res.body);
        console.log(res.status);
        if (res.status == 200) {
          setIsAuthenticated(true);
          console.log("Authentication successful");   // Explicitly for debugging, ought to be removed later
          return;
        } else {
          throw new Error();
        }
      } catch (err: any) {
        setIsAuthenticated(false);
        console.log("Authentication failed");   // Explicitly for debugging, ought to be removed later
      }
  }

  // Call ping on mount
  React.useEffect(() => {
    console.log("Attempting to authenticated...");
    ping();
    console.log("Done authenticating!");
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