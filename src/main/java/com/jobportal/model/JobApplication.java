package com.jobportal.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "cover_letter")
    private String coverLetter;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "applied_date", nullable = false)
    private LocalDateTime appliedDate;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Column(name = "employer_notes")
    private String employerNotes;

    @Column(name = "interview_date")
    private LocalDateTime interviewDate;

    @Column(name = "interview_location")
    private String interviewLocation;

    @Column(name = "interview_notes")
    private String interviewNotes;

    @PrePersist
    protected void onCreate() {
        appliedDate = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
} 