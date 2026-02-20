package com.example.leavemanagementsystem.controller;


import com.example.leavemanagementsystem.model.Employee;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.leavemanagementsystem.model.LeaveRequest;
import com.example.leavemanagementsystem.model.Manager;
import com.example.leavemanagementsystem.service.EmployeeService;
import com.example.leavemanagementsystem.service.ManagerService;
import jakarta.servlet.Servlet;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("/manager") // correct
@Controller
public class ManagerController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    DepartmentController departmentController;

    @Autowired
    ManagerService managerService;

    @Autowired
    LeaveController leaveController;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private Servlet servlet;


    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Manager> login(@RequestBody Manager managerData) {

        System.out.println(managerData.getLogin() +" "+managerData.getPassword());
        Manager manager = managerService.authenticate(
                managerData.getLogin(),
                managerData.getPassword()
        );

        if (manager == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println(manager.toString());

        return ResponseEntity.ok(manager);
    }


    public boolean userLoggedInStatus() {
        return managerService.getCurrentManager() == null;// not logged in
    }

    @GetMapping("/home")
    public String home() {
        if (userLoggedInStatus()) {
            return "redirect:/managerLogin.html"; // not logged in
        }
        return "/manager/dashboard";  // safe to show
    }

    // saving the manager data
    @PostMapping("/add-manager")
    @ResponseBody
    public ResponseEntity<String> addManager(@RequestBody Manager userdata) {
        managerService.addManager(userdata);
        return ResponseEntity.ok("Employee added successfully");

    }

    // displaying the emp count and dept count on dashboard
    @GetMapping("/dashboard")
    public String managerDashboard(Model model) {
        int empCount = employeeService.getEmployeeCount(); // from DB
        int deptCount = departmentController.getDepartmentCount();
        model.addAttribute("empCount", empCount);
        model.addAttribute("deptCount", deptCount);
        return "/manager/dashboard";
    }

    @GetMapping("/manager-login")
    public String managerLogin() {
        return "redirect:/managerLogin.html";
    }

    // business logic for new password
    @PostMapping("/new-password")
    public String setNewPassword(String password, HttpSession session) {
        managerService.setNewPassword(password);
        Manager employee = managerService.getCurrentManager();
        session.setAttribute("employeeData", employee);
        return "/manager/managerProfile";
    }

    // navigating to change password page
    @GetMapping("/change-password")
    public String changePassword() {
        return "/manager/managerChangePassword";
    }

    // navigating to manager profile
    @GetMapping("/manager-profile")
    public String managerProfile() {
        return "/manager/managerProfile";
    }


    // whose emp is assigned to the manager that emp requests will be fetched
    @GetMapping("/employee-leave-list")
    public String employeeLeaveRequestStatus(HttpSession session) {
        Manager manager = managerService.getCurrentManager();
        if (manager == null) {
            return "redirect:/manager/manager-login";
        }
        manager.setHandledRequests(leaveController.getLeaveRequestsByManagerId(manager.getId()));
        List<LeaveRequest> leaveRequestHandlerList = manager.getHandledRequests();
        session.setAttribute("userdata", manager);
        session.setAttribute("leaveRequestsHandler", leaveRequestHandlerList);
        return "/manager/managerLeaveResponseStatus";
    }

    @GetMapping("/leave-request-accepted")
    @ResponseBody
    public ResponseEntity<List<LeaveRequest>> submitLeaveRequestAccepted(
            @RequestParam int id,
            @RequestParam int managerId
    ) {
        leaveController.setStatusById(id, "Accepted");
        List<LeaveRequest> leaves = leaveController.getLeavesByManagerId(managerId);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/leave-request-rejected")
    @ResponseBody
    public ResponseEntity<List<LeaveRequest>> submitLeaveRequestRejected(
            @RequestParam int id,
            @RequestParam int managerId
    ) {
        leaveController.setStatusById(id, "Rejected");
        List<LeaveRequest> leaves = leaveController.getLeavesByManagerId(managerId);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/leave-request-cancled")
    @ResponseBody
    public ResponseEntity<List<LeaveRequest>> cancelRequest(
            @RequestParam int id,
            @RequestParam int managerId
    ) {
        System.out.println(id+" adfasdf "+managerId);
        leaveController.setStatusById(id, "Canceled");
        List<LeaveRequest> leaves = leaveController.getLeavesByManagerId(managerId);
        return ResponseEntity.ok(leaves);
    }

    // getting managers list for displaying it in emp signup page
    @ResponseBody
    public List<Manager> getManagers() {
        return managerService.getManagers();
    }


    // getting manager data by id
    @ResponseBody
    public Manager getManagerById(int managerId) {
        return managerService.getManagerById(managerId);
    }

    public Manager getCurrentManager() {
        return managerService.getCurrentManager();
    }

//    @GetMapping("/leaverequests")
//    @ResponseBody
//    public ResponseEntity<List<LeaveRequest>> getLeavesByManagerId(@RequestParam int id) {
//        List<LeaveRequest> leaves = leaveController.getLeavesByManagerId(id);
//        System.out.println(leaves);
//        return ResponseEntity.ok(leaves);
//    }

    @GetMapping("/leaverequests/{id}")
    @ResponseBody
    public ResponseEntity<List<LeaveRequest>> getLeavesByManager(@PathVariable int id) {
        List<LeaveRequest> leaves = leaveController.getLeavesByManagerId(id);
        return ResponseEntity.ok(leaves);
    }

    public Manager findManager(int mid) {
        return managerService.findManager(mid);
    }
}


