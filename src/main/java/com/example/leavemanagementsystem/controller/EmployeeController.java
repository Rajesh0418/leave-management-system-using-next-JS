package com.example.leavemanagementsystem.controller;


import com.example.leavemanagementsystem.model.Employee;
import com.example.leavemanagementsystem.model.LeaveRequest;
import com.example.leavemanagementsystem.model.Manager;
import com.example.leavemanagementsystem.service.EmployeeService;
import com.example.leavemanagementsystem.service.LeaveService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/employee")
@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    DepartmentController departmentController;

    @Autowired
    LeaveController leaveController;

    @Autowired
    ManagerController managerController;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private LeaveService leaveService;

    // login auth of employee
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Employee> login(@RequestBody Employee employeeData) {
        Employee employee = employeeService.authenticate(
                employeeData.getEmail(),
                employeeData.getPassword()
        );
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(employee);
    }


    // saving the data of an employee when emp singing up
    @PostMapping("/add-employee")
    @ResponseBody
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        employee.setManager(managerController.getManagerById(employee.getManagerId()));
        employee.setManagerId(employee.getManagerId());
        departmentController.updateNoOfEmployeesByDepartment(employee.getDepartment());
        employeeService.addEmployee(employee);
        return ResponseEntity.ok("Employee added successfully");
    }


    // for displaying the no. of emp's in the company
    @GetMapping("/employee-count")
    public int getEmployeeCount() {
        return employeeService.getEmployeeCount();
    }

    // getting emp's list
    @GetMapping("/employees")
    public String getEmployeeList(Model model, HttpSession session) {
        List<Employee> employeeList = employeeService.getEmployeeList();
        model.addAttribute("employees", employeeList);
        return "/employee/employeeList"; // your JSP name
    }

     @GetMapping("/leaves")
    @ResponseBody
    public ResponseEntity<List<LeaveRequest>> getLeavesByEmployeeId(@RequestParam int id) {
        List<LeaveRequest> leaves = leaveController.getLeavesByEmployeeId(id);
        System.out.println(leaves);
        return ResponseEntity.ok(leaves);
    }
//
//    public List<LeaveRequest> getLeaveByEmployeeId(int id) {
//        List<LeaveRequest> leaves = leaveController.getLeavesByEmployeeId(id);
//        System.out.println(leaves);
//        return leaves;
//    }


    // Business logic for changing the data
    @PostMapping("/new-password")
    @ResponseBody
    public ResponseEntity<Employee> setNewPassword(@RequestBody Employee employeeData) {
        Employee updatedEmployee = employeeService.setNewPassword(
                employeeData.getId(),
                employeeData.getPassword()
        );
        return ResponseEntity.ok(updatedEmployee);
    }


    // navigating to emp leave request page
    @GetMapping("/employee-leave-request-status")
    public String employeeLeaveRequestStatus(HttpSession session) {
        Employee emp = employeeService.getCurrentEmployee();
        if (emp == null) {
            return "redirect:/employee-login";
        }
        // setting all leave requests which are in the name of emp
        emp.setLeaveRequests(leaveController.getLeaveRequestsByEmployeeId(emp.getId()));
        List<LeaveRequest> leaveRequestsList = emp.getLeaveRequests();
        session.setAttribute("employeeData", emp);
        session.setAttribute("leaveRequests", leaveRequestsList);
        return "/employee/employeeLeaveRequestStatus";
    }

    // business logic for sending request to employee and saving the leave request

    @PostMapping("/submit-leave-request")
    @ResponseBody
    public ResponseEntity<LeaveRequest> submitLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        leaveRequest.setStatus("Pending");

        System.out.println(leaveRequest.getEid());
        System.out.println(leaveRequest.getMid());
        Employee emp = employeeService.findEmployee(leaveRequest.getEid());
        Manager mgr = managerController.findManager(leaveRequest.getMid());

        leaveRequest.setEmployee(emp);
        leaveRequest.setManager(mgr);

        LeaveRequest saved = leaveService.saveTheData(leaveRequest);
        return ResponseEntity.ok(saved);
    }





    // signup page
    @GetMapping("/signup")
    @ResponseBody
    public List<Manager> signup() {
        List<Manager> managers = managerController.getManagers();
        return managers;
    }
//
//    @GetMapping("/leave-request-cancled")
//    public void cancelRequest(@RequestParam int id) {
//        leaveController.setStatusById(id, "Canceled");
//        Manager manager = managerController.getCurrentManager();
//        manager.setHandledRequests(leaveController.getLeaveRequestsList());
//    }
}
