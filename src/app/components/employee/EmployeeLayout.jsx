"use client";

import Link from "next/link";
import styles from "../../employee/profile/profile.module.css"; // same CSS you use now

export default function EmployeeLayout({ employee, onLogout, active, children }) {
  if (!employee) return null;

  return (
    <div className={styles.contentWrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>HYSCALER</h2>
        <hr />
        <Link
          href="/employee/leavelist"
          className={active === "leave" ? styles.active : ""}
        >
          Leave
        </Link>
        <Link
          href="/employee/profile"
          className={active === "profile" ? styles.active : ""}
        >
          My Profile
        </Link>
        <Link
          href="/employee/changepassword"
          className={active === "password" ? styles.active : ""}
        >
          Change Password
        </Link>
      </div>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topbar}>
          <div>Welcome, {employee.name}</div>
          <button className={styles.logout} onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
