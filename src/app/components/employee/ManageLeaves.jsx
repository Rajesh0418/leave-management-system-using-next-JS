"use client";

import EmployeeLayout from "@/app/components/employee/EmployeeLayout";
import styles from "../../employee/leavelist/leavelist.module.css";

export default function ManageLeaves(props) {
  const { employee, leaveRequests = [], logoutEmployee } = props;

  if (!employee) return null;

  return (
    <EmployeeLayout
      employee={employee}
      onLogout={logoutEmployee}
      active="leave"
    >
      <div className={styles.headerRow}>
        <h2>Manage Leaves</h2>
        <a href="/employee/leaverequest" className={styles.logout}>
          Leave Request
        </a>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>S No</th>
            <th className={styles.th}>Leave Type</th>
            <th className={styles.th}>Start Date</th>
            <th className={styles.th}>End Date</th>
            <th className={styles.th}>Reason</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {leaveRequests.length === 0 ? (
            <tr>
              <td colSpan={10} className={styles.td}>
                No leave requests found
              </td>
            </tr>
          ) : (
            leaveRequests.map((lv, index) => (
              <tr key={lv.id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{lv.type}</td>
                <td className={styles.td}>{lv.startDate}</td>
                <td className={styles.td}>{lv.endDate}</td>
                <td className={styles.td}>{lv.reason}</td>
                <td className={styles.td}>{lv.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </EmployeeLayout>
  );
}
