"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../changepassword/changepassword.module.css";
import { useAuth } from "@/app/context/AuthContext";
import EmployeeLayout from "@/app/components/employee/EmployeeLayout";

export default function ChangePassword() {
  const { employee, setEmployee, logoutEmployee } = useAuth();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!employee) {
      router.push("/employee/login");
    }
  }, [employee, router]);

  if (!employee) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/employee/new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: employee.id,
          password: password,
        }),
      });

      if (!res.ok) return;

      const updatedEmployee = await res.json();

      setEmployee(updatedEmployee);
      sessionStorage.setItem("employee", JSON.stringify(updatedEmployee));

      alert("Password changed successfully");
      router.push("/employee/profile");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <EmployeeLayout
      employee={employee}
      onLogout={logoutEmployee}
      active="password"
    >
      <div className={styles.card}>
        <h2 className={styles.title}>Change Password</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>New Password</label>
            <div className={styles.showPassword}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? "👀" : "🙈"}
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <div className={styles.showPassword}>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "👀" : "🙈"}
              </span>
            </div>
          </div>

          <button className={styles.btn} type="submit">
            Change Password
          </button>
        </form>
      </div>
    </EmployeeLayout>
  );
}
