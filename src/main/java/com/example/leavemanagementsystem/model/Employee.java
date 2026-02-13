package com.example.leavemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "employee")
public class Employee extends User {

    @Getter
    @Setter
    private String department;

    @Getter @Setter
    private int vacationDays;

    @Getter @Setter
    private int sickDays;

    @Getter @Setter
    private int casualLeaveDays;

    @Transient
    @Getter @Setter// VERY IMPORTANT
    private Integer managerId;

    // Many employees belong to one manager
    @ManyToOne
    @JoinColumn(name = "manager_id")
    @Getter @Setter
    @JsonIgnore
    private Manager manager;

    // Employee -> Leave Requests
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @Getter @Setter
    private List<LeaveRequest> leaveRequests;
}
