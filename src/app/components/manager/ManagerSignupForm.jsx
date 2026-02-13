"use client";

import { useState } from "react";
import styles from "../../employee/signup/signup.module.css"
import { useRouter } from "next/navigation";

// regex
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

const ManagerSignupForm = () => {
  const [manager, setManager] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });
  
  const router = useRouter();
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  // validation

  const validate = () => {
    const e = {};

    if (manager.name.length < 3)
      e.name = "❌ Minimum 3 characters";

    if (!emailRegex.test(manager.email))
      e.email = "❌ Invalid email";

    if (!phoneRegex.test(manager.phoneNumber))
      e.phone = "❌ Invalid phone number";

    if (!passwordRegex.test(manager.password))
      e.password = "❌ Password must be 8 chars, include number & symbol";

    if (manager.password !== confirm)
      e.confirm = "❌ Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveManager = (e) => {
    e.preventDefault();
    if (!validate()) return;

    fetch("http://localhost:8080/manager/add-manager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(manager),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Signup failed:", res.statusText);
        }
        alert("Manager registered successfully!")
        router.push("/manager/login");
      })
      .catch((err) => console.error("Signup error:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManager((prev) => ({ ...prev, [name]: value }));
  }; 

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <form onSubmit={saveManager}>
          <h2>CREATE MANAGER ACCOUNT</h2>

          {/* NAME */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={manager.name}
            onChange={handleChange}
          />
          <div className={`${styles.msg} ${styles.error}`}>
            {errors.name}
          </div>

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={manager.email}
            onChange={handleChange}
          />
          <div className={`${styles.msg} ${styles.error}`}>
            {errors.email}
          </div>

          {/* PHONE */}
          <label>Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={manager.phoneNumber}
            onChange={handleChange}
          />
          <div className={`${styles.msg} ${styles.error}`}>
            {errors.phone}
          </div>

          {/* GENDER */}
          <label>Gender</label>
          <select
            name="gender"
            value={manager.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* PASSWORD */}
          <label>Password</label>
          <div className={styles.showPassword}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={manager.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👀" : "🙈"}
            </span>
          </div>
          <div className={`${styles.msg} ${styles.error}`}>
            {errors.password}
          </div>

          {/* CONFIRM PASSWORD */}
          <label>Confirm Password</label>
          <div className={styles.showPassword}>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "👀" : "🙈"}
            </span>
          </div>
          <div className={`${styles.msg} ${styles.error}`}>
            {errors.confirm}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerSignupForm;
