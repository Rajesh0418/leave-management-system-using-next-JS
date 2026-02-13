"use client";
import { use, useEffect, useState } from "react";
import styles from "../../employee/signup/signup.module.css";
import { useRouter } from "next/navigation";

// regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

const EmployeeSignupForm = () => {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    managerId: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [errors, setErrors] = useState({});
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/employee/signup")
      .then(res => res.json())
      .then(data => setManagers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const validate = () => {
    const e = {};
    if (employee.name.length < 3) e.name = "❌ Minimum 3 characters";
    if (!emailRegex.test(employee.email)) e.email = "❌ Invalid email";
    if (!phoneRegex.test(employee.phoneNumber)) e.phone = "❌ Invalid phone number";
    if (!passwordRegex.test(employee.password)) e.password = "❌ Weak password";
    if (employee.password !== confirm) e.confirm = "❌ Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    if (!validate()) return;
    fetch("http://localhost:8080/employee/add-employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...employee,
        managerId: parseInt(employee.managerId),
      }),
    })
      .then(res => {
        if (!res.ok) {
          console.log("error status:", res.status);
        }
        alert("Employee registered successfully!");
        router.push("/employee/login");
      })
      .catch(err => console.error("Fetch error:", err));;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <form onSubmit={saveEmployee}>
          <h2>CREATE EMPLOYEE ACCOUNT</h2>

          <label>Name</label>
          <input type="text" name="name" value={employee.name} onChange={e => handleChange(e)} />
          <div className={`${styles.msg} ${styles.error}`}>{errors.name}</div>

          <label>Email</label>
          <input value={employee.email} name="email" onChange={e => handleChange(e)} />
          <div className={`${styles.msg} ${styles.error}`}>{errors.email}</div>

          <label>Department</label>
          <select value={employee.department} name="department" onChange={e => handleChange(e)}>
            <option value="">-- Select Department --</option>
            <option value="Front-end developer">Front-end developer</option>
            <option value="Back-end developer">Back-end developer</option>
            <option value="Full stack developer">Full stack developer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Associate Software Engineer">Associate Software Engineer</option>
            <option value="Devops Engineer">Devops Engineer</option>
          </select>

          <label>Manager</label>
          <select value={employee.managerId} name="managerId" onChange={e => handleChange(e)}>
            <option value="">-- Select Manager --</option>
            {managers.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <label>Phone</label>
          <input type="" name="phoneNumber" value={employee.phoneNumber} onChange={e => handleChange(e)} />
          <div className={`${styles.msg} ${styles.error}`}>{errors.phone}</div>

          <label>Gender</label>
          <select name="gender" value={employee.gender} onChange={e => handleChange(e)} >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* PASSWORD */}
          <label>Password</label>
          <div className={styles.showPassword}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={employee.password}
              onChange={e => handleChange(e)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👀" : "🙈"}
            </span>
          </div>
          <div className={`${styles.msg} ${styles.error}`}>{errors.password}</div>

          {/* CONFIRM PASSWORD */}
          <label>Confirm Password</label>
          <div className={styles.showPassword}>
            <input
              name="confirm"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "👀" : "🙈"}
            </span>
          </div>
          <div className={`${styles.msg} ${styles.error}`}>{errors.confirm}</div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSignupForm;
