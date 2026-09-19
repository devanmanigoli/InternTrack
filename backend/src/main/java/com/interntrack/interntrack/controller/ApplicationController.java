package com.interntrack.interntrack.controller;

import com.interntrack.interntrack.entity.Application;
import com.interntrack.interntrack.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplications(
            Authentication authentication) {

        return ResponseEntity.ok(
                applicationService.getApplications(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                applicationService.getApplication(
                        id,
                        authentication.getName()
                )
        );
    }

    @PostMapping
    public ResponseEntity<Application> createApplication(
            @Valid @RequestBody Application application,
            Authentication authentication) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        applicationService.createApplication(
                                application,
                                authentication.getName()
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody Application application,
            Authentication authentication) {

        return ResponseEntity.ok(
                applicationService.updateApplication(
                        id,
                        application,
                        authentication.getName()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id,
            Authentication authentication) {

        applicationService.deleteApplication(
                id,
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}