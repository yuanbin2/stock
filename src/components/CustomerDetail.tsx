import React, { useContext, useEffect, useState } from "react";
import { Box, Avatar, Text, Input, Button } from "@chakra-ui/react";
import useCustomerdetail, { Customer } from "../Hooks/useCustomerdetail";
import GlobalContext from "../GlobalContext";
import axios from "axios";

const CustomerDetail: React.FC = () => {
  const { data, isLoading, isError } = useCustomerdetail();
  const avatarPrefix = "http://127.0.0.1:7678"; // 添加的前缀
  const [updatedData, setUpdatedData] = useState<Customer | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // 处理日期变化
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return null;
  }

  const handleInputChange = (key: keyof Customer, value: string) => {
    setUpdatedData((prevData) => ({
      ...(prevData || data),
      [key]: value || "", // 处理空值为""
    }));
  };

  const handleUpdate = () => {
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("avatar", avatarFile || ""); // 将头像文件添加到 FormData 中

    if (updatedData) {
      Object.entries(updatedData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    formData.append("birth_date", selectedDate || ""); // 将选定的日期添加到 FormData 中

    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${localStorage.getItem("accessToken")}`;
    axios
      .put("http://127.0.0.1:7678/customers/me/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsUpdating(false);
        setUpdatedData(null); // 重置更新后的数据
        setAvatarFile(null); // 重置头像文件
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setIsUpdating(false);
      });
  };

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
      <label htmlFor="avatarUpload">Avatar:</label>
      <br />
      {avatarFile ? (
        <img
          src={URL.createObjectURL(avatarFile)}
          alt="Selected Avatar"
          height="100"
        />
      ) : (
        <Avatar src={avatarPrefix + data.avatar} size="xl" />
      )}
      <br />
      <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <Text mt={4} fontWeight="bold">
        {data.membership} Member
      </Text>
      <Text>UserID: {data.user_id}</Text>
      <Text>
        Phone:{" "}
        <Input
          value={data.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </Text>
      <div>
        <label htmlFor="birthDate">Birth Date:</label>
        <br />
        <input
          type="date"
          id="birthDate"
          value={selectedDate || ""}
          onChange={handleDateChange}
        />
      </div>

      <Text>Account Balance: {data.account_balance}</Text>
      <Button onClick={handleUpdate}>Update</Button>

      {isUpdating && <div>Updating...</div>}
    </Box>
  );
};

export default CustomerDetail;
