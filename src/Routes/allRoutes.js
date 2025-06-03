// allRoutes.js

import React from "react";

//Company Section
import AboutUs from "../pages/Company/AboutUs/AboutUs";
import Services from "../pages/Company/Services/Services";
import Team from "../pages/Company/Team/Team";
import Pricing from "../pages/Company/Pricing/Pricing";
import PrivacyAndPolicy from "../pages/Company/PrivacyAndPolicy/PrivacyAndPolicy";
import Faqs from "../pages/Company/Faqs/Faqs";

//Jobs Section
import JobList from "../pages/Jobs/JobList/JobList";
import JobList2 from "../pages/Jobs/JobList2/JobList2";
import JobGrid from "../pages/Jobs/JobGrid/JobGrid";
import JobGrid2 from "../pages/Jobs/JobGrid2/JobGrid2";
import JobDetails from "../pages/Jobs/JobDetails/JobDetails";
import JobsCategories from "../pages/Jobs/JobsCategories/JobsCategories";

//Candidate and Company Section
import CandidateList from "../pages/CandidateAndCompany/CandidateList/CandidateList";
import CandidateGrid from "../pages/CandidateAndCompany/CandidateGrid/CandidateGrid";
import CandidateDetails from "../pages/CandidateAndCompany/CandidateDetails/CandidateDetails";
import CompanyList from "../pages/CandidateAndCompany/CompanyList/CompanyList";
import CompanyDetails from "../pages/CandidateAndCompany/CompanyDetails/CompanyDetails";

//Blog Section
import Blog from "../pages/Blog/Blog/Blog";
import BlogGrid from "../pages/Blog/BlogGrid/BlogGrid";
import BlogModern from "../pages/Blog/BlogModern/BlogModern";
import BlogMasonary from "../pages/Blog/BlogMasonary/BlogMasonary";
import BlogDetails from "../pages/Blog/BlogDetails/BlogDetails";
import BlogAuther from "../pages/Blog/BlogAuther/BlogAuther";

//Contacts
import Contact from "../pages/Contact/Contact";

//Auth Pages
import SignIn from "../pages/ExtraPages/SignIn";
import SignUp from "../pages/ExtraPages/SignUp";
import SignOut from "../pages/ExtraPages/SignOut";
import ResetPassword from "../pages/ExtraPages/ResetPassword";
import ComingSoon from "../pages/ExtraPages/ComingSoon";
import Error404 from "../pages/ExtraPages/Error404";
import Components from "../pages/ExtraPages/Components/Components";

// New Role-based Auth Pages
import EmployerLogin from "../pages/Auth/EmployerLogin";
import EmployerRegister from "../pages/Auth/EmployerRegister";
import JobSeekerLogin from "../pages/Auth/JobSeekerLogin";
import JobSeekerRegister from "../pages/Auth/JobSeekerRegister";

//Profile Section (User Profile)
import BookMarkJobPost from "../pages/Profile/BookMarkJobPost/BookMarkJobPost";
import ManageJobs from "../pages/Profile/ManageJobs/ManageJobs";
import BookMarkJobs from "../pages/Profile/BookMarkJobs/BookMarkJobs";
import MyProfile from "../pages/Profile/MyProfile/MyProfile";

// Employer Dashboard Pages
import EmployerDashboard from "../pages/Employer/Dashboard/EmployerDashboard";
import PostJob from "../pages/Employer/PostJob/PostJob";
import ManagePostedJobs from "../pages/Employer/ManageJobs/ManagePostedJobs";
import ViewApplications from "../pages/Employer/Applications/ViewApplications";
import EmployerProfile from "../pages/Employer/Profile/EmployerProfile";

// Job Seeker Dashboard Pages
import JobSeekerDashboard from "../pages/JobSeeker/Dashboard/JobSeekerDashboard";
import AppliedJobs from "../pages/JobSeeker/AppliedJobs/AppliedJobs";
import SavedJobs from "../pages/JobSeeker/SavedJobs/SavedJobs";
import JobSeekerProfile from "../pages/JobSeeker/Profile/JobSeekerProfile";
import SearchJobs from "../pages/JobSeeker/SearchJobs/SearchJobs";

//Home Section
const Layout1 = React.lazy(() => import('../pages/Home/Layout1/Layout1'));
const Layout2 = React.lazy(() => import('../pages/Home/Layout2/Layout2'));
const Layout3 = React.lazy(() => import('../pages/Home/Layout3/Layout3'));

// Public routes (accessible without authentication)
const publicRoutes = [
  //Home Section
  { path: "/", component: <Layout2 /> },
  { path: "/layout2", component: <Layout1 /> },
  { path: "/layout3", component: <Layout3 /> },

  //Company Section
  { path: "/aboutus", component: <AboutUs /> },
  { path: "/services", component: <Services /> },
  { path: "/team", component: <Team /> },
  { path: "/pricing", component: <Pricing /> },
  { path: "/privacyandpolicy", component: <PrivacyAndPolicy /> },
  { path: "/faqs", component: <Faqs /> },

  //Jobs Section (Public view)
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist2", component: <JobList2 /> },
  { path: "/jobgrid", component: <JobGrid /> },
  { path: "/jobgrid2", component: <JobGrid2 /> },
  { path: "/jobdetails", component: <JobDetails /> },
  { path: "/jobscategories", component: <JobsCategories /> },

  //Candidate and Company Section (Public view)
  { path: "/candidatelist", component: <CandidateList /> },
  { path: "/candidategrid", component: <CandidateGrid /> },
  { path: "/candidatedetails", component: <CandidateDetails /> },
  { path: "/companylist", component: <CompanyList /> },
  { path: "/companydetails", component: <CompanyDetails /> },

  // Blog Section
  { path: "/blog", component: <Blog /> },
  { path: "/bloggrid", component: <BlogGrid /> },
  { path: "/blogmodern", component: <BlogModern /> },
  { path: "/blogmasonary", component: <BlogMasonary /> },
  { path: "/blogdetails", component: <BlogDetails /> },
  { path: "/blogauther", component: <BlogAuther /> },

  //Contact
  { path: "/contact", component: <Contact /> },
];

// Employer routes (accessible only to authenticated employers)
const employerRoutes = [
  { path: "/employer/dashboard", component: <EmployerDashboard /> },
  { path: "/employer/post-job", component: <PostJob /> },
  { path: "/employer/manage-jobs", component: <ManagePostedJobs /> },
  { path: "/employer/applications", component: <ViewApplications /> },
  { path: "/employer/profile", component: <EmployerProfile /> },
  { path: "/employer/bookmarkjobpost", component: <BookMarkJobPost /> },
  { path: "/employer/managejobs", component: <ManageJobs /> },
];

// Job Seeker routes (accessible only to authenticated job seekers)
const jobSeekerRoutes = [
  { path: "/jobseeker/dashboard", component: <JobSeekerDashboard /> },
  { path: "/jobseeker/search-jobs", component: <SearchJobs /> },
  { path: "/jobseeker/applied-jobs", component: <AppliedJobs /> },
  { path: "/jobseeker/saved-jobs", component: <SavedJobs /> },
  { path: "/jobseeker/profile", component: <JobSeekerProfile /> },
  { path: "/jobseeker/bookmarkjobs", component: <BookMarkJobs /> },
  { path: "/myprofile", component: <MyProfile /> },
];

// Authentication routes
const authRoutes = [
  // Role-specific auth routes
  { path: "/employer/login", component: <EmployerLogin /> },
  { path: "/employer/register", component: <EmployerRegister /> },
  { path: "/jobseeker/login", component: <JobSeekerLogin /> },
  { path: "/jobseeker/register", component: <JobSeekerRegister /> },

  // General auth routes
  { path: "/signin", component: <SignIn /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/signout", component: <SignOut /> },
  { path: "/resetpassword", component: <ResetPassword /> },

  // Error and utility pages
  { path: "/error404", component: <Error404 /> },
  { path: "/comingsoon", component: <ComingSoon /> },

  // Components Section
  { path: "/components", component: <Components /> },
];

export { publicRoutes, employerRoutes, jobSeekerRoutes, authRoutes };