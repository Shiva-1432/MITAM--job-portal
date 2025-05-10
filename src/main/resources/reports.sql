-- Procedure to generate job market analysis report
CREATE OR ALTER PROCEDURE sp_GenerateJobMarketReport
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @StartDate = ISNULL(@StartDate, DATEADD(month, -6, GETDATE()));
    SET @EndDate = ISNULL(@EndDate, GETDATE());
    
    -- Job posting trends
    SELECT 
        DATEPART(year, posted_date) AS year,
        DATEPART(month, posted_date) AS month,
        COUNT(*) AS job_count,
        AVG(CAST(REPLACE(REPLACE(SUBSTRING(salary, 1, CHARINDEX('-', salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2))) AS avg_salary
    FROM jobs
    WHERE posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY DATEPART(year, posted_date), DATEPART(month, posted_date)
    ORDER BY year, month;
    
    -- Most in-demand skills
    SELECT 
        skill,
        COUNT(*) AS demand_count,
        AVG(CAST(REPLACE(REPLACE(SUBSTRING(j.salary, 1, CHARINDEX('-', j.salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2))) AS avg_salary
    FROM job_skills js
    JOIN jobs j ON js.job_id = j.id
    WHERE j.posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY skill
    ORDER BY demand_count DESC;
    
    -- Location analysis
    SELECT 
        location,
        COUNT(*) AS job_count,
        AVG(CAST(REPLACE(REPLACE(SUBSTRING(salary, 1, CHARINDEX('-', salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2))) AS avg_salary
    FROM jobs
    WHERE posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY location
    ORDER BY job_count DESC;
    
    -- Company size distribution
    SELECT 
        company_size,
        COUNT(*) AS job_count,
        AVG(CAST(REPLACE(REPLACE(SUBSTRING(salary, 1, CHARINDEX('-', salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2))) AS avg_salary
    FROM jobs
    WHERE posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY company_size
    ORDER BY job_count DESC;
END
GO

-- Procedure to generate application success report
CREATE OR ALTER PROCEDURE sp_GenerateApplicationSuccessReport
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @StartDate = ISNULL(@StartDate, DATEADD(month, -6, GETDATE()));
    SET @EndDate = ISNULL(@EndDate, GETDATE());
    
    -- Application success rate by job level
    SELECT 
        j.level,
        COUNT(*) AS total_applications,
        SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        CAST(SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS success_rate
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.level
    ORDER BY success_rate DESC;
    
    -- Application success rate by company size
    SELECT 
        j.company_size,
        COUNT(*) AS total_applications,
        SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        CAST(SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS success_rate
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.company_size
    ORDER BY success_rate DESC;
    
    -- Average time to acceptance
    SELECT 
        AVG(DATEDIFF(day, ja.applied_date, ja.last_updated)) AS avg_days_to_acceptance
    FROM job_applications ja
    WHERE ja.status = 'ACCEPTED'
    AND ja.applied_date BETWEEN @StartDate AND @EndDate;
    
    -- Application status distribution
    SELECT 
        status,
        COUNT(*) AS count,
        CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM job_applications WHERE applied_date BETWEEN @StartDate AND @EndDate) AS DECIMAL(5,2)) AS percentage
    FROM job_applications
    WHERE applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY status
    ORDER BY count DESC;
END
GO

-- Procedure to generate employer performance report
CREATE OR ALTER PROCEDURE sp_GenerateEmployerPerformanceReport
    @EmployerId BIGINT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @StartDate = ISNULL(@StartDate, DATEADD(month, -6, GETDATE()));
    SET @EndDate = ISNULL(@EndDate, GETDATE());
    
    -- Job posting performance
    SELECT 
        j.title,
        j.posted_date,
        COUNT(ja.id) AS application_count,
        SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        AVG(DATEDIFF(day, j.posted_date, ja.applied_date)) AS avg_days_to_application
    FROM jobs j
    LEFT JOIN job_applications ja ON j.id = ja.job_id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId)
    AND j.posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.id, j.title, j.posted_date
    ORDER BY j.posted_date DESC;
    
    -- Application processing time
    SELECT 
        AVG(DATEDIFF(day, ja.applied_date, ja.last_updated)) AS avg_processing_time
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId)
    AND ja.applied_date BETWEEN @StartDate AND @EndDate;
    
    -- Candidate quality metrics
    SELECT 
        j.title,
        COUNT(DISTINCT ja.user_id) AS unique_candidates,
        AVG(CAST(REPLACE(REPLACE(SUBSTRING(j.salary, 1, CHARINDEX('-', j.salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2))) AS avg_salary,
        COUNT(CASE WHEN ja.status = 'INTERVIEW' THEN 1 END) AS interview_count,
        COUNT(CASE WHEN ja.status = 'ACCEPTED' THEN 1 END) AS accepted_count
    FROM jobs j
    LEFT JOIN job_applications ja ON j.id = ja.job_id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId)
    AND j.posted_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.id, j.title
    ORDER BY unique_candidates DESC;
END
GO

-- Procedure to generate job seeker success report
CREATE OR ALTER PROCEDURE sp_GenerateJobSeekerSuccessReport
    @JobSeekerId BIGINT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @StartDate = ISNULL(@StartDate, DATEADD(month, -6, GETDATE()));
    SET @EndDate = ISNULL(@EndDate, GETDATE());
    
    -- Application success metrics
    SELECT 
        COUNT(*) AS total_applications,
        SUM(CASE WHEN status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        SUM(CASE WHEN status = 'INTERVIEW' THEN 1 ELSE 0 END) AS interview_count,
        CAST(SUM(CASE WHEN status = 'ACCEPTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS success_rate
    FROM job_applications
    WHERE user_id = @JobSeekerId
    AND applied_date BETWEEN @StartDate AND @EndDate;
    
    -- Application trends
    SELECT 
        DATEPART(year, applied_date) AS year,
        DATEPART(month, applied_date) AS month,
        COUNT(*) AS application_count,
        SUM(CASE WHEN status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count
    FROM job_applications
    WHERE user_id = @JobSeekerId
    AND applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY DATEPART(year, applied_date), DATEPART(month, applied_date)
    ORDER BY year, month;
    
    -- Success by job level
    SELECT 
        j.level,
        COUNT(*) AS total_applications,
        SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        CAST(SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS success_rate
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.user_id = @JobSeekerId
    AND ja.applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.level
    ORDER BY success_rate DESC;
    
    -- Success by company size
    SELECT 
        j.company_size,
        COUNT(*) AS total_applications,
        SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS accepted_count,
        CAST(SUM(CASE WHEN ja.status = 'ACCEPTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS success_rate
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.user_id = @JobSeekerId
    AND ja.applied_date BETWEEN @StartDate AND @EndDate
    GROUP BY j.company_size
    ORDER BY success_rate DESC;
END
GO 