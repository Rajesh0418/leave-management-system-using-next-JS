package com.example.leavemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class Manager extends User {

    @JsonIgnore
    @Getter
    @Setter
    private String login;

    // Manager -> Employees
    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    @JsonIgnore
    @Getter @Setter
    private List<Employee> teamMembers;

    // Manager -> Leave Requests
    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    @JsonIgnore
    @Getter @Setter
    private List<LeaveRequest> handledRequests;
}

