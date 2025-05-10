package com.jobportal.repository;

import com.jobportal.model.JobApplication;
import com.jobportal.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    
    List<JobApplication> findByJobId(Long jobId);
    
    List<JobApplication> findByUserIdAndStatus(Long userId, ApplicationStatus status);
    
    List<JobApplication> findByJobIdAndStatus(Long jobId, ApplicationStatus status);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId AND ja.status = :status")
    List<JobApplication> findApplicationsByJobAndStatus(
            @Param("jobId") Long jobId,
            @Param("status") ApplicationStatus status);
    
    @Query("SELECT COUNT(ja) FROM JobApplication ja WHERE ja.job.id = :jobId")
    Long countApplicationsByJob(@Param("jobId") Long jobId);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.user.id = :userId AND ja.job.id = :jobId")
    JobApplication findByUserAndJob(@Param("userId") Long userId, @Param("jobId") Long jobId);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.interviewDate IS NOT NULL AND ja.interviewDate > CURRENT_TIMESTAMP")
    List<JobApplication> findUpcomingInterviews();
} 