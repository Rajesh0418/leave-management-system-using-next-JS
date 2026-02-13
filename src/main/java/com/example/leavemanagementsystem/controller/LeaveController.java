package com.example.leavemanagementsystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.leavemanagementsystem.model.LeaveRequest;
import com.example.leavemanagementsystem.service.EmployeeService;
import com.example.leavemanagementsystem.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RequestMapping("/leave")
@Controller
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @Autowired
    private EmployeeService employeeService;

    // Adding leave request to db when employee submits his leave request
    @GetMapping("/add-leave-request")
    @ResponseBody
    public ResponseEntity<LeaveRequest> addLeaveRequest(LeaveRequest leaveRequest) {
        LeaveRequest saved = leaveService.addLeaveRequest(leaveRequest);
        return ResponseEntity.ok(saved);  // returns JSON of saved entity
    }


    // displaying for emp dashboard
    @ResponseBody
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(int id) {
        return leaveService.getLeaveRequestsByEmployeeId(id);
    }

    // leave requests list
    public List<LeaveRequest> getLeaveRequestsList() {
        return leaveService.getLeaveRequestsList();
    }

    // displaying for manager dashboard
    @ResponseBody
    public List<LeaveRequest> getLeaveRequestsByManagerId(int id) {
        return leaveService.getLeaveRequestsByManagerId(id);
    }

    // updating status PENDING - ACCEPTED -  REJECTED
    public void setStatusById(int id,String status) {
        leaveService.setStatusById(id,status);
        //leaveService.setCasual(id);
    }

    public void cancelRequest(int id) {
        leaveService.cancelRequst(id);
    }

    @ResponseBody
    public List<LeaveRequest> getLeavesByEmployeeId(int id) {
            return leaveService.getLeavesByEmployeeId(id);
    }

    public void setLeaveList(List<LeaveRequest> leaveRequests) {
        leaveService.setRequestsList(leaveRequests);
    }

    public void saveTheData(LeaveRequest leaveRequest) {
        leaveService.saveTheData(leaveRequest);
    }

    @ResponseBody
    public List<LeaveRequest> getLeavesByManagerId(int id) {return leaveService.getLeavesByManagerId(id);
    }
}
