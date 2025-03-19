import { createContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const VERIFY = gql`
  query Verify {
    verify {
      username
      role
    }
  }
`;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { error, data, refetch, loading } = useQuery(VERIFY);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!!error) {
      setUser(null);
    } else {
      setUser(data?.verify);
    }
  }, [data, error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
