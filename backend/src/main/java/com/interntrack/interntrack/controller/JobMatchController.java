package com.interntrack.interntrack.controller;

import com.interntrack.interntrack.dto.JobMatchRequest;
import com.interntrack.interntrack.dto.JobMatchResponse;
import com.interntrack.interntrack.service.JobMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-match")
@CrossOrigin
public class JobMatchController {

    private final JobMatchService jobMatchService;

    public JobMatchController(JobMatchService jobMatchService) {
        this.jobMatchService = jobMatchService;
    }

    @PostMapping
    public ResponseEntity<JobMatchResponse> match(
            @RequestBody JobMatchRequest request) {

        return ResponseEntity.ok(
                jobMatchService.match(request));
    }
}