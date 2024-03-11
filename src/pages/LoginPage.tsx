import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Link, BrowserRouter as Router } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // 验证用户名和密码是否为空
    if (!username || !password) {
      setError("用户名和密码不能为空");
      return;
    }

    // 构建请求体
    const requestBody = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:7678/auth/jwt/create",
        requestBody
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;

        // 登录成功，执行相应的操作（如重定向到首页）
        console.log("登录成功");
        console.log("访问令牌:", access);
        console.log("刷新令牌:", refresh);

        // 将访问令牌和刷新令牌保存到本地存储或状态管理中
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        axios.defaults.headers.common["Authorization"] = `JWT ${access}`;
        window.location.href = "/";
      } else {
        // 登录失败，处理错误（如显示错误消息）
        console.log("登录失败");
      }
    } catch (error) {
      // 处理网络错误
      console.error("网络错误:", error);
    }
  };

  return (
    <Center>
      <Box w="md" p={4} borderWidth="1px" borderRadius="md">
        <form onSubmit={handleLogin}>
          <FormControl isRequired isInvalid={error !== ""} mb={4}>
            <FormLabel htmlFor="username">用户名:</FormLabel>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={error !== ""} mb={4}>
            <FormLabel htmlFor="password">密码:</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>

          <Button colorScheme="teal" type="submit" mb={4} w="100%">
            登录
          </Button>

          <Text textAlign="center">
            没有账号？
            <Button as="a" href="/register" colorScheme="teal" variant="link">
              点击这里去注册
            </Button>
          </Text>
        </form>
      </Box>
    </Center>
  );
};

export default LoginPage;
