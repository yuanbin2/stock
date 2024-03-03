import React from "react";
import { Box, Avatar, Text } from "@chakra-ui/react";
import useCustomerdetail, { Customer } from "../Hooks/useStocksdetail";

const CustomerDetail: React.FC = () => {
  const { data, isLoading, isError } = useCustomerdetail();
  const avatarPrefix = "http://127.0.0.1:4985"; // 添加的前缀

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return null;
  }

  const {
    id,
    user_id,
    phone,
    birth_date,
    membership,
    avatar,
    account_balance,
  } = data as Customer;

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
      <Avatar src={avatarPrefix + avatar} size="xl" /> {/* 拼接前缀 */}
      <Text mt={4} fontWeight="bold">
        {membership} Member
      </Text>
      <Text>UserID: {user_id}</Text>
      <Text>Phone: {phone ? phone : "N/A"}</Text>
      <Text>Birth Date: {birth_date ? birth_date : "N/A"}</Text>
      <Text>Account Balance: {account_balance}</Text>
    </Box>
  );
};

export default CustomerDetail;
