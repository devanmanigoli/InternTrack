package com.interntrack.interntrack.controller;

import com.interntrack.interntrack.dto.DashboardResponse;
import com.interntrack.interntrack.entity.Application;
import com.interntrack.interntrack.entity.Interview;
import com.interntrack.interntrack.entity.User;
import com.interntrack.interntrack.repository.ApplicationRepository;
import com.interntrack.interntrack.repository.InterviewRepository;
import com.interntrack.interntrack.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;

    public DashboardController(
            UserRepository userRepository,
            ApplicationRepository applicationRepository,
            InterviewRepository interviewRepository) {

        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.interviewRepository = interviewRepository;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(
            Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();

        List<Application> applications =
                applicationRepository.findByUserId(user.getId());

        List<Interview> interviews =
                interviewRepository.findByUserId(user.getId());

        long applied = count(applications, "applied");
        long interviewing = count(applications, "interviewing");
        long selected = count(applications, "selected");
        long rejected = count(applications, "rejected");

        return ResponseEntity.ok(
                new DashboardResponse(
                        applications.size(),
                        applied,
                        interviewing,
                        selected,
                        rejected,
                        interviews.size()
                )
        );
    }

    private long count(
            List<Application> applications,
            String status) {

        return applications.stream()
                .filter(a -> a.getStatus() != null)
                .filter(a -> a.getStatus().equalsIgnoreCase(status))
                .count();
    }
}