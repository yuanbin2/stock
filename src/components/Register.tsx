import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = () => {
    // 省略部分代码
    const userData = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    axios
      .post("http://127.0.0.1:7678/auth/users/", userData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        setSuccessMessage("注册成功！请登录。");
        // 清空表单数据
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setFirstName("");
        setLastName("");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setError(error.message);
      });
  };

  return (
    <Stack spacing={3} maxW="300px" mx="auto">
      <FormControl>
        <FormLabel>用户名</FormLabel>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>密码</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl isInvalid={password !== confirmPassword}>
        <FormLabel>确认密码</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="sm"
        />
        <FormErrorMessage>Passwords do not match</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>邮箱</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>姓氏</FormLabel>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>名字</FormLabel>
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          size="sm"
        />
      </FormControl>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <Button colorScheme="blue" onClick={handleRegister}>
        Register
      </Button>
      <Button as="a" href="/login" colorScheme="teal" variant="link">
        去登录
      </Button>
    </Stack>
  );
};

export default Register;
