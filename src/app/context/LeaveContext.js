"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem("leaveRequests");
    if (data) {
      setLeaveRequests(JSON.parse(data));
    }
  }, []);

  const addLeaveRequest = (leave) => {
    const updatedLeaves = [...leaveRequests, leave];
    setLeaveRequests(updatedLeaves);
    sessionStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));
  };

  return (
    <LeaveContext.Provider
      value={{ leaveRequests, setLeaveRequests, addLeaveRequest }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => useContext(LeaveContext);
