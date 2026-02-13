"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLeave } from "../../context/LeaveContext";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../changepassword/changepassword.module.css";

export default function LeaveRequestPage() {
    const { employee, logoutEmployee } = useAuth();
    const { addLeaveRequest } = useLeave();
    const router = useRouter();

    const [formData, setFormData] = useState({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
    });
    console.log("employee in LeaveRequestPage:", employee);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!employee) return;

        const body = {
            ...formData,
            eid: employee.id,
            mid :employee.managerId,
        };

        try {
            const res = await fetch("http://localhost:8080/employee/submit-leave-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log("error body:", errorText);
                alert("Submit failed: " + res.status);
                return;
            }

            // Inspect the raw response once
            const text = await res.text();
            //console.log("raw response:", text);

            // If it is valid JSON object, parse it
            const savedLeave = JSON.parse(text);
            addLeaveRequest(savedLeave);

            alert("Leave request submitted successfully!");
            router.push("/employee/leavelist");
        } catch (err) {
            console.error(err);
            alert("Error submitting leave request");
        }
    };



    if (!employee) return <p>Loading...</p>;

    return (
        <div className={styles.contentWrapper}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <h2>HYSCALER</h2>
                <hr />
                <Link href="/employee/leavelist">Leave</Link>
                <Link href="/employee/profile">My Profile</Link>
                <Link href="/employee/changepassword">Change Password</Link>
            </div>

            {/* Main */}
            <div className={styles.main}>
                <div className={styles.topbar}>
                    <div>Welcome, {employee.name}</div>
                    <button className={styles.logout} onClick={logoutEmployee}>
                        Logout
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.card}>
                        <h2 className={styles.title}>Request for Leave</h2>

                        <form onSubmit={handleSubmit}>

                            <div className={styles.formGroup}>
                                <label htmlFor="type">Leave Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Vacation Leave">Vacation Leave</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    id="endDate"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="reason">Reason</label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className={styles.btn} type="submit">
                                Apply Leave
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
