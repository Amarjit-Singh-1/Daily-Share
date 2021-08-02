import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "./actions/settingsActions";

export const apiEndPoint = "https://SocialMedia.amarjitsingh2.repl.co";

export const useToken = () => {
  const token = useSelector((state) => {
    if (state.user.token) {
      return state?.user?.token;
    }
    const t = localStorage.getItem("jwt");
    if (t) {
      return t;
    }
    return undefined;
  });
  return token;
};

export const useCloseSearchListner = () => {
  const dispatch = useDispatch();
  const handleOnClick = useCallback(() => dispatch(toggleSearch(false)), [
    dispatch
  ]);
  useEffect(() => {
    document.addEventListener("click", handleOnClick);
    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }, [handleOnClick]);
};
