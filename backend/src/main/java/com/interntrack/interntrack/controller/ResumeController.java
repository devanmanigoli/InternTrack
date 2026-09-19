package com.interntrack.interntrack.controller;

import com.interntrack.interntrack.entity.Resume;
import com.interntrack.interntrack.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<List<Resume>> getAll(
            Authentication authentication) {

        return ResponseEntity.ok(
                resumeService.getAll(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Resume> create(
            @Valid @RequestBody Resume resume,
            Authentication authentication) {

        return ResponseEntity.status(HttpStatus.CREATED).body(
                resumeService.create(
                        resume,
                        authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resume> update(
            @PathVariable Long id,
            @Valid @RequestBody Resume resume,
            Authentication authentication) {

        return ResponseEntity.ok(
                resumeService.update(
                        id,
                        resume,
                        authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            Authentication authentication) {

        resumeService.delete(id, authentication.getName());

        return ResponseEntity.noContent().build();
    }
}