import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Autocomplete,
  Badge,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers';
import Popover from '@mui/material/Popover';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const dummyJobs = [
  {
    id: 1,
    title: 'Creative Director',
    company: 'Samsung',
    location: 'Chennai',
    skills: ['Photoshop', 'Adobe XD', 'Invision Studio'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    description: 'Lead creative projects and teams.',
    salary: 'Negotiable',
    level: 'Senior',
    type: 'Full Time',
    posted: '2022-12-27',
    deadline: '2023-01-13',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'As a Creative Director, you will oversee the creative process and guide the creative team.'
  },
  {
    id: 2,
    title: 'Graphic Designer',
    company: 'Google',
    location: 'Chennai',
    skills: ['Photoshop', 'Adobe XD', 'Invision Studio'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    description: 'Design graphics for web and print.',
    salary: 'Negotiable',
    level: 'Mid',
    type: 'Full Time',
    posted: '2022-12-27',
    deadline: '2023-01-13',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    about: 'Work with the marketing team to create stunning visuals for campaigns.'
  },
  {
    id: 3,
    title: 'UX Product Engineer',
    company: 'Zoho corp',
    location: 'Chennai',
    skills: ['Photoshop', 'Adobe XD', 'Invision Studio'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Zoho_logo.svg',
    description: 'Work on UX for Zoho products.',
    salary: 'Negotiable',
    level: 'Mid',
    type: 'Full Time',
    posted: '2022-12-27',
    deadline: '2023-01-13',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: "Improve user experience for Zoho's suite of products."
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'Amazon',
    location: 'Hyderabad',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Develop and maintain backend services.',
    salary: '₹18,00,000 - ₹25,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-01-10',
    deadline: '2023-02-01',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Responsible for building scalable backend APIs and services.'
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'Microsoft',
    location: 'Bangalore',
    skills: ['React', 'JavaScript', 'CSS'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description: 'Build modern web interfaces.',
    salary: '₹15,00,000 - ₹22,00,000',
    level: 'Junior',
    type: 'Full Time',
    posted: '2023-01-15',
    deadline: '2023-02-10',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    about: 'Work with designers to create beautiful and functional UIs.'
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'Tata Consultancy Services',
    location: 'Pune',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Consultancy_Services_Logo.svg',
    description: 'Analyze data and build predictive models.',
    salary: '₹20,00,000 - ₹30,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-01-20',
    deadline: '2023-02-15',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Use data to drive business decisions and build ML models.'
  },
  {
    id: 7,
    title: 'Mobile App Developer',
    company: 'Infosys',
    location: 'Remote',
    skills: ['Flutter', 'Dart', 'Android', 'iOS'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Infosys_logo.svg',
    description: 'Develop cross-platform mobile apps.',
    salary: '₹12,00,000 - ₹18,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-01-22',
    deadline: '2023-02-20',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Build and maintain mobile applications for Android and iOS.'
  },
  {
    id: 8,
    title: 'DevOps Engineer',
    company: 'Wipro',
    location: 'Chennai',
    skills: ['AWS', 'Docker', 'CI/CD'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Wipro_Primary_Logo_Color_RGB.svg',
    description: 'Automate deployment pipelines and manage cloud infrastructure.',
    salary: '₹17,00,000 - ₹24,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-01-25',
    deadline: '2023-02-25',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    about: 'Ensure smooth deployment and operation of cloud services.'
  },
  {
    id: 9,
    title: 'AI Research Scientist',
    company: 'DeepMind',
    location: 'Remote',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Research'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/DeepMind_logo.svg',
    description: 'Lead cutting-edge AI research and development projects.',
    salary: '₹35,00,000 - ₹45,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-02-01',
    deadline: '2023-03-01',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Lead research projects in artificial intelligence and machine learning.',
    responsibilities: [
      'Design and implement novel AI algorithms and models',
      'Publish research papers in top-tier conferences and journals',
      'Collaborate with cross-functional teams to apply research findings',
      'Mentor junior researchers and engineers',
      'Stay current with latest developments in AI/ML field'
    ],
    requirements: [
      'PhD in Computer Science, AI, or related field',
      '5+ years of experience in AI research',
      'Strong publication record in top AI conferences',
      'Expertise in deep learning and neural networks',
      'Experience with large-scale distributed systems'
    ],
    benefits: [
      'Competitive salary and equity',
      'Flexible work arrangements',
      'Conference and research funding',
      'Access to cutting-edge AI infrastructure',
      'Collaboration with world-class researchers'
    ],
    companySize: '1000+'
  },
  {
    id: 10,
    title: 'Blockchain Developer',
    company: 'Coinbase',
    location: 'Hybrid',
    skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Coinbase_Logo.svg',
    description: 'Build and maintain blockchain applications for cryptocurrency exchange.',
    salary: '₹28,00,000 - ₹40,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-02-05',
    deadline: '2023-03-05',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Build and maintain blockchain-based applications and smart contracts.',
    responsibilities: [
      'Develop and audit smart contracts',
      'Implement blockchain solutions for trading platform',
      'Optimize gas usage and transaction costs',
      'Ensure security of blockchain applications',
      'Collaborate with product and security teams'
    ],
    requirements: [
      '3+ years of blockchain development experience',
      'Strong knowledge of Solidity and Web3',
      'Experience with DeFi protocols',
      'Understanding of blockchain security',
      'Familiarity with Ethereum ecosystem'
    ],
    benefits: [
      'Competitive salary and crypto bonuses',
      'Remote-first work culture',
      'Learning and development budget',
      'Health insurance and wellness benefits',
      'Regular team events and hackathons'
    ],
    companySize: '1000+'
  },
  {
    id: 11,
    title: 'Cybersecurity Analyst',
    company: 'CrowdStrike',
    location: 'On-site',
    skills: ['Security', 'Networking', 'Python', 'Ethical Hacking'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/CrowdStrike_logo.svg',
    description: 'Protect systems and networks from cyber threats in a leading security company.',
    salary: '₹25,00,000 - ₹35,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-02-10',
    deadline: '2023-03-10',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Monitor and analyze security threats and implement protective measures.',
    responsibilities: [
      'Conduct security assessments and penetration testing',
      'Monitor and respond to security incidents',
      'Implement security controls and policies',
      'Investigate security breaches and vulnerabilities',
      'Provide security training and awareness'
    ],
    requirements: [
      '4+ years of cybersecurity experience',
      'Certifications: CISSP, CEH, or similar',
      'Experience with SIEM tools and security frameworks',
      'Knowledge of network protocols and security',
      'Strong analytical and problem-solving skills'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Comprehensive health coverage',
      'Professional certification support',
      'State-of-the-art security tools',
      'Regular security training and workshops'
    ],
    companySize: '1000+'
  },
  {
    id: 12,
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Hybrid',
    skills: ['Product Management', 'Agile', 'Communication', 'Leadership'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description: 'Lead product development and strategy for enterprise software solutions.',
    salary: '₹30,00,000 - ₹45,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-02-15',
    deadline: '2023-03-15',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Drive product strategy and work with cross-functional teams.',
    responsibilities: [
      'Define product vision and strategy',
      'Gather and prioritize product requirements',
      'Work with engineering teams on implementation',
      'Analyze market trends and competition',
      'Drive product launches and marketing'
    ],
    requirements: [
      '7+ years of product management experience',
      'Experience with enterprise software products',
      'Strong analytical and strategic thinking',
      'Excellent communication and leadership skills',
      'MBA or technical degree preferred'
    ],
    benefits: [
      'Competitive salary and stock options',
      'Flexible work arrangements',
      'Professional development budget',
      'Comprehensive health benefits',
      'Employee stock purchase program'
    ],
    companySize: '1000+'
  },
  {
    id: 13,
    title: 'UI/UX Designer',
    company: 'Adobe',
    location: 'Remote',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
    description: 'Create beautiful and intuitive user interfaces for creative software.',
    salary: '₹15,00,000 - ₹25,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-02-20',
    deadline: '2023-03-20',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    about: 'Design user interfaces and experiences for creative software applications.',
    responsibilities: [
      'Create user-centered designs',
      'Develop wireframes and prototypes',
      'Conduct user research and testing',
      'Collaborate with development teams',
      'Maintain design systems and guidelines'
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Strong portfolio demonstrating design skills',
      'Proficiency in design tools (Figma, Adobe XD)',
      'Understanding of user research methods',
      'Experience with design systems'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Creative software license',
      'Professional development opportunities',
      'Health and wellness benefits'
    ],
    companySize: '1000+'
  },
  {
    id: 14,
    title: 'DevOps Engineer',
    company: 'Google Cloud',
    location: 'Hybrid',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    description: 'Manage cloud infrastructure and deployment pipelines.',
    salary: '₹20,00,000 - ₹30,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-02-25',
    deadline: '2023-03-25',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    about: 'Implement and maintain cloud infrastructure and CI/CD pipelines.'
  },
  {
    id: 15,
    title: 'Data Engineer',
    company: 'Amazon',
    location: 'On-site',
    skills: ['Python', 'SQL', 'Apache Spark', 'Data Pipeline'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Build and maintain data pipelines and infrastructure.',
    salary: '₹22,00,000 - ₹32,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-03-01',
    deadline: '2023-04-01',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Design and implement data pipelines and ETL processes.'
  },
  {
    id: 16,
    title: 'Game Developer',
    company: 'Ubisoft',
    location: 'On-site',
    skills: ['Unity', 'C#', 'Game Design', '3D Modeling'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Ubisoft_logo.svg',
    description: 'Create immersive gaming experiences.',
    salary: '₹18,00,000 - ₹28,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-03-05',
    deadline: '2023-04-05',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    about: 'Develop and maintain game features and mechanics.',
    companySize: '1000+'
  },
  {
    id: 17,
    title: 'AR/VR Developer',
    company: 'Meta',
    location: 'Hybrid',
    skills: ['Unity', 'C#', 'AR/VR', '3D Graphics'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    description: 'Build next-generation AR/VR experiences.',
    salary: '₹25,00,000 - ₹35,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-03-10',
    deadline: '2023-04-10',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Develop immersive AR/VR applications and experiences.',
    companySize: '1000+'
  },
  {
    id: 18,
    title: 'Mobile App Developer',
    company: 'Swiggy',
    location: 'Hybrid',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.svg',
    description: 'Build and maintain food delivery mobile apps.',
    salary: '₹15,00,000 - ₹25,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-03-15',
    deadline: '2023-04-15',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Develop and maintain mobile applications for food delivery platform.',
    companySize: '201-1000'
  },
  {
    id: 19,
    title: 'Frontend Developer',
    company: 'Razorpay',
    location: 'Remote',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Razorpay_logo.svg',
    description: 'Build modern web interfaces for payment solutions.',
    salary: '₹20,00,000 - ₹30,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-03-20',
    deadline: '2023-04-20',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    about: 'Develop and maintain frontend applications for payment processing.',
    companySize: '201-1000'
  },
  {
    id: 20,
    title: 'Backend Developer',
    company: 'Freshworks',
    location: 'Hybrid',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Freshworks_logo.svg',
    description: 'Build scalable backend services for SaaS platform.',
    salary: '₹22,00,000 - ₹32,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-03-25',
    deadline: '2023-04-25',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Design and implement scalable backend services.',
    companySize: '201-1000'
  },
  {
    id: 21,
    title: 'Data Scientist',
    company: 'Flipkart',
    location: 'On-site',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flipkart_logo.svg',
    description: 'Analyze customer data and build ML models.',
    salary: '₹25,00,000 - ₹35,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-04-01',
    deadline: '2023-05-01',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Develop machine learning models for e-commerce platform.',
    companySize: '1000+'
  },
  {
    id: 22,
    title: 'DevOps Engineer',
    company: 'Zomato',
    location: 'Remote',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.svg',
    description: 'Manage cloud infrastructure for food delivery platform.',
    salary: '₹20,00,000 - ₹30,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-04-05',
    deadline: '2023-05-05',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    about: 'Implement and maintain cloud infrastructure.',
    companySize: '1000+'
  },
  {
    id: 23,
    title: 'UI/UX Designer',
    company: 'CRED',
    location: 'Hybrid',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/CRED_logo.svg',
    description: 'Design user interfaces for fintech platform.',
    salary: '₹18,00,000 - ₹28,00,000',
    level: 'Mid',
    type: 'Full Time',
    posted: '2023-04-10',
    deadline: '2023-05-10',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    about: 'Create beautiful and intuitive user interfaces for fintech applications.',
    companySize: '51-200'
  },
  {
    id: 24,
    title: 'Product Manager',
    company: 'PhonePe',
    location: 'On-site',
    skills: ['Product Management', 'Agile', 'Communication', 'Leadership'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/PhonePe_Logo.svg',
    description: 'Lead product development for payment platform.',
    salary: '₹30,00,000 - ₹45,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-04-15',
    deadline: '2023-05-15',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Drive product strategy for digital payments platform.',
    companySize: '201-1000'
  },
  {
    id: 25,
    title: 'Blockchain Developer',
    company: 'Polygon',
    location: 'Remote',
    skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Polygon_logo.svg',
    description: 'Develop blockchain solutions for scaling Ethereum.',
    salary: '₹28,00,000 - ₹40,00,000',
    level: 'Senior',
    type: 'Full Time',
    posted: '2023-04-20',
    deadline: '2023-05-20',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    about: 'Build and maintain blockchain infrastructure.',
    companySize: '51-200'
  }
];

const initialInterviewDates = [
  // Closed (past)
  {
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    jobTitle: 'Frontend Developer',
    company: 'Microsoft',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    jobTitle: 'Backend Developer',
    company: 'Amazon',
  },
  // Upcoming (future)
  {
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    jobTitle: 'UX Product Engineer',
    company: 'Zoho corp',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    jobTitle: 'Data Scientist',
    company: 'Tata Consultancy Services',
  },
];

// Update job categories with more specific roles
const jobCategories = [
  'Software Development',
  'Data Science & Analytics',
  'Design & Creative',
  'Marketing & Communications',
  'Sales & Business Development',
  'Finance & Accounting',
  'Human Resources',
  'Operations & Supply Chain',
  'Customer Service & Support',
  'Product Management',
  'Quality Assurance',
  'DevOps & Cloud',
  'Mobile Development',
  'AI & Machine Learning',
  'Cybersecurity',
  'Blockchain & Web3',
  'Game Development',
  'UI/UX Design',
  'Content Creation',
  'Project Management',
  'AR/VR Development',
  'Fintech',
  'E-commerce',
  'EdTech',
  'HealthTech'
];

// Update common skills with more specific technologies
const commonSkills = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Ruby', 'PHP', 'Go', 'Rust', 'Swift', 'Kotlin',
  // Frontend
  'React', 'Angular', 'Vue.js', 'Next.js', 'HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS', 'Redux', 'GraphQL',
  // Backend
  'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'FastAPI', 'NestJS',
  // Database
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Firebase', 'Cassandra', 'Elasticsearch',
  // Cloud & DevOps
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'Ansible', 'Prometheus',
  // Data Science
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn',
  // Mobile
  'React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin', 'Xamarin', 'Ionic',
  // Design
  'UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch', 'InVision', 'Zeplin',
  // Game Development
  'Unity', 'Unreal Engine', 'C#', 'Game Design', '3D Modeling', 'Animation', 'AR/VR',
  // Blockchain
  'Solidity', 'Web3', 'Ethereum', 'Smart Contracts', 'DeFi', 'NFT', 'DApps',
  // Soft Skills
  'Project Management', 'Agile', 'Scrum', 'Communication', 'Leadership', 'Problem Solving', 'Team Management',
  // Other
  'Git', 'REST APIs', 'Microservices', 'Blockchain', 'Web3', 'Game Development', 'AR/VR', 'IoT'
];

// Add salary ranges
const salaryRanges = [
  { label: 'Any', value: '' },
  { label: '0-5 LPA', value: '0-5' },
  { label: '5-10 LPA', value: '5-10' },
  { label: '10-15 LPA', value: '10-15' },
  { label: '15-20 LPA', value: '15-20' },
  { label: '20-30 LPA', value: '20-30' },
  { label: '30+ LPA', value: '30+' }
];

// Add company sizes
const companySizes = [
  { label: 'Any', value: '' },
  { label: 'Startup (1-50)', value: '1-50' },
  { label: 'Small (51-200)', value: '51-200' },
  { label: 'Medium (201-1000)', value: '201-1000' },
  { label: 'Large (1000+)', value: '1000+' }
];

// Update trending jobs data with more metrics
const trendingJobs = [
  {
    id: 'trend1',
    title: 'AI/ML Engineer',
    demand: 'Very High',
    growth: '+35%',
    avgSalary: '25-35 LPA',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning'],
    description: 'Rapidly growing field with high demand across industries',
    companies: ['Google', 'Microsoft', 'Amazon', 'IBM'],
    remotePercentage: '85%',
    jobOpenings: '15,000+',
    experienceRange: '2-5 years'
  },
  {
    id: 'trend2',
    title: 'Full Stack Developer',
    demand: 'Very High',
    growth: '+28%',
    avgSalary: '18-28 LPA',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    description: 'Most sought-after role in tech industry',
    companies: ['Meta', 'Netflix', 'Uber', 'PayPal'],
    remotePercentage: '90%',
    jobOpenings: '25,000+',
    experienceRange: '1-4 years'
  },
  {
    id: 'trend3',
    title: 'DevOps Engineer',
    demand: 'High',
    growth: '+32%',
    avgSalary: '20-30 LPA',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    description: 'Critical role in modern software development',
    companies: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean'],
    remotePercentage: '80%',
    jobOpenings: '12,000+',
    experienceRange: '2-6 years'
  },
  {
    id: 'trend4',
    title: 'Data Scientist',
    demand: 'High',
    growth: '+30%',
    avgSalary: '22-32 LPA',
    skills: ['Python', 'R', 'SQL', 'Machine Learning'],
    description: 'Growing demand in analytics and AI',
    companies: ['IBM', 'Oracle', 'SAP', 'Salesforce'],
    remotePercentage: '75%',
    jobOpenings: '18,000+',
    experienceRange: '2-5 years'
  },
  {
    id: 'trend5',
    title: 'Cloud Architect',
    demand: 'Very High',
    growth: '+40%',
    avgSalary: '30-45 LPA',
    skills: ['AWS', 'Azure', 'GCP', 'Cloud Security'],
    description: 'Essential role in cloud transformation',
    companies: ['AWS', 'Microsoft', 'Google', 'IBM'],
    remotePercentage: '70%',
    jobOpenings: '8,000+',
    experienceRange: '5-8 years'
  },
  {
    id: 'trend6',
    title: 'Blockchain Developer',
    demand: 'High',
    growth: '+45%',
    avgSalary: '28-40 LPA',
    skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
    description: 'Emerging field with high growth potential',
    companies: ['Coinbase', 'Binance', 'Chainlink', 'Polygon'],
    remotePercentage: '95%',
    jobOpenings: '5,000+',
    experienceRange: '2-4 years'
  },
  {
    id: 'trend7',
    title: 'Cybersecurity Engineer',
    demand: 'Very High',
    growth: '+38%',
    avgSalary: '25-35 LPA',
    skills: ['Security', 'Networking', 'Python', 'Ethical Hacking'],
    description: 'Critical role in protecting digital assets',
    companies: ['Cisco', 'Palo Alto', 'CrowdStrike', 'Fortinet'],
    remotePercentage: '60%',
    jobOpenings: '20,000+',
    experienceRange: '3-6 years'
  }
];

function SettingsModal({ open, onClose, onLogout, theme, setTheme, notifications, setNotifications }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Settings</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Profile</Typography>
          <TextField label="Name" size="small" fullWidth sx={{ mt: 1, mb: 1 }} defaultValue="John Doe" />
          <TextField label="Email" size="small" fullWidth sx={{ mb: 1 }} defaultValue="john@example.com" />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Change Password</Typography>
          <TextField label="Current Password" type="password" size="small" fullWidth sx={{ mt: 1, mb: 1 }} />
          <TextField label="New Password" type="password" size="small" fullWidth sx={{ mb: 1 }} />
          <TextField label="Confirm New Password" type="password" size="small" fullWidth />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Enable Notifications</Typography>
          <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Dark Mode</Typography>
          <Switch checked={theme === 'dark'} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </Box>
        <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }} onClick={onLogout}>Logout</Button>
        <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
}

function TopBar({ onLogout, onOpenSettings, onOpenNotifications, hasUpcoming, onOpenMessages }) {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 2, flexGrow: 1 }}>
          <span style={{ fontFamily: 'cursive', color: '#222' }}>ME</span>
          <span style={{ color: '#1976d2' }}>TAM</span>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField size="small" placeholder="Search" InputProps={{ endAdornment: <SearchIcon /> }} sx={{ bgcolor: 'white', borderRadius: 2 }} />
          <Badge color="error" variant="dot" invisible={!hasUpcoming} sx={{ cursor: 'pointer' }} onClick={onOpenNotifications}>
            <NotificationsIcon />
          </Badge>
          <Badge badgeContent={3} color="error" sx={{ cursor: 'pointer' }} onClick={onOpenMessages}>
            <MessageIcon />
          </Badge>
          <IconButton onClick={onOpenSettings}><SettingsIcon /></IconButton>
          <IconButton onClick={onLogout}><LogoutIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function JobSidebar({ jobs, selectedJobId, onSelect, preferences }) {
  const filteredJobs = jobs.filter(job => {
    if (!preferences.category && !preferences.level && !preferences.type && 
        !preferences.skills?.length && !preferences.location && !preferences.salary && 
        !preferences.companySize) {
      return true;
    }

    const matchesCategory = !preferences.category || 
      job.title.toLowerCase().includes(preferences.category.toLowerCase());
    
    const matchesLevel = !preferences.level || job.level === preferences.level;
    
    const matchesType = !preferences.type || job.type === preferences.type;
    
    const matchesSkills = !preferences.skills?.length || 
      preferences.skills.some(skill => job.skills.includes(skill));
    
    const matchesLocation = !preferences.location || 
      (preferences.location === 'Remote' && job.location === 'Remote') ||
      (preferences.location === 'On-site' && job.location !== 'Remote') ||
      (preferences.location === 'Hybrid' && job.location.includes('Hybrid')) ||
      (preferences.location !== 'Any' && job.location === preferences.location);

    const matchesSalary = !preferences.salary || (() => {
      const [min, max] = preferences.salary.split('-').map(Number);
      const jobSalary = parseInt(job.salary);
      if (preferences.salary === '30+') {
        return jobSalary >= 30;
      }
      return jobSalary >= min && jobSalary <= max;
    })();

    const matchesCompanySize = !preferences.companySize || (() => {
      const [min, max] = preferences.companySize.split('-').map(Number);
      const companySize = parseInt(job.companySize);
      if (preferences.companySize === '1000+') {
        return companySize >= 1000;
      }
      return companySize >= min && companySize <= max;
    })();

    return matchesCategory && matchesLevel && matchesType && matchesSkills && 
           matchesLocation && matchesSalary && matchesCompanySize;
  });

  return (
    <Paper sx={{ 
      p: 2, 
      bgcolor: 'rgba(255, 255, 255, 0.95)', 
      height: 'calc(80vh - 400px)', 
      overflowY: 'auto',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: 4,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.45)',
      }
    }}>
      <List>
        {filteredJobs.length === 0 ? (
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: 'text.secondary',
              py: 2 
            }}
          >
            No jobs match your preferences
          </Typography>
        ) : (
          filteredJobs.map((job) => (
            <React.Fragment key={job.id}>
              <ListItem 
                button 
                selected={selectedJobId === job.id} 
                onClick={() => onSelect(job.id)} 
                alignItems="flex-start"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(25, 118, 210, 0.12)',
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.15)',
                    }
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={job.logo} 
                    alt={job.company}
                    sx={{
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      border: '2px solid white'
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                      {job.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {job.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        <WorkIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {job.location}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        <AttachMoneyIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {job.salary} LPA
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {job.skills.map(skill => (
                          <Chip 
                            key={skill} 
                            label={skill} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(25, 118, 210, 0.1)',
                              color: '#1976d2',
                              fontWeight: 500,
                              '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.2)',
                              }
                            }} 
                          />
                        ))}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider sx={{ opacity: 0.5 }} />
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
}

function JobPostForm() {
  return (
    <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
      <Tabs value={0} sx={{ mb: 2 }}>
        <Tab label="Applied Status" />
        <Tab label="Post Status" />
      </Tabs>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button variant="outlined" sx={{ height: 100, mb: 1 }}>Upload Image</Button>
        <TextField label="Title" size="small" fullWidth />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Start Date" type="date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="End Date" type="date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
        </Box>
        <TextField label="Price" size="small" fullWidth />
        <TextField label="Description" size="small" multiline rows={2} fullWidth />
        <Button variant="contained" color="success" sx={{ mt: 1 }}>Post</Button>
      </Box>
    </Paper>
  );
}

function JobDetails({ job, onApply }) {
  if (!job) return null;
  return (
    <Paper sx={{ 
      p: 3, 
      bgcolor: 'rgba(255, 255, 255, 0.95)', 
      height: '80vh', 
      overflowY: 'auto',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: 4
    }}>
      <Box sx={{ 
        mb: 3, 
        borderRadius: 4, 
        overflow: 'hidden', 
        height: 200, 
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.2), rgba(25, 118, 210, 0.1))',
          zIndex: 1
        }
      }}>
        <img 
          src={job.image} 
          alt={job.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out'
          }} 
        />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>{job.title}</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>{job.company}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WorkIcon sx={{ mr: 1, color: '#1976d2' }} />
        <Typography variant="body1" color="text.secondary">{job.location}</Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Skills Required:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {job.skills.map(skill => (
            <Chip 
              key={skill} 
              label={skill} 
              sx={{ 
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.2)',
                }
              }} 
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(25, 118, 210, 0.05)', 
        borderRadius: 2, 
        mb: 3 
      }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Job Details</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2"><b>Level:</b> {job.level}</Typography>
          <Typography variant="body2"><b>Type:</b> {job.type}</Typography>
          <Typography variant="body2"><b>Salary:</b> {job.salary}</Typography>
          <Typography variant="body2"><b>Posted:</b> {job.posted}</Typography>
          <Typography variant="body2"><b>Deadline:</b> {job.deadline}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}><b>Description:</b> {job.description}</Typography>
      {job.about && (
        <Typography variant="body1" sx={{ mb: 3 }}><b>About this job:</b> {job.about}</Typography>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={() => onApply(job)}
        sx={{ 
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1.1rem',
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
          }
        }}
      >
        Apply Now
      </Button>
    </Paper>
  );
}

function InterviewCalendar({ interviewDates, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6">Interview Calendar</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={null}
              onChange={() => {}}
              sx={{ 
                width: 500, 
                '& .MuiPickersDay-root': { 
                  fontSize: 18, 
                  width: 48, 
                  height: 48 
                } 
              }}
              renderDay={(day, _value, DayComponentProps) => {
                const isUpcoming = interviewDates.some(
                  (date) =>
                    day.getDate() === date.getDate() &&
                    day.getMonth() === date.getMonth() &&
                    day.getFullYear() === date.getFullYear() &&
                    date >= new Date()
                );
                const isClosed = interviewDates.some(
                  (date) =>
                    day.getDate() === date.getDate() &&
                    day.getMonth() === date.getMonth() &&
                    day.getFullYear() === date.getFullYear() &&
                    date < new Date()
                );
                let sx = {};
                if (isUpcoming) {
                  sx = { bgcolor: '#1976d2', color: 'white', borderRadius: '50%', border: '2px solid #1976d2', boxShadow: '0 0 0 2px #1976d2' };
                } else if (isClosed) {
                  sx = { bgcolor: '#d32f2f', color: 'white', borderRadius: '50%' };
                }
                return (
                  <PickersDay {...DayComponentProps} sx={sx} />
                );
              }}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function NotificationsModal({ open, onClose, upcomingInterviews }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Upcoming Interviews</DialogTitle>
      <DialogContent>
        {upcomingInterviews.length === 0 ? (
          <Typography>No upcoming interviews.</Typography>
        ) : (
          upcomingInterviews.map((item, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 1, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.jobTitle}</Typography>
              <Typography variant="body2" color="text.secondary">{item.company}</Typography>
              <Typography variant="body2">{item.date.toLocaleString()}</Typography>
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function ApplicationsSection({ interviewDates }) {
  const now = new Date();
  const closed = interviewDates.filter(item => item.date < now);
  const upcoming = interviewDates.filter(item => item.date >= now);
  return (
    <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ 
          p: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: 4,
          minHeight: 200 
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>Closed Applications</Typography>
          {closed.length === 0 ? (
            <Typography>No closed applications.</Typography>
          ) : (
            closed.map((item, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 1, borderRadius: 2, bgcolor: '#f8d7da', boxShadow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.jobTitle}</Typography>
                <Typography variant="body2" color="text.secondary">{item.company}</Typography>
                <Typography variant="body2">{item.date.toLocaleString()}</Typography>
              </Box>
            ))
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ 
          p: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: 4,
          minHeight: 200 
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Upcoming Jobs</Typography>
          {upcoming.length === 0 ? (
            <Typography>No upcoming jobs.</Typography>
          ) : (
            upcoming.map((item, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 1, borderRadius: 2, bgcolor: '#e3f2fd', boxShadow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.jobTitle}</Typography>
                <Typography variant="body2" color="text.secondary">{item.company}</Typography>
                <Typography variant="body2">{item.date.toLocaleString()}</Typography>
              </Box>
            ))
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

function JobPreferences({ preferences, onPreferenceChange }) {
  return (
    <Paper sx={{ 
      p: 2, 
      mb: 2,
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: 4,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.45)',
      }
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
        Job Preferences
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth size="small">
          <InputLabel>Job Category</InputLabel>
          <Select
            value={preferences.category}
            label="Job Category"
            onChange={(e) => onPreferenceChange('category', e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
          >
            {jobCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={preferences.level}
            label="Experience Level"
            onChange={(e) => onPreferenceChange('level', e.target.value)}
          >
            <MenuItem value="Entry">Entry Level (0-2 years)</MenuItem>
            <MenuItem value="Mid">Mid Level (2-5 years)</MenuItem>
            <MenuItem value="Senior">Senior Level (5+ years)</MenuItem>
            <MenuItem value="Lead">Lead/Manager (7+ years)</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Job Type</InputLabel>
          <Select
            value={preferences.type}
            label="Job Type"
            onChange={(e) => onPreferenceChange('type', e.target.value)}
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Freelance">Freelance</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Salary Range</InputLabel>
          <Select
            value={preferences.salary}
            label="Salary Range"
            onChange={(e) => onPreferenceChange('salary', e.target.value)}
          >
            {salaryRanges.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Company Size</InputLabel>
          <Select
            value={preferences.companySize}
            label="Company Size"
            onChange={(e) => onPreferenceChange('companySize', e.target.value)}
          >
            {companySizes.map((size) => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          multiple
          size="small"
          options={commonSkills}
          value={preferences.skills}
          onChange={(_, newValue) => onPreferenceChange('skills', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              placeholder="Select skills"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                size="small"
                {...getTagProps({ index })}
                sx={{
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  color: '#1976d2',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.2)',
                  }
                }}
              />
            ))
          }
          groupBy={(option) => {
            if (['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Ruby', 'PHP', 'Go', 'Rust'].includes(option)) {
              return 'Programming Languages';
            } else if (['React', 'Angular', 'Vue.js', 'Next.js', 'HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS'].includes(option)) {
              return 'Frontend';
            } else if (['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel'].includes(option)) {
              return 'Backend';
            } else if (['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Firebase'].includes(option)) {
              return 'Database';
            } else if (['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'].includes(option)) {
              return 'Cloud & DevOps';
            } else if (['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Pandas', 'NumPy'].includes(option)) {
              return 'Data Science';
            } else if (['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'].includes(option)) {
              return 'Mobile';
            } else if (['UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch'].includes(option)) {
              return 'Design';
            } else if (['Project Management', 'Agile', 'Scrum', 'Communication', 'Leadership', 'Problem Solving'].includes(option)) {
              return 'Soft Skills';
            } else {
              return 'Other';
            }
          }}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Location</InputLabel>
          <Select
            value={preferences.location}
            label="Location"
            onChange={(e) => onPreferenceChange('location', e.target.value)}
          >
            <MenuItem value="Any">Any Location</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="On-site">On-site</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
            <MenuItem value="Mumbai">Mumbai</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            <MenuItem value="Chennai">Chennai</MenuItem>
            <MenuItem value="Pune">Pune</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}

function TrendingJobsCarousel({ onJobSelect, selectedJobId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Find matching job for current trending job
  const currentJob = trendingJobs[currentIndex];
  const matchingJob = useMemo(() => 
    dummyJobs.find(job => job.title.toLowerCase() === currentJob.title.toLowerCase()),
    [currentJob]
  );

  const isSelected = matchingJob?.id === selectedJobId;

  // Update selected job when current index changes
  useEffect(() => {
    if (matchingJob && onJobSelect) {
      onJobSelect(matchingJob.id);
    }
  }, [currentIndex, matchingJob, onJobSelect]);

  const handlePrevious = (e) => {
    e?.stopPropagation();
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex = (currentIndex - 1 + trendingJobs.length) % trendingJobs.length;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex = (currentIndex + 1) % trendingJobs.length;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  // Touch navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handleJobClick = (e) => {
    // Prevent click if clicking on navigation elements
    if (e.target.closest('.MuiIconButton-root') || e.target.closest('.progress-dot')) {
      return;
    }

    if (matchingJob && onJobSelect) {
      onJobSelect(matchingJob.id);
      // Add visual feedback
      const element = e.currentTarget;
      element.style.transform = 'scale(0.98)';
      setTimeout(() => {
        element.style.transform = 'translateY(-4px)';
      }, 150);
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 2,
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: isSelected 
          ? '0 8px 32px 0 rgba(25, 118, 210, 0.45)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: isSelected 
          ? '2px solid #1976d2'
          : '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: 4,
        position: 'relative',
        minHeight: 400,
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.45)',
          transform: 'translateY(-4px)',
        }
      }}
      onClick={handleJobClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: '#1976d2',
            zIndex: 3,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.6 },
            }
          }}
        />
      )}

      {/* Navigation Buttons */}
      <IconButton
        className="MuiIconButton-root"
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { 
            bgcolor: 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 2,
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        className="MuiIconButton-root"
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { 
            bgcolor: 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 2,
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Job Counter */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          px: 2,
          py: 0.5,
          borderRadius: 2,
          fontSize: '0.875rem',
          color: '#1976d2',
          fontWeight: 500,
          zIndex: 2,
        }}
      >
        {currentIndex + 1} / {trendingJobs.length}
      </Box>

      {/* Progress Dots */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 16, 
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        zIndex: 2,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        px: 2,
        py: 1,
        borderRadius: 4,
      }}>
        {trendingJobs.map((_, index) => (
          <Box
            key={index}
            className="progress-dot"
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentIndex ? '#1976d2' : 'rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: index === currentIndex ? '#1976d2' : 'rgba(0, 0, 0, 0.4)',
                transform: 'scale(1.2)',
              }
            }}
          />
        ))}
      </Box>

      {/* Job Content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        opacity: isTransitioning ? 0 : 1,
        transform: `translateX(${isTransitioning ? (direction === 'next' ? '-100%' : '100%') : '0'})`,
        transition: 'all 0.3s ease-in-out',
        animation: isTransitioning ? 'fadeIn 0.3s ease-in-out' : 'none',
        '@keyframes fadeIn': {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600, 
            color: isSelected ? '#1976d2' : 'inherit',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          }}>
            {currentJob.title}
          </Typography>
          <Chip
            label={currentJob.demand}
            size="small"
            sx={{
              bgcolor: currentJob.demand === 'Very High' ? '#4caf50' : '#2196f3',
              color: 'white',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          />
        </Box>

        <Box sx={{ 
          mb: 2,
          p: 2,
          bgcolor: 'rgba(25, 118, 210, 0.05)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(25, 118, 210, 0.08)',
          }
        }}>
          <Typography variant="body1" color="text.secondary">
            Growth: {currentJob.growth} | Avg. Salary: {currentJob.avgSalary}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Required Skills:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {currentJob.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  color: '#1976d2',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.2)',
                    transform: 'translateY(-2px)',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="body1" sx={{ 
          mb: 2,
          p: 2,
          bgcolor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          }
        }}>
          {currentJob.description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                Top Companies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {currentJob.companies.map((company) => (
                  <Chip
                    key={company}
                    label={company}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderColor: '#1976d2',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                Job Stats
              </Typography>
              <Box sx={{ 
                mt: 0.5,
                p: 1,
                bgcolor: 'rgba(25, 118, 210, 0.05)',
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                }
              }}>
                <Typography variant="body2">
                  Remote Work: {currentJob.remotePercentage}
                </Typography>
                <Typography variant="body2">
                  Open Positions: {currentJob.jobOpenings}
                </Typography>
                <Typography variant="body2">
                  Experience: {currentJob.experienceRange}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}

const Home = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [jobToApply, setJobToApply] = useState(null);
  const [applyMsg, setApplyMsg] = useState('');
  const [interviewDates, setInterviewDates] = useState(initialInterviewDates); // Pre-populated
  const [notifOpen, setNotifOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    category: '',
    level: '',
    type: '',
    skills: [],
    location: '',
    salary: '',
    companySize: ''
  });
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const muiTheme = useMemo(() => createTheme({
    palette: theme === 'dark'
      ? {
          mode: 'dark',
          background: { default: '#10141a', paper: '#181f2a' },
          primary: { main: '#1976d2' },
          secondary: { main: '#1976d2' },
          text: { primary: '#fff', secondary: '#90caf9' },
        }
      : {
          mode: 'light',
          background: { default: '#d6f5f5', paper: '#e6f7fa' },
          primary: { main: '#1976d2' },
          secondary: { main: '#1976d2' },
        },
  }), [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Set initial job selection when component mounts
  useEffect(() => {
    const initialTrendingJob = trendingJobs[0];
    const matchingJob = dummyJobs.find(job => 
      job.title.toLowerCase() === initialTrendingJob.title.toLowerCase()
    );
    if (matchingJob) {
      setSelectedJobId(matchingJob.id);
    }
  }, []);

  // Find the selected job
  const selectedJob = useMemo(() => 
    dummyJobs.find(job => job.id === selectedJobId),
    [selectedJobId]
  );

  // --- Interview Reminder Logic ---
  const handleApply = (job) => {
    setJobToApply(job);
    setInterviewDate(new Date());
    setApplyDialogOpen(true);
    setApplyMsg('');
  };

  const handleConfirmApply = () => {
    setApplyDialogOpen(false);
    setApplyMsg('Interview scheduled! You will get a reminder 1 hour before.');
    setInterviewDates((prev) => [...prev, { date: new Date(interviewDate), jobTitle: jobToApply.title, company: jobToApply.company }]); // Add to interview dates
    // Schedule browser notification
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          const now = new Date();
          const msUntilReminder = new Date(interviewDate).getTime() - now.getTime() - 60 * 60 * 1000;
          if (msUntilReminder > 0) {
            setTimeout(() => {
              new Notification("Interview Reminder", {
                body: `Your interview for ${jobToApply.title} at ${jobToApply.company} is in 1 hour!`,
              });
            }, msUntilReminder);
          } else {
            // If interview is within 1 hour, notify immediately
            new Notification("Interview Reminder", {
              body: `Your interview for ${jobToApply.title} at ${jobToApply.company} is in less than 1 hour!`,
            });
          }
        }
      });
    }
  };

  // Find upcoming interviews (today and future)
  const now = new Date();
  const upcomingInterviews = interviewDates.filter(item => item.date >= now);
  const hasUpcoming = upcomingInterviews.length > 0;

  const handleOpenMessages = () => {
    navigate('/messages');
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ 
          minHeight: '100vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0
          }
        }}>
          <TopBar
            onLogout={handleLogout}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenNotifications={() => setNotifOpen(true)}
            hasUpcoming={hasUpcoming}
            onOpenMessages={handleOpenMessages}
          />
          <NotificationsModal open={notifOpen} onClose={() => setNotifOpen(false)} upcomingInterviews={upcomingInterviews} />
          <SettingsModal
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            onLogout={handleLogout}
            theme={theme}
            setTheme={setTheme}
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)}>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Select your interview date and time for <b>{jobToApply?.title}</b> at <b>{jobToApply?.company}</b>.
              </Typography>
              <DateTimePicker
                label="Interview Date & Time"
                value={interviewDate}
                onChange={setInterviewDate}
                renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} fullWidth />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirmApply}>Confirm</Button>
            </DialogActions>
          </Dialog>
          {applyMsg && (
            <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
              <Paper sx={{ p: 2, bgcolor: 'success.main', color: 'white' }}>{applyMsg}</Paper>
            </Box>
          )}
          <Container maxWidth={false} sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <JobPreferences 
                  preferences={preferences} 
                  onPreferenceChange={(key, value) => {
                    const newPreferences = { ...preferences, [key]: value };
                    setPreferences(newPreferences);
                  }} 
                />
                <JobSidebar 
                  jobs={dummyJobs} 
                  selectedJobId={selectedJobId} 
                  onSelect={setSelectedJobId}
                  preferences={preferences}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TrendingJobsCarousel 
                  onJobSelect={setSelectedJobId} 
                  selectedJobId={selectedJobId}
                />
                <JobPostForm />
              </Grid>
              <Grid item xs={12} md={4}>
                <JobDetails 
                  job={selectedJob} 
                  onApply={handleApply} 
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                startIcon={<CalendarMonthIcon />}
                onClick={() => setCalendarOpen(true)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: '#1976d2',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Interview Calendar
              </Button>
            </Box>
            <InterviewCalendar 
              interviewDates={interviewDates.map(item => item.date)} 
              open={calendarOpen}
              onClose={() => setCalendarOpen(false)}
            />
            <ApplicationsSection interviewDates={interviewDates} />
          </Container>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Home; 