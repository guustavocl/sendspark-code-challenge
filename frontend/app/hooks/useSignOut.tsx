import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { useUserData } from "~/contexts/UserContext";
import { errorToast } from "~/utils/toast";
import { postSignOut } from "~/services/user.service";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useUserData();

  const handleSignOut = useCallback(async () => {
    try {
      const res = await postSignOut();
      if (res) {
        setLoggedUser(undefined);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) errorToast(err.message);
    }
  }, [setLoggedUser, navigate]);

  return {
    handleSignOut,
  };
};
