"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../employee/login/login.module.css"// create or reuse CSS module
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

const ManagerLoginPage = () => {
  const router = useRouter();
  const { setManager } = useAuth();
  

  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setInvalidLogin(false);

    try {
      const response = await fetch("http://localhost:8080/manager/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          credentials
        )
      });

      if (!response.ok) {
        setInvalidLogin(true);
        return;
      }

      const data = await response.json();

      console.log("Manager login successful:", data);

      sessionStorage.setItem("manager", JSON.stringify(data));
      setManager(data);

      alert("Manager login successful!");
      router.push("/manager/profile");
    } catch (err) {
      console.error("Manager login failed:", err);
      setInvalidLogin(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form onSubmit={handleLogin}>
          <h2>MANAGER LOGIN</h2>

          {invalidLogin && (
            <h2 className={styles.errorMsg}>Invalid Credentials</h2>
          )}

          <input
            type="text"
            name="login"
            placeholder="Email or password"
            value={credentials.login}
            onChange={handleChange}
            required
          />

          <div className={styles.showPassword}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👀" : "🙈"}
            </span>
          </div>

          <button type="submit">Login</button>

          <div className={styles.dontHaveAccount}>
            <span>Don't have an account yet - </span>
            <Link href="/manager/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerLoginPage;


