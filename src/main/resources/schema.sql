-- Create database if not exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'jobportal')
BEGIN
    CREATE DATABASE jobportal;
END
GO

USE jobportal;
GO

-- Create users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        location VARCHAR(255),
        profile_picture VARCHAR(255),
        resume VARCHAR(255),
        education VARCHAR(MAX),
        experience VARCHAR(MAX),
        bio VARCHAR(MAX),
        role VARCHAR(20) NOT NULL,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Create user_skills table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_skills')
BEGIN
    CREATE TABLE user_skills (
        user_id BIGINT NOT NULL,
        skill VARCHAR(255) NOT NULL,
        PRIMARY KEY (user_id, skill),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END
GO

-- Create jobs table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'jobs')
BEGIN
    CREATE TABLE jobs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description VARCHAR(MAX) NOT NULL,
        salary VARCHAR(255) NOT NULL,
        level VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        posted_date DATETIME2 NOT NULL,
        deadline_date DATETIME2 NOT NULL,
        company_logo VARCHAR(255),
        job_image VARCHAR(255),
        about VARCHAR(MAX),
        company_size VARCHAR(50),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Create job_skills table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_skills')
BEGIN
    CREATE TABLE job_skills (
        job_id BIGINT NOT NULL,
        skill VARCHAR(255) NOT NULL,
        PRIMARY KEY (job_id, skill),
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
END
GO

-- Create job_responsibilities table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_responsibilities')
BEGIN
    CREATE TABLE job_responsibilities (
        job_id BIGINT NOT NULL,
        responsibility VARCHAR(MAX) NOT NULL,
        PRIMARY KEY (job_id, responsibility),
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
END
GO

-- Create job_requirements table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_requirements')
BEGIN
    CREATE TABLE job_requirements (
        job_id BIGINT NOT NULL,
        requirement VARCHAR(MAX) NOT NULL,
        PRIMARY KEY (job_id, requirement),
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
END
GO

-- Create job_benefits table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_benefits')
BEGIN
    CREATE TABLE job_benefits (
        job_id BIGINT NOT NULL,
        benefit VARCHAR(MAX) NOT NULL,
        PRIMARY KEY (job_id, benefit),
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
END
GO

-- Create job_applications table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'job_applications')
BEGIN
    CREATE TABLE job_applications (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        job_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        cover_letter VARCHAR(MAX),
        resume_url VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        applied_date DATETIME2 NOT NULL,
        last_updated DATETIME2 DEFAULT GETDATE(),
        employer_notes VARCHAR(MAX),
        interview_date DATETIME2,
        interview_location VARCHAR(255),
        interview_notes VARCHAR(MAX),
        FOREIGN KEY (job_id) REFERENCES jobs(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END
GO 