package com.interntrack.interntrack.dto;

public class DashboardResponse {

    private long totalApplications;
    private long applied;
    private long interviewing;
    private long selected;
    private long rejected;
    private long totalInterviews;

    public DashboardResponse() {}

    public DashboardResponse(
            long totalApplications,
            long applied,
            long interviewing,
            long selected,
            long rejected,
            long totalInterviews) {

        this.totalApplications = totalApplications;
        this.applied = applied;
        this.interviewing = interviewing;
        this.selected = selected;
        this.rejected = rejected;
        this.totalInterviews = totalInterviews;
    }

    public long getTotalApplications() { return totalApplications; }
    public long getApplied() { return applied; }
    public long getInterviewing() { return interviewing; }
    public long getSelected() { return selected; }
    public long getRejected() { return rejected; }
    public long getTotalInterviews() { return totalInterviews; }
}