package com.interntrack.interntrack.controller;

import com.interntrack.interntrack.entity.Interview;
import com.interntrack.interntrack.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getAll(
            Authentication authentication) {

        return ResponseEntity.ok(
                interviewService.getAll(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getById(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                interviewService.getById(
                        id,
                        authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Interview> create(
            @Valid @RequestBody Interview interview,
            Authentication authentication) {

        return ResponseEntity.status(HttpStatus.CREATED).body(
                interviewService.create(
                        interview,
                        authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interview> update(
            @PathVariable Long id,
            @Valid @RequestBody Interview interview,
            Authentication authentication) {

        return ResponseEntity.ok(
                interviewService.update(
                        id,
                        interview,
                        authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            Authentication authentication) {

        interviewService.delete(
                id,
                authentication.getName());

        return ResponseEntity.noContent().build();
    }
}