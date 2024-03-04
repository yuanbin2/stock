import React, { useEffect } from "react";
import useCart from "../Hooks/useCart";
import { Heading } from "@chakra-ui/react";

const MyCart = () => {
  const { data } = useCart();
  useEffect(() => {
    if (data && data.id) {
      localStorage.setItem("cartId", data.id); // 将 data 中的 id 放入本地存储的 cartId 中
    }
  }, [data]);
  return (
    <div>
      <Heading>{localStorage.getItem("cartId")}</Heading>
    </div>
  );
};

export default MyCart;
