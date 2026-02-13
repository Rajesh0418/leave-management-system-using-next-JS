"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";
import { useAuth } from "../../context/AuthContext";
import EmployeeLayout from "@/app/components/employee/EmployeeLayout";

export default function EmployeeDashboard() {
  const { employee, logoutEmployee } = useAuth();
  const router = useRouter();

  console.log("employee in EmployeeDashboard:", employee);
  useEffect(() => {
    if (!employee) {
      router.push("/employee/login");
    }
  }, [employee, router]);

  if (!employee) return;

  return (
    <EmployeeLayout
      employee={employee}
      onLogout={logoutEmployee}
      active="profile"
    >
      <div className={styles.card}>
        <h2 className={styles.title}>Employee Details</h2>

        <div className={styles.detailsBox}>
          <div className={styles.info}>
            <p>
              <b>Employee ID :</b> {employee.id}
            </p>
            <p>
              <b>Employee Name :</b> {employee.name}
            </p>
            <p>
              <b>Email :</b> {employee.email}
            </p>
            <p>
              <b>Department :</b> {employee.department}
            </p>
            <p>
              <b>Phone :</b> {employee.phoneNumber}
            </p>
            <p>
              <b>Gender :</b> {employee.gender}
            </p>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
