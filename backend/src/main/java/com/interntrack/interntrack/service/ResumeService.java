package com.interntrack.interntrack.service;

import com.interntrack.interntrack.entity.Resume;
import com.interntrack.interntrack.entity.User;
import com.interntrack.interntrack.repository.ResumeRepository;
import com.interntrack.interntrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    public List<Resume> getAll(String email) {
        User user = getUser(email);
        return resumeRepository.findByUserId(user.getId());
    }

    public Resume create(Resume resume, String email) {
        User user = getUser(email);
        resume.setUser(user);
        return resumeRepository.save(resume);
    }

    public Resume update(
            Long id,
            Resume updated,
            String email) {

        Resume resume = getById(id, email);

        resume.setTitle(updated.getTitle());
        resume.setFileName(updated.getFileName());
        resume.setFileUrl(updated.getFileUrl());

        return resumeRepository.save(resume);
    }

    public void delete(Long id, String email) {
        resumeRepository.delete(getById(id, email));
    }

    private Resume getById(Long id, String email) {
        User user = getUser(email);

        return resumeRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Resume not found"));
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));
    }
}