"use client";

import Link from "next/link";
import styles from "../../employee/profile/profile.module.css"; // or a shared css

export default function ManagerLayout({ manager, onLogout, active, children }) {
  if (!manager) return null;

  return (
    <div className={styles.contentWrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>HYSCALER</h2>
        <hr />
        <Link
          href="/manager/profile"
          className={active === "profile" ? styles.active : ""}
        >
          My Profile
        </Link>
        <Link
          href="/manager/leaveresponselist"
          className={active === "leave" ? styles.active : ""}
        >
          Leave
        </Link>
      </div>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topbar}>
          <div>Welcome, {manager.name}</div>
          <button className={styles.logout} onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
