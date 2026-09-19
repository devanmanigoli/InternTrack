package com.interntrack.interntrack.service;

import com.interntrack.interntrack.dto.JobMatchRequest;
import com.interntrack.interntrack.dto.JobMatchResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JobMatchService {

    private final List<String> skills = Arrays.asList(
            "java",
            "python",
            "c",
            "c++",
            "javascript",
            "typescript",
            "react",
            "angular",
            "vue",
            "html",
            "css",
            "spring",
            "spring boot",
            "spring security",
            "hibernate",
            "jpa",
            "rest api",
            "mysql",
            "postgresql",
            "mongodb",
            "sql",
            "git",
            "github",
            "docker",
            "kubernetes",
            "aws",
            "azure",
            "microservices",
            "redis",
            "kafka",
            "maven",
            "linux",
            "data structures",
            "algorithms",
            "dsa"
    );

    public JobMatchResponse match(JobMatchRequest request) {

        String resume = request.getResumeText() == null
                ? ""
                : request.getResumeText().toLowerCase();

        String job = request.getJobDescription() == null
                ? ""
                : request.getJobDescription().toLowerCase();

        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String skill : skills) {
            if (job.contains(skill)) {
                if (resume.contains(skill)) {
                    matched.add(skill);
                } else {
                    missing.add(skill);
                }
            }
        }

        int total = matched.size() + missing.size();

        int score = total == 0
                ? 0
                : (matched.size() * 100) / total;

        String recommendation;

        if (score >= 80) {
            recommendation = "Strong match. Your resume covers most required skills.";
        } else if (score >= 60) {
            recommendation = "Good match. Consider adding the missing skills.";
        } else {
            recommendation = "Improve your resume by adding relevant skills and projects.";
        }

        return new JobMatchResponse(
                score,
                matched,
                missing,
                recommendation
        );
    }
}