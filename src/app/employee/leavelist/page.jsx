"use client";

import { useEffect } from "react";

import { useLeave } from "../../context/LeaveContext";
import { useAuth } from "../../context/AuthContext";
import ManageLeaves from "@/app/components/employee/ManageLeaves";

export default function LeaveListPage() {
  const { employee, logoutEmployee } = useAuth();
  const { leaveRequests, setLeaveRequests } = useLeave();
 
  console.log("employee in LeaveListPage:", employee);
  useEffect(() => {
  if (!employee) return;

  const fetchLeaves = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/employee/leaves?id=${employee.id}`
      );

      if (!res.ok) return;

      const data = await res.json();      // ✅ direct JSON
      setLeaveRequests(data);
      sessionStorage.setItem("leaveRequests", JSON.stringify(data));
    } catch (err) {
      console.warn("Fetch leaves warning:", err);
    }
  };
  fetchLeaves();
}, [employee, setLeaveRequests]);

  if (!employee) return <p>Loading...</p>;

  return (
    <ManageLeaves
      employee={employee}
      leaveRequests={leaveRequests}
      logoutEmployee={logoutEmployee}
    />
  );
}

