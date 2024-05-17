import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { postChangeCart } from "../api/CartApi";

const useCustomCart = () => {
  const cartItems = useSelector((state) => state.cart);

  const changeMutation = useMutation({
    mutationFn: (param) => postChangeCart(param),
    // onSuccess: (result) => setCartItems(result),
  });

  const changeCart = (param) => {
    changeMutation.mutate(param);
  };

  const addMutation = useMutation({
    mutationFn: (param) => addCartItem(param),
  });

  const addCartItem = (param) => {
    addMutation.mutate(param);
  };

  return { cartItems, changeCart, addCartItem };
};

export default useCustomCart;
