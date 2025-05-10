package com.jobportal.repository;

import com.jobportal.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    List<Job> findByIsActiveTrue();
    
    List<Job> findByTitleContainingIgnoreCase(String title);
    
    List<Job> findByCompanyContainingIgnoreCase(String company);
    
    List<Job> findByLocationContainingIgnoreCase(String location);
    
    List<Job> findByLevel(String level);
    
    List<Job> findByType(String type);
    
    @Query("SELECT j FROM Job j WHERE j.salary LIKE %:salaryRange%")
    List<Job> findBySalaryRange(@Param("salaryRange") String salaryRange);
    
    @Query("SELECT j FROM Job j WHERE j.companySize LIKE %:companySize%")
    List<Job> findByCompanySize(@Param("companySize") String companySize);
    
    @Query("SELECT j FROM Job j WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Job> searchJobs(@Param("keyword") String keyword);
    
    @Query("SELECT j FROM Job j WHERE j.skills IN :skills")
    List<Job> findBySkills(@Param("skills") List<String> skills);
    
    @Query("SELECT j FROM Job j WHERE j.deadlineDate > CURRENT_TIMESTAMP AND j.isActive = true")
    List<Job> findActiveJobs();
    
    @Query("SELECT j FROM Job j WHERE j.postedDate >= :date AND j.isActive = true")
    List<Job> findRecentJobs(@Param("date") java.time.LocalDateTime date);
} 