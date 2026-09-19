package com.interntrack.interntrack.dto;

import java.util.List;

public class JobMatchResponse {

    private int matchScore;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String recommendation;

    public JobMatchResponse() {}

    public JobMatchResponse(
            int matchScore,
            List<String> matchedSkills,
            List<String> missingSkills,
            String recommendation) {

        this.matchScore = matchScore;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.recommendation = recommendation;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}