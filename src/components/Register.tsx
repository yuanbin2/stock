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

  const handleRegister = () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      !firstName ||
      !lastName
    ) {
      setError("所有数据都不能为空");
      return;
    }
    if (password !== confirmPassword) {
      setError("两次密码不一致");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!password.match(passwordRegex)) {
      setError("密码必须包含数字和大小写字母");
      return;
    }

    const userData = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    axios
      .post("http://127.0.0.1:4985/auth/users/", userData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        // 在这里处理注册成功的逻辑
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setError(error.message);
        // 在这里处理注册失败的逻辑
      });
  };

  return (
    <Stack spacing={3} maxW="300px" mx="auto">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl isInvalid={password !== confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
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
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          size="sm"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          size="sm"
        />
      </FormControl>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button colorScheme="blue" onClick={handleRegister}>
        Register
      </Button>
    </Stack>
  );
};

export default Register;
