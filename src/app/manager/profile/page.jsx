"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../employee/profile/profile.module.css";
import { useAuth } from "../../context/AuthContext";
import ManagerLayout from "@/app/components/manager/ManagerLayout";

export default function ManagerProfile() {
  const { manager, logoutManager } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!manager) {
      router.push("/manager/login");
    }
  }, [manager, router]);

  if (!manager) return null;

  return (
    <ManagerLayout
      manager={manager}
      onLogout={logoutManager}
      active="profile"
    >
      <div className={styles.card}>
        <h2 className={styles.title}>Manager Details</h2>
        <div className={styles.detailsBox}>
          <div className={styles.info}>
            <p>
              <b>Manager ID :</b> {manager.id}
            </p>
            <p>
              <b>Manager Name :</b> {manager.name}
            </p>
            <p>
              <b>Email :</b> {manager.email}
            </p>
            <p>
              <b>Phone :</b> {manager.phoneNumber}
            </p>
            <p>
              <b>Gender :</b> {manager.gender}
            </p>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}
