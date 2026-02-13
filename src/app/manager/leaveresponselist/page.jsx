"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";  // you define this
import { useLeave } from "@/app/context/LeaveContext";              // reuse same context
import EmployeeLeaveRequests from "@/app/components/manager/EmployeeLeaveRequests";

export default function EmployeeLeaveListPage() {
  const { manager, logoutManager } = useAuth();       // similar to useAuth for employee
  const { leaveRequests, setLeaveRequests } = useLeave();

  useEffect(() => {
    if (!manager) return;

    const fetchLeaves = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/manager/leaverequests/${manager.id}` // JSON endpoint
        );

        if (!res.ok) return;

      const data = await res.json();
      setLeaveRequests(data);
      sessionStorage.setItem("leaveRequests", JSON.stringify(data));

      } catch (err) {
        console.warn("Manager fetch leaves warning:", err);
      }
    };

    fetchLeaves();
  }, [manager, setLeaveRequests]);

  if (!manager) return <p>Loading...</p>;

  return (
    <EmployeeLeaveRequests
      manager={manager}
      leaveRequests={leaveRequests}
      logoutManager={logoutManager}
    />
  );
}
