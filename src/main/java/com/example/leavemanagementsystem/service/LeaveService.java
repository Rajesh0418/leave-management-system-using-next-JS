package com.example.leavemanagementsystem.service;

import com.example.leavemanagementsystem.model.LeaveRequest;
import com.example.leavemanagementsystem.repository.LeaveRequestRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Getter @Setter
    List<LeaveRequest> requestsList;

    @Autowired
    LeaveRequestRepository leaveRequestRepository;

    // saving employee leave request
    public LeaveRequest addLeaveRequest(LeaveRequest leaveRequest) {
        requestsList.add(leaveRequest);        // if you still need this
        return leaveRequestRepository.save(leaveRequest);  // return saved
    }


    // getting leave request by emp ID for displaying at emp dashboard
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(int id) {
        requestsList = leaveRequestRepository.findByEmployee_Id(id);
        return requestsList;
    }

    //getting all leave requests
    public List<LeaveRequest> getLeaveRequestsList() {
        return requestsList;
    }


    //manager
    // leave approval or rejected by manager id
    public void setStatusById(int id,String status) {
        LeaveRequest leaveRequest=leaveRequestRepository.findById(id).orElse(null);
        if(leaveRequest!=null) {
            leaveRequest.setStatus(status);
            leaveRequestRepository.save(leaveRequest);
        }
    }

    // getting leave request by emp ID for displaying at manager dashboard
    public List<LeaveRequest> getLeaveRequestsByManagerId(int id) {
        requestsList = leaveRequestRepository.findByManager_Id(id);
        return requestsList;
    }

    public void cancelRequst(int id) {
        requestsList = leaveRequestRepository.findByManager_Id(id);
        leaveRequestRepository.deleteById(id);
    }

    public void setCasual(int id) {
        for(LeaveRequest leaveRequest1:requestsList) {
            if (leaveRequest1.getId() == id) {
                leaveRequest1.setCasual(leaveRequest1.getCasual()-1);
                leaveRequestRepository.save(leaveRequest1);
                break;
            }
        }
    }

    public List<LeaveRequest> getLeavesByEmployeeId(int id) {
        return leaveRequestRepository.findByEmployee_Id(id);
    }

    public LeaveRequest saveTheData(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeavesByManagerId(int id) {
        return leaveRequestRepository.findByManager_Id(id);
    }
}
