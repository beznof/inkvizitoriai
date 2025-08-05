import React, { createContext, ReactNode } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import useAPI from "@/utils/ClientAPI";

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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Ping function
  const ping = async() => {
      try {
        setIsLoading(true);

        const res = await useAPI("auth/ping-me", { 
          method: 'GET'
        });
        
        if (res.status == 200) {
          setIsAuthenticated(true);
          return;
        } else {
          const refreshRes = await useAPI("auth/refresh", { 
            method: 'POST',
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