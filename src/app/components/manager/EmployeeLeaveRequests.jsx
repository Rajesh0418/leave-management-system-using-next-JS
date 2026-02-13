"use client";

import { useLeave } from "../../context/LeaveContext";
import styles from "../../employee/leavelist/leavelist.module.css";
import ManagerLayout from "@/app/components/manager/ManagerLayout";

const EmployeeLeaveRequests = (props) => {
  const { manager, leaveRequests = [], logoutManager } = props;
  const { leaveRequests: ctxLeaves, setLeaveRequests } = useLeave();

  // Prefer context leaves if present
  const list = ctxLeaves.length ? ctxLeaves : leaveRequests;

  const updateStatus = async (url, message) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log("update status", res.status);
        return;
      }

      const data = await res.json();   // List<LeaveRequest> for that manager
      setLeaveRequests(data);
      sessionStorage.setItem("leaveRequests", JSON.stringify(data));
      alert(message);
    } catch (err) {
      console.warn("Status update warning:", err);
    }
  };


  const handleAccept = (leaveId) =>
    updateStatus(
      `http://localhost:8080/manager/leave-request-accepted?id=${leaveId}&managerId=${manager.id}`,
      "Leave Approved"
    );

  const handleReject = (leaveId) =>
    updateStatus(
      `http://localhost:8080/manager/leave-request-rejected?id=${leaveId}&managerId=${manager.id}`,
      "Leave Rejected"
    );

  const handleCancel = (leaveId) =>
    updateStatus(
      `http://localhost:8080/manager/leave-request-cancled?id=${leaveId}&managerId=${manager.id}`,
      "Leave Canceled"
    );

  if (!manager) return null;

  return (
    <ManagerLayout
      manager={manager}
      onLogout={logoutManager}
      active="leave"
    >
      <div className={styles.headerRow}>
        <h2>Manage Leaves</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>S No</th>
            <th className={styles.th}>Employee ID</th>
            <th className={styles.th}>Leave Type</th>
            <th className={styles.th}>Start Date</th>
            <th className={styles.th}>End Date</th>
            <th className={styles.th}>Reason</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td className={styles.td}>
                No leave requests found
              </td>
            </tr>
          ) : (
            list.map((lv, index) => (
              <tr key={lv.id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{lv.eid}</td>
                <td className={styles.td}>{lv.type}</td>
                <td className={styles.td}>{lv.startDate}</td>
                <td className={styles.td}>{lv.endDate}</td>
                <td className={styles.td}>{lv.reason}</td>
                <td className={styles.td}>{lv.status}</td>
                <td className={styles.td}>
                  {lv.status === "Pending" && (
                    <>
                      <button
                        className={styles.btn}
                        style={{ backgroundColor: "green", marginRight: "4px" }}
                        onClick={() => handleAccept(lv.id)}
                      >
                        Leave Accepted
                      </button>
                      <button
                        className={styles.btn}
                        style={{ backgroundColor: "red", marginRight: "4px" }}
                        onClick={() => handleReject(lv.id)}
                      >
                        Leave Rejected
                      </button>
                      {/* <button
                        className={styles.btn}
                        style={{ backgroundColor: "orange" }}
                        onClick={() => handleCancel(lv.id)}
                      >
                        Cancel Leave
                      </button> */}
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </ManagerLayout>
  );
};

export default EmployeeLeaveRequests;
