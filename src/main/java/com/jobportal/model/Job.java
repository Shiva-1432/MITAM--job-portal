package com.jobportal.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    @ElementCollection
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> skills;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String salary;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private String type;

    @Column(name = "posted_date", nullable = false)
    private LocalDateTime postedDate;

    @Column(name = "deadline_date", nullable = false)
    private LocalDateTime deadlineDate;

    @Column(name = "company_logo")
    private String companyLogo;

    @Column(name = "job_image")
    private String jobImage;

    @Column
    private String about;

    @ElementCollection
    @CollectionTable(name = "job_responsibilities", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "responsibility")
    private List<String> responsibilities;

    @ElementCollection
    @CollectionTable(name = "job_requirements", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "requirement")
    private List<String> requirements;

    @ElementCollection
    @CollectionTable(name = "job_benefits", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "benefit")
    private List<String> benefits;

    @Column(name = "company_size")
    private String companySize;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 