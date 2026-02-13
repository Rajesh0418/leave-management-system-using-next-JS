package com.example.leavemanagementsystem.service;

import com.example.leavemanagementsystem.model.Employee;
import com.example.leavemanagementsystem.model.LeaveRequest;
import com.example.leavemanagementsystem.repository.DepartmentRepository;
import com.example.leavemanagementsystem.repository.EmployeeRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository repo;

    @Autowired
    DepartmentRepository deptRepo;

    @Getter @Setter
    Employee currentEmployee;

    @Getter
    List<LeaveRequest> leaveRequests;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    // getting emp data
//    public void findEmployee(Employee userdata) {
//        currentEmployee = repo.findAll().stream()
//                .filter(user -> (user.getEmail().equalsIgnoreCase(userdata.getEmail()) &&
//                        user.getPassword().equalsIgnoreCase(userdata.getPassword())
//                ))
//                .findFirst()
//                .orElse(null);
//    }

//    public void findOneEmployee(Employee user){
//        setCurrentEmployee(Optional(repo.findOneUser(user.getEmail(),user.getPassword())));
//    }

    //private Employee Optional(Optional<Employee> oneUser) {
//        return oneUser.orElse(null);
//    }

    public Employee authenticate(String email, String rawPassword) {
        Employee employee = repo.findByEmail(email).orElse(null);
        if (employee == null) return null;
        if (!passwordEncoder.matches(rawPassword, employee.getPassword())) {
            return null;
        }
        // Fill transient managerId from relation
        if (employee.getManager() != null) {
            employee.setManagerId(employee.getManager().getId());
        }
        return employee;
    }


    // for to display the no. of emp's in manager dashboard
    public int getEmployeeCount() {
        return repo.findAll().size();
    }

    // list of employees data
    public List<Employee> getEmployeeList() {
        return repo.findAll();
    }

    // saving the new emp data
    public void addEmployee(Employee userdata) {
        String encoded = passwordEncoder.encode(userdata.getPassword());
        userdata.setPassword(encoded);
        repo.save(userdata);
    }

    // setting new password
    public Employee setNewPassword(int empId, String newPassword) {
        Employee currentEmployee = repo.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // encode new password
        String encoded = passwordEncoder.encode(newPassword);
        currentEmployee.setPassword(encoded);
        return repo.save(currentEmployee);   // return updated employee
    }

    public Employee findEmployee(int id) {
        return repo.findById(id).orElse(null);
    }


}
