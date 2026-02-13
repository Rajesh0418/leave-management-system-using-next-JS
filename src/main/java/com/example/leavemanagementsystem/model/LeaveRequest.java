package com.example.leavemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String type;

    @Getter @Setter
    private LocalDate startDate;

    @Getter @Setter
    private LocalDate endDate;

    @Getter @Setter
    private String reason;

    @Getter @Setter
    private int sick;

    @Getter @Setter
    private int casual;

    @Getter @Setter
    private int vacation;

    @Getter @Setter
    private String status; // PENDING, APPROVED, REJECTED

    // LeaveRequest -> Employee

    @Getter @Setter
    private int mid;

    @Getter @Setter
    private int eid;



    @ManyToOne
        @JoinColumn(name = "employee_id")
        private Employee employee;

        @ManyToOne
        @JoinColumn(name = "manager_id")
        private Manager manager;

        @JsonIgnore
        public Employee getEmployee() {
            return employee;
        }
        public void setEmployee(Employee employee) {
            this.employee = employee;
        }

        @JsonIgnore
        public Manager getManager() {
            return manager;
        }
        public void setManager(Manager manager) {
            this.manager = manager;
        }

}
