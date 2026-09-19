package com.interntrack.interntrack.service;

import com.interntrack.interntrack.entity.Application;
import com.interntrack.interntrack.entity.User;
import com.interntrack.interntrack.repository.ApplicationRepository;
import com.interntrack.interntrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    public List<Application> getApplications(String email) {

        User user = getUser(email);

        return applicationRepository.findByUserId(user.getId());
    }

    public Application getApplication(Long id, String email) {

        User user = getUser(email);

        return applicationRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Application not found"
                        ));
    }

    public Application createApplication(
            Application application,
            String email) {

        User user = getUser(email);

        application.setUser(user);

        return applicationRepository.save(application);
    }

    public Application updateApplication(
            Long id,
            Application updatedApplication,
            String email) {

        Application existing = getApplication(id, email);

        existing.setCompany(updatedApplication.getCompany());
        existing.setRole(updatedApplication.getRole());
        existing.setStatus(updatedApplication.getStatus());
        existing.setLocation(updatedApplication.getLocation());
        existing.setApplicationDate(
                updatedApplication.getApplicationDate()
        );

        return applicationRepository.save(existing);
    }

    public void deleteApplication(Long id, String email) {

        Application application = getApplication(id, email);

        applicationRepository.delete(application);
    }

    private User getUser(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        ));
    }
}