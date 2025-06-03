// Updated NavBar with role-based navigation
import React, { useState, useEffect } from "react";
import {
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import withRouter from "../../components/withRouter";

import darkLogo from "../../assets/images/logo-dark.png";
import lightLogo from "../../assets/images/logo-light.png";
import profileImage from "../../assets/images/profile.jpg";

const NavBar = (props) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [notification, setNotification] = useState(false);
  const dropDownnotification = () => setNotification((prevState) => !prevState);

  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  const [navClass, setnavClass] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    const scrollup = window.pageYOffset;
    setnavClass(scrollup > 0 ? "nav-sticky" : "");
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get role-specific navigation items
  const getRoleBasedNavItems = () => {
    if (!isAuthenticated()) return null;

    if (user.role === 'employer') {
      return (
        <>
          <li><Link className="dropdown-item" to="/employer/dashboard">Dashboard</Link></li>
          <li><Link className="dropdown-item" to="/employer/post-job">Post Job</Link></li>
          <li><Link className="dropdown-item" to="/employer/manage-jobs">Manage Jobs</Link></li>
          <li><Link className="dropdown-item" to="/employer/applications">Applications</Link></li>
          <li><Link className="dropdown-item" to="/employer/profile">My Profile</Link></li>
        </>
      );
    } else if (user.role === 'jobseeker') {
      return (
        <>
          <li><Link className="dropdown-item" to="/jobseeker/dashboard">Dashboard</Link></li>
          <li><Link className="dropdown-item" to="/jobseeker/search-jobs">Search Jobs</Link></li>
          <li><Link className="dropdown-item" to="/jobseeker/applied-jobs">Applied Jobs</Link></li>
          <li><Link className="dropdown-item" to="/jobseeker/saved-jobs">Saved Jobs</Link></li>
          <li><Link className="dropdown-item" to="/jobseeker/profile">My Profile</Link></li>
        </>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
        id="navigation"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand text-dark fw-bold me-auto" to="/">
            <img src={darkLogo} height="22" alt="" className="logo-dark" />
            <img src={lightLogo} height="22" alt="" className="logo-light" />
          </Link>
          <div>
            <NavbarToggler
              className="me-3"
              type="button"
              onClick={toggle}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              <NavItem><Link className="nav-link" to="/">Home</Link></NavItem>
              <NavItem><Link className="nav-link" to="/joblist">Find a Job</Link></NavItem>
              <NavItem><Link className="nav-link" to="/aboutus">About Us</Link></NavItem>
              <NavItem><Link className="nav-link" to="/contact">Contact Us</Link></NavItem>
            </ul>
          </Collapse>

          <ul className="header-menu list-inline d-flex align-items-center mb-0">
            {/* Show login buttons if not authenticated */}
            {!isAuthenticated() ? (
              <>
                <li className="list-inline-item me-3">
                  <Link to="/employer/login" className="btn btn-outline-primary btn-sm">
                    Employer Login
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/jobseeker/login" className="btn btn-primary btn-sm">
                    Job Seeker Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Notification Dropdown - only for authenticated users */}
                <Dropdown
                  isOpen={notification}
                  toggle={dropDownnotification}
                  className="list-inline-item me-4"
                >
                  <DropdownToggle
                    href="#"
                    className="header-item noti-icon position-relative"
                    id="notification"
                    type="button"
                    tag="a"
                  >
                    <i className="mdi mdi-bell fs-22"></i>
                    <div className="count position-absolute">3</div>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-sm dropdown-menu-end p-0" end>
                    <div className="notification-header border-bottom bg-light">
                      <h6 className="mb-1">Notifications</h6>
                      <p className="text-muted fs-13 mb-0">You have 3 unread notifications</p>
                    </div>
                    <div className="notification-wrapper dropdown-scroll">
                      <Link to="#" className="text-dark notification-item d-block">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs bg-primary text-white rounded-circle text-center">
                              <i className="uil uil-bell"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">New notification</h6>
                            <p className="mb-0 fs-12 text-muted">
                              <i className="mdi mdi-clock-outline"></i> <span>5 min ago</span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </DropdownMenu>
                </Dropdown>

                {/* User Profile Dropdown */}
                <Dropdown
                  isOpen={userProfile}
                  toggle={dropDownuserprofile}
                  className="list-inline-item"
                >
                  <DropdownToggle
                    href="#"
                    className="header-item"
                    id="userdropdown"
                    type="button"
                    tag="a"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      width="35"
                      height="35"
                      className="rounded-circle me-1"
                    />
                    <span className="d-none d-md-inline-block fw-medium">
                      Hi, {user?.name || 'User'}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" end>
                    {getRoleBasedNavItems()}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
          </ul>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);