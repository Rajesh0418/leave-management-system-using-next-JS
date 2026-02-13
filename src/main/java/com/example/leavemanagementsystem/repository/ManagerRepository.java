package com.example.leavemanagementsystem.repository;

import com.example.leavemanagementsystem.model.Employee;
import com.example.leavemanagementsystem.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager,Integer>{
    Optional<Manager> findByEmail(String email);

    Manager findManagerBy(int mid);
}
