-- Insert sample users
INSERT INTO users (email, password, first_name, last_name, phone, location, role)
VALUES 
('admin@jobportal.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Admin', 'User', '1234567890', 'New York', 'ADMIN'),
('employer@jobportal.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'John', 'Employer', '2345678901', 'San Francisco', 'EMPLOYER'),
('jobseeker@jobportal.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Jane', 'Jobseeker', '3456789012', 'Chicago', 'JOBSEEKER'),
('tech.recruiter@google.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Sarah', 'Johnson', '4567890123', 'Mountain View', 'EMPLOYER'),
('hr@microsoft.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Michael', 'Chen', '5678901234', 'Redmond', 'EMPLOYER'),
('dev@amazon.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'David', 'Smith', '6789012345', 'Seattle', 'EMPLOYER'),
('alice.dev@gmail.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Alice', 'Brown', '7890123456', 'Boston', 'JOBSEEKER'),
('bob.engineer@yahoo.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Bob', 'Wilson', '8901234567', 'Austin', 'JOBSEEKER'),
('carol.designer@outlook.com', '$2a$10$rDkPvvAFV6GgJkKq8K6UeOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'Carol', 'Davis', '9012345678', 'Portland', 'JOBSEEKER')
ON DUPLICATE KEY UPDATE email = VALUES(email);
GO

-- Insert sample jobs
INSERT INTO jobs (title, company, location, description, salary, level, type, posted_date, deadline_date, company_size)
VALUES 
('Senior Software Engineer', 'Tech Corp', 'New York', 'Looking for an experienced software engineer...', '$120,000 - $150,000', 'SENIOR', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'LARGE'),
('Frontend Developer', 'Web Solutions', 'San Francisco', 'Join our team as a frontend developer...', '$90,000 - $110,000', 'MID_LEVEL', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'MEDIUM'),
('Data Scientist', 'Data Analytics Inc', 'Chicago', 'Exciting opportunity for a data scientist...', '$100,000 - $130,000', 'SENIOR', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'LARGE'),
('DevOps Engineer', 'Google', 'Mountain View', 'Join our cloud infrastructure team...', '$130,000 - $160,000', 'SENIOR', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'LARGE'),
('UX Designer', 'Microsoft', 'Redmond', 'Create beautiful user experiences...', '$95,000 - $120,000', 'MID_LEVEL', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'LARGE'),
('Backend Developer', 'Amazon', 'Seattle', 'Build scalable microservices...', '$110,000 - $140,000', 'SENIOR', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'LARGE'),
('Mobile Developer', 'StartupX', 'Austin', 'Develop iOS and Android apps...', '$85,000 - $105,000', 'MID_LEVEL', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'SMALL'),
('Product Manager', 'TechGiant', 'Boston', 'Lead product development...', '$120,000 - $150,000', 'SENIOR', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'MEDIUM'),
('QA Engineer', 'SoftwareCo', 'Portland', 'Ensure software quality...', '$80,000 - $100,000', 'MID_LEVEL', 'FULL_TIME', GETDATE(), DATEADD(month, 1, GETDATE()), 'MEDIUM')
ON DUPLICATE KEY UPDATE title = VALUES(title);
GO

-- Insert sample job skills
INSERT INTO job_skills (job_id, skill)
VALUES 
(1, 'Java'),
(1, 'Spring Boot'),
(1, 'Microservices'),
(2, 'React'),
(2, 'JavaScript'),
(2, 'HTML/CSS'),
(3, 'Python'),
(3, 'Machine Learning'),
(3, 'SQL'),
(4, 'Docker'),
(4, 'Kubernetes'),
(4, 'AWS'),
(5, 'Figma'),
(5, 'Adobe XD'),
(5, 'UI/UX Design'),
(6, 'Node.js'),
(6, 'MongoDB'),
(6, 'REST APIs'),
(7, 'Swift'),
(7, 'Kotlin'),
(7, 'React Native'),
(8, 'Agile'),
(8, 'Product Strategy'),
(8, 'User Research'),
(9, 'Selenium'),
(9, 'JUnit'),
(9, 'Test Automation')
ON DUPLICATE KEY UPDATE skill = VALUES(skill);
GO

-- Insert sample job responsibilities
INSERT INTO job_responsibilities (job_id, responsibility)
VALUES 
(1, 'Design and implement scalable backend services'),
(1, 'Lead technical discussions and code reviews'),
(2, 'Develop responsive and interactive user interfaces'),
(2, 'Collaborate with UX/UI designers'),
(3, 'Build and deploy machine learning models'),
(3, 'Analyze large datasets and generate insights'),
(4, 'Manage cloud infrastructure and deployment pipelines'),
(4, 'Implement CI/CD best practices'),
(5, 'Create user-centered design solutions'),
(5, 'Conduct user research and usability testing'),
(6, 'Design and implement RESTful APIs'),
(6, 'Optimize database performance'),
(7, 'Develop cross-platform mobile applications'),
(7, 'Implement native features and integrations'),
(8, 'Define product roadmap and strategy'),
(8, 'Work with cross-functional teams'),
(9, 'Develop and execute test plans'),
(9, 'Implement automated testing frameworks')
ON DUPLICATE KEY UPDATE responsibility = VALUES(responsibility);
GO

-- Insert sample job requirements
INSERT INTO job_requirements (job_id, requirement)
VALUES 
(1, '5+ years of Java development experience'),
(1, 'Strong knowledge of Spring Boot and microservices'),
(2, '3+ years of frontend development experience'),
(2, 'Proficiency in React and modern JavaScript'),
(3, '4+ years of data science experience'),
(3, 'Strong background in machine learning and statistics'),
(4, '5+ years of DevOps experience'),
(4, 'Expertise in containerization and orchestration'),
(5, '3+ years of UX design experience'),
(5, 'Portfolio demonstrating user-centered design'),
(6, '4+ years of backend development'),
(6, 'Experience with NoSQL databases'),
(7, '3+ years of mobile development'),
(7, 'Experience with both iOS and Android'),
(8, '5+ years of product management'),
(8, 'Strong analytical and communication skills'),
(9, '3+ years of QA experience'),
(9, 'Experience with test automation tools')
ON DUPLICATE KEY UPDATE requirement = VALUES(requirement);
GO

-- Insert sample job benefits
INSERT INTO job_benefits (job_id, benefit)
VALUES 
(1, 'Competitive salary and benefits package'),
(1, 'Flexible work hours and remote work options'),
(2, 'Health insurance and wellness programs'),
(2, 'Professional development opportunities'),
(3, '401(k) matching and stock options'),
(3, 'Generous paid time off'),
(4, 'Free meals and snacks'),
(4, 'Gym membership reimbursement'),
(5, 'Remote work flexibility'),
(5, 'Learning and development budget'),
(6, 'Health and dental insurance'),
(6, 'Employee stock purchase plan'),
(7, 'Flexible PTO policy'),
(7, 'Home office setup allowance'),
(8, 'Competitive compensation'),
(8, 'Professional development support'),
(9, 'Health benefits'),
(9, 'Work-life balance initiatives')
ON DUPLICATE KEY UPDATE benefit = VALUES(benefit);
GO

-- Insert sample job applications
INSERT INTO job_applications (job_id, user_id, cover_letter, status, applied_date)
VALUES 
(1, 3, 'I am excited to apply for the Senior Software Engineer position...', 'PENDING', GETDATE()),
(2, 3, 'I would love to join your team as a Frontend Developer...', 'PENDING', GETDATE()),
(4, 7, 'I have extensive experience with cloud technologies...', 'INTERVIEW', GETDATE()),
(5, 8, 'My background in UX design aligns perfectly...', 'PENDING', GETDATE()),
(6, 9, 'I am passionate about building scalable systems...', 'REJECTED', GETDATE()),
(7, 7, 'I have developed multiple successful mobile apps...', 'ACCEPTED', GETDATE()),
(8, 8, 'My product management experience includes...', 'PENDING', GETDATE()),
(9, 9, 'I have a strong background in QA automation...', 'INTERVIEW', GETDATE())
ON DUPLICATE KEY UPDATE status = VALUES(status);
GO 