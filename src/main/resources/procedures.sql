-- Procedure to search jobs with filters
CREATE OR ALTER PROCEDURE sp_SearchJobs
    @Keyword NVARCHAR(255) = NULL,
    @Location NVARCHAR(255) = NULL,
    @Level NVARCHAR(50) = NULL,
    @Type NVARCHAR(50) = NULL,
    @CompanySize NVARCHAR(50) = NULL,
    @MinSalary DECIMAL(18,2) = NULL,
    @MaxSalary DECIMAL(18,2) = NULL,
    @Skills NVARCHAR(MAX) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
    
    -- Create temporary table for skills
    CREATE TABLE #Skills (Skill NVARCHAR(255));
    IF @Skills IS NOT NULL
    BEGIN
        INSERT INTO #Skills
        SELECT value FROM STRING_SPLIT(@Skills, ',');
    END
    
    -- Main query with filters
    SELECT 
        j.*,
        COUNT(*) OVER() AS TotalCount
    FROM jobs j
    LEFT JOIN job_skills js ON j.id = js.job_id
    LEFT JOIN #Skills s ON js.skill = s.Skill
    WHERE j.is_active = 1
        AND (@Keyword IS NULL 
            OR CONTAINS(j.title, @Keyword)
            OR CONTAINS(j.company, @Keyword)
            OR CONTAINS(j.description, @Keyword))
        AND (@Location IS NULL OR j.location LIKE '%' + @Location + '%')
        AND (@Level IS NULL OR j.level = @Level)
        AND (@Type IS NULL OR j.type = @Type)
        AND (@CompanySize IS NULL OR j.company_size = @CompanySize)
        AND (@MinSalary IS NULL OR CAST(REPLACE(REPLACE(SUBSTRING(j.salary, 1, CHARINDEX('-', j.salary) - 1), '$', ''), ',', '') AS DECIMAL(18,2)) >= @MinSalary)
        AND (@MaxSalary IS NULL OR CAST(REPLACE(REPLACE(SUBSTRING(j.salary, CHARINDEX('-', j.salary) + 1, LEN(j.salary)), '$', ''), ',', '') AS DECIMAL(18,2)) <= @MaxSalary)
        AND (@Skills IS NULL OR s.Skill IS NOT NULL)
    GROUP BY j.id, j.title, j.company, j.location, j.description, j.salary, j.level, j.type, 
             j.posted_date, j.deadline_date, j.company_logo, j.job_image, j.about, j.company_size, 
             j.is_active, j.created_at, j.updated_at
    ORDER BY j.posted_date DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    
    DROP TABLE #Skills;
END
GO

-- Procedure to get job details with related information
CREATE OR ALTER PROCEDURE sp_GetJobDetails
    @JobId BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get job details
    SELECT * FROM jobs WHERE id = @JobId;
    
    -- Get job skills
    SELECT skill FROM job_skills WHERE job_id = @JobId;
    
    -- Get job responsibilities
    SELECT responsibility FROM job_responsibilities WHERE job_id = @JobId;
    
    -- Get job requirements
    SELECT requirement FROM job_requirements WHERE job_id = @JobId;
    
    -- Get job benefits
    SELECT benefit FROM job_benefits WHERE job_id = @JobId;
    
    -- Get application count
    SELECT COUNT(*) AS application_count FROM job_applications WHERE job_id = @JobId;
END
GO

-- Procedure to get user profile with skills
CREATE OR ALTER PROCEDURE sp_GetUserProfile
    @UserId BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get user details
    SELECT 
        u.*,
        STRING_AGG(us.skill, ', ') AS skills
    FROM users u
    LEFT JOIN user_skills us ON u.id = us.user_id
    WHERE u.id = @UserId
    GROUP BY u.id, u.email, u.password, u.first_name, u.last_name, u.phone, u.location,
             u.profile_picture, u.resume, u.education, u.experience, u.bio, u.role,
             u.is_active, u.created_at, u.updated_at;
    
    -- Get user's job applications
    SELECT 
        ja.*,
        j.title AS job_title,
        j.company AS company_name
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.user_id = @UserId
    ORDER BY ja.applied_date DESC;
END
GO

-- Procedure to get employer dashboard statistics
CREATE OR ALTER PROCEDURE sp_GetEmployerDashboard
    @EmployerId BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get total posted jobs
    SELECT COUNT(*) AS total_jobs
    FROM jobs
    WHERE company IN (SELECT company FROM users WHERE id = @EmployerId);
    
    -- Get active jobs
    SELECT COUNT(*) AS active_jobs
    FROM jobs
    WHERE company IN (SELECT company FROM users WHERE id = @EmployerId)
    AND is_active = 1;
    
    -- Get total applications
    SELECT COUNT(*) AS total_applications
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId);
    
    -- Get applications by status
    SELECT 
        status,
        COUNT(*) AS count
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId)
    GROUP BY status;
    
    -- Get recent applications
    SELECT TOP 5
        ja.*,
        j.title AS job_title,
        u.first_name + ' ' + u.last_name AS applicant_name
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    JOIN users u ON ja.user_id = u.id
    WHERE j.company IN (SELECT company FROM users WHERE id = @EmployerId)
    ORDER BY ja.applied_date DESC;
END
GO

-- Procedure to get job seeker dashboard statistics
CREATE OR ALTER PROCEDURE sp_GetJobSeekerDashboard
    @JobSeekerId BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get total applications
    SELECT COUNT(*) AS total_applications
    FROM job_applications
    WHERE user_id = @JobSeekerId;
    
    -- Get applications by status
    SELECT 
        status,
        COUNT(*) AS count
    FROM job_applications
    WHERE user_id = @JobSeekerId
    GROUP BY status;
    
    -- Get recent applications
    SELECT TOP 5
        ja.*,
        j.title AS job_title,
        j.company AS company_name
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.user_id = @JobSeekerId
    ORDER BY ja.applied_date DESC;
    
    -- Get recommended jobs based on skills
    SELECT DISTINCT TOP 5
        j.*
    FROM jobs j
    JOIN job_skills js ON j.id = js.job_id
    JOIN user_skills us ON js.skill = us.skill
    WHERE us.user_id = @JobSeekerId
    AND j.is_active = 1
    AND j.deadline_date > GETDATE()
    ORDER BY j.posted_date DESC;
END
GO 