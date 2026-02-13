"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "../../employee/login/login.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Make sure this path is correct

const EmployeeLoginForm = () => {
  const router = useRouter();
  const { setEmployee } = useAuth(); // Use context to set employee globally

  const [credentials, setCredentials] = useState({
    email: "",
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
      const res = await fetch("http://localhost:8080/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setInvalidLogin(true);
        //throw new Error("Invalid login");
      }

      const data = await res.json();

      // Save in sessionStorage and context
      sessionStorage.setItem("employee", JSON.stringify(data));
      setEmployee(data);

      alert("Login successful!");
      router.push("/employee/profile");
    } catch (err) {
      console.error("Login failed:", err);
      setInvalidLogin(true);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.box}>
        <form onSubmit={handleLogin}>
          <h2>EMPLOYEE LOGIN</h2>
          {invalidLogin && <h4 style={{color:'red'}} className={styles.errorMsg}>Invalid Credentials</h4>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
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
            <Link href="/employee/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLoginForm;
