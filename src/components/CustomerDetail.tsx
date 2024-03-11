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
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // 处理日期变化
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };
  const handlePhoneUpdate = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为

    // 发送更新请求（这部分可能需要根据实际情况调整）
    // ...

    // 更新完成后切换回非编辑状态
    setIsEditingPhone(false);
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
    <form onSubmit={handleUpdate}>
      <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
        <label htmlFor="avatarUpload">
          <Avatar
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : avatarPrefix + data.avatar
            }
            size="xl"
            cursor="pointer" // 鼠标移上去显示手型
          />
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }} // 隐藏原生文件输入框
          />
        </label>

        <Text mt={4} fontWeight="bold">
          用户类型:{" "}
          {data.membership === "B"
            ? "普通用户"
            : data.membership === "S"
            ? "普通会员"
            : data.membership === "G"
            ? "超级会员"
            : "未知类型"}
        </Text>
        <Text>UserID: {data.user_id}</Text>
        <div>
          <Text>手机号: </Text>
          {isEditingPhone ? (
            <form onSubmit={handlePhoneUpdate}>
              <Input
                type="text"
                value={updatedData?.phone || data?.phone || "1"}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </form>
          ) : (
            <Text onClick={() => setIsEditingPhone(true)}>
              {updatedData?.phone || data.phone || "点击此处编辑"}
            </Text>
          )}
        </div>
        <div>
          <label htmlFor="birthDate">出生日期:</label>
          <br />
          <input
            type="date"
            id="birthDate"
            value={selectedDate || ""}
            onChange={handleDateChange}
          />
        </div>
        <Text>账户余额: {data.account_balance}</Text>
        <Button onClick={handleUpdate}>Update</Button>
        {isUpdating && <div>Updating...</div>}
      </Box>
    </form>
  );
};

export default CustomerDetail;
