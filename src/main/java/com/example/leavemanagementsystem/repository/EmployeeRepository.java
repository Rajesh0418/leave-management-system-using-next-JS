package com.example.leavemanagementsystem.repository;

import com.example.leavemanagementsystem.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>{
//    @Query("SELECT * FROM employee e WHERE e.email = : email and e.password=:password")
//    Optional<Employee> findOneUser(@Param("email") String email, @Param("password") String password);

    Optional<Employee> findByEmail(String email);
}
