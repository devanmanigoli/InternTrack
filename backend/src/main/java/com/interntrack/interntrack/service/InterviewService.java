package com.interntrack.interntrack.service;

import com.interntrack.interntrack.entity.Interview;
import com.interntrack.interntrack.entity.User;
import com.interntrack.interntrack.repository.InterviewRepository;
import com.interntrack.interntrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            UserRepository userRepository) {
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
    }

    public List<Interview> getAll(String email) {
        User user = getUser(email);
        return interviewRepository.findByUserId(user.getId());
    }

    public Interview getById(Long id, String email) {
        User user = getUser(email);

        return interviewRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Interview not found"));
    }

    public Interview create(Interview interview, String email) {
        User user = getUser(email);
        interview.setUser(user);
        return interviewRepository.save(interview);
    }

    public Interview update(
            Long id,
            Interview updated,
            String email) {

        Interview interview = getById(id, email);

        interview.setApplicationId(updated.getApplicationId());
        interview.setCompany(updated.getCompany());
        interview.setRole(updated.getRole());
        interview.setInterviewDate(updated.getInterviewDate());
        interview.setInterviewTime(updated.getInterviewTime());
        interview.setInterviewType(updated.getInterviewType());
        interview.setInterviewer(updated.getInterviewer());
        interview.setLocation(updated.getLocation());
        interview.setNotes(updated.getNotes());
        interview.setStatus(updated.getStatus());

        return interviewRepository.save(interview);
    }

    public void delete(Long id, String email) {
        interviewRepository.delete(getById(id, email));
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));
    }
}