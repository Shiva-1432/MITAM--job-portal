package com.jobportal.service;

import com.jobportal.model.Job;
import com.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> searchJobs(String keyword) {
        return jobRepository.searchJobs(keyword);
    }

    public List<Job> getJobsByFilters(String title, String company, String location, 
                                    String level, String type, String salaryRange, 
                                    String companySize, List<String> skills) {
        // Implement filter logic based on provided parameters
        if (title != null) {
            return jobRepository.findByTitleContainingIgnoreCase(title);
        }
        if (company != null) {
            return jobRepository.findByCompanyContainingIgnoreCase(company);
        }
        if (location != null) {
            return jobRepository.findByLocationContainingIgnoreCase(location);
        }
        if (level != null) {
            return jobRepository.findByLevel(level);
        }
        if (type != null) {
            return jobRepository.findByType(type);
        }
        if (salaryRange != null) {
            return jobRepository.findBySalaryRange(salaryRange);
        }
        if (companySize != null) {
            return jobRepository.findByCompanySize(companySize);
        }
        if (skills != null && !skills.isEmpty()) {
            return jobRepository.findBySkills(skills);
        }
        
        return getAllJobs();
    }

    public List<Job> getActiveJobs() {
        return jobRepository.findActiveJobs();
    }

    public List<Job> getRecentJobs() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        return jobRepository.findRecentJobs(oneMonthAgo);
    }

    public Job createJob(Job job) {
        job.setPostedDate(LocalDateTime.now());
        job.setActive(true);
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

        job.setTitle(jobDetails.getTitle());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setSkills(jobDetails.getSkills());
        job.setDescription(jobDetails.getDescription());
        job.setSalary(jobDetails.getSalary());
        job.setLevel(jobDetails.getLevel());
        job.setType(jobDetails.getType());
        job.setDeadlineDate(jobDetails.getDeadlineDate());
        job.setCompanyLogo(jobDetails.getCompanyLogo());
        job.setJobImage(jobDetails.getJobImage());
        job.setAbout(jobDetails.getAbout());
        job.setResponsibilities(jobDetails.getResponsibilities());
        job.setRequirements(jobDetails.getRequirements());
        job.setBenefits(jobDetails.getBenefits());
        job.setCompanySize(jobDetails.getCompanySize());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        job.setActive(false);
        jobRepository.save(job);
    }

    public List<Job> getTrendingJobs() {
        // Implement logic to get trending jobs based on views, applications, etc.
        // For now, return recent active jobs
        return getRecentJobs();
    }
} 