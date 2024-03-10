import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { Box, Avatar, Text, Input, Button } from "@chakra-ui/react";
import useCustomerdetail, { Customer } from "../Hooks/useCustomerdetail";
import GlobalContext from "../GlobalContext";

const CustomerDetail: React.FC = () => {
  const { data, isLoading, isError } = useCustomerdetail();
  const avatarPrefix = "http://127.0.0.1:8826"; // 添加的前缀
  const [updatedData, setUpdatedData] = useState<Customer | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
  } = updatedData || data;

  const handleInputChange = (key: keyof Customer, value: string | null) => {
    setUpdatedData((prevData) => ({
      ...(prevData || data),
      [key]: value || "", // 处理空值为""
    }));
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    // 发送更新后的数据到服务器的逻辑

    // 模拟请求延迟
    setTimeout(() => {
      setIsUpdating(false);
      setUpdatedData(null); // 重置更新后的数据
    }, 2000);
  };

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
      <Avatar src={avatarPrefix + avatar} size="xl" />
      <Text mt={4} fontWeight="bold">
        {membership} Member
      </Text>
      <Text>UserID: {user_id}</Text>
      <Text>
        Phone:{" "}
        <Input
          value={updatedData?.phone || phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </Text>
      <Text>
        Birth Date:{" "}
        <DatePicker
          selected={
            updatedData?.birth_date ? new Date(updatedData.birth_date) : null
          }
          onChange={(date: Date | null) =>
            handleInputChange(
              "birth_date",
              date ? date.toISOString() : null // 处理空值为null
            )
          }
        />
      </Text>
      <Text>Account Balance: {account_balance}</Text>
      <Button onClick={handleUpdate}>Update</Button>
      {isUpdating && <div>Updating...</div>}
    </Box>
  );
};

export default CustomerDetail;
