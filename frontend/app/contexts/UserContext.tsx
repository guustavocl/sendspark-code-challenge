/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext, useState } from "react";
import { UserProps } from "~/types/User";

type UserContextProps = {
  loggedUser?: UserProps;
  setLoggedUser: (value: UserProps | undefined) => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
  cookieUser?: UserProps;
};

const UserProvider: React.FC<UserProviderProps> = ({
  children,
  cookieUser,
}: {
  children: ReactNode;
  cookieUser?: UserProps;
}) => {
  const [loggedUser, setLoggedUser] = useState<UserProps | undefined>(
    cookieUser
  );
  return (
    <UserContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserData = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within an UserProvider");
  }
  return context;
};

export { UserProvider, useUserData };
