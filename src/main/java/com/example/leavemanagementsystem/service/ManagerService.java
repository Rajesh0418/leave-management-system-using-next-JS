package com.example.leavemanagementsystem.service;

import com.example.leavemanagementsystem.model.Employee;
import com.example.leavemanagementsystem.model.Manager;
import com.example.leavemanagementsystem.repository.ManagerRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Service
public class ManagerService {

    @Autowired
    ManagerRepository repo;

    @Getter @Setter
    Manager currentManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    // getting the manager
//    public void findManager(Manager userdata) {
//        currentManager = repo.findAll().stream()
//                .filter(user -> (user.getEmail().equalsIgnoreCase(userdata.getEmail()) &&
//                        user.getPassword().equalsIgnoreCase(userdata.getPassword())
//                ))
//                .findFirst()
//                .orElse(null);
//        System.out.println(currentManager);
//    }

    // saving the data of new manager
    public void addManager(Manager userdata) {
        String encoded = passwordEncoder.encode(userdata.getPassword());
        userdata.setPassword(encoded);
        repo.save(userdata);
    }

    // setting new password for manager
    public void setNewPassword(String password) {
        String encoded = passwordEncoder.encode(password);
        currentManager.setPassword(password);
        repo.save(currentManager);
    }

    // getting list of managers for showcasing to emp signup page
    public List<Manager> getManagers() {
        return repo.findAll();
    }

    //getting manager data by id for assigning to manager_id in emp class member
    public Manager getManagerById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Manager findManager(int mid) {
        return repo.findById(mid).orElse(null);
    }

    public Manager authenticate(String email, String rawPassword) {

        Manager manager = repo.findByEmail(email).orElse(null);

        if (manager == null) return null;

        if (!passwordEncoder.matches(rawPassword, manager.getPassword())) {
            return null;
        }

        return manager;
    }

}
