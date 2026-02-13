"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [manager, setManager] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const emp = sessionStorage.getItem("employee");
    const mgr = sessionStorage.getItem("manager");

    if (emp) setEmployee(JSON.parse(emp));
    if (mgr) setManager(JSON.parse(mgr));
  }, []);

  const logoutEmployee = () => {
    sessionStorage.removeItem("employee");
    setEmployee(null);
    router.push("/employee/login");
  };

  const logoutManager = () => {
    sessionStorage.removeItem("manager");
    setManager(null);
    router.push("/manager/login");
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        setEmployee,
        logoutEmployee,
        manager,
        setManager,
        logoutManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
