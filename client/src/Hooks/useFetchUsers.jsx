import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail, getUsersBd } from "../Redux/Actions/DevUser";

export const useFetchUsers = (email) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.devUser.allUsers);
  const userByEmail = useSelector((state) => state.devUser.userByEmail);

  useEffect(() => {
    if (!allUsers) dispatch(getUsersBd());
    if (!userByEmail) dispatch(getUsersBd(email));
  }, [allUsers, dispatch, email, userByEmail]);

  return { allUsers, userByEmail };
};
