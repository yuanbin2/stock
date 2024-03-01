// RegisterPage.tsx

import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://yourdomain.com/auth/users/", {
        username: username,
        password: password,
      });
      console.log("注册成功", response.data);
      // 处理注册成功的逻辑，比如跳转到登录页面
    } catch (error) {
      console.error("注册失败", error);
      // 处理注册失败的逻辑
    }
  };

  return (
    <div>
      <h2>注册页面</h2>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>注册</button>
    </div>
  );
};

export default Register;
