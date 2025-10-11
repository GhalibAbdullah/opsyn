import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";
import {
  BarChart3,
  Brain,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  Activity,
  Bell,
  HelpCircle,
  Workflow,
  Menu,
  Link,
} from "lucide-react";
import opsynLogo from "figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png";

import { MainPage } from "./components/pages/MainPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { Dashboard } from "./components/pages/Dashboard";
import { Analytics } from "./components/pages/Analytics";
import { Builder } from "./components/pages/Builder";
import { WorkflowsPage } from "./components/pages/WorkflowsPage";
import { Collaborate } from "./components/pages/Collaborate";
import { Integrations } from "./components/pages/Integrations";
import { SettingsPage } from "./components/pages/SettingsPage";

export default function App() {
  // Start with main page instead of dashboard
  const [currentPage, setCurrentPage] = useState("main");
  const [previousPage, setPreviousPage] = useState("main");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Global modal and filter state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [errorAnalysisOpen, setErrorAnalysisOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [workflowFilter, setWorkflowFilter] = useState("all");
  const [integrationFilter, setIntegrationFilter] = useState("all");
  const [integrationSearch, setIntegrationSearch] = useState("");
  const [errorFilter, setErrorFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Smart animate transition configurations
  const pageTransitions = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 }
  };

  const smartAnimateTransitions = {
    main: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 }
    },
    signup: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    }
  };

  // Page transition function with smart animations
  const navigateToPage = (newPage) => {
    if (newPage === currentPage) return;
    
    setIsTransitioning(true);
    setPreviousPage(currentPage);
    
    // For smart animate transitions, we don't need artificial delays
    setCurrentPage(newPage);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "builder", label: "Builder", icon: Brain },
    { id: "collaborate", label: "Collaborate", icon: Users },
    { id: "analytics", label: "Analytics", icon: Activity },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogin = () => {
    navigateToPage("dashboard");
  };

  const handleSignUp = () => {
    navigateToPage("signup");
  };

  const handleSignUpComplete = () => {
    // After successful sign up, redirect to dashboard
    navigateToPage("dashboard");
  };

  const handleBackToMain = () => {
    navigateToPage("main");
  };

  const handleLogout = () => {
    navigateToPage("main");
  };

  const renderCurrentPage = () => {
    const pageProps = {
      shareModalOpen,
      setShareModalOpen,
      errorAnalysisOpen,
      setErrorAnalysisOpen,
      integrationModalOpen,
      setIntegrationModalOpen,
      selectedIntegration,
      setSelectedIntegration,
      workflowFilter,
      setWorkflowFilter,
      integrationFilter,
      setIntegrationFilter,
      integrationSearch,
      setIntegrationSearch,
      errorFilter,
      setErrorFilter,
    };

    const getTransition = (page) => {
      if (page === "main" || page === "signup") {
        return smartAnimateTransitions[page] || pageTransitions;
      }
      return pageTransitions;
    };

    const transition = getTransition(currentPage);

    switch (currentPage) {
      case "main":
        return (
          <motion.div
            key="main"
            initial={transition.initial}
            animate={transition.animate}
            exit={transition.exit}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1], // Custom easing for smooth feel
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 }
            }}
            className="w-full h-full"
          >
            <MainPage
              onLogin={handleLogin}
              onSignUp={handleSignUp}
            />
          </motion.div>
        );
      case "signup":
        return (
          <motion.div
            key="signup"
            initial={transition.initial}
            animate={transition.animate}
            exit={transition.exit}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 }
            }}
            className="w-full h-full"
          >
            <SignUpPage
              onBack={handleBackToMain}
              onSignUpComplete={handleSignUpComplete}
            />
          </motion.div>
        );
      case "dashboard":
        return (
          <motion.div
            key="dashboard"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Dashboard />
          </motion.div>
        );
      case "workflows":
        return (
          <motion.div
            key="workflows"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <WorkflowsPage {...pageProps} />
          </motion.div>
        );
      case "builder":
        return (
          <motion.div
            key="builder"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Builder {...pageProps} />
          </motion.div>
        );
      case "collaborate":
        return (
          <motion.div
            key="collaborate"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Collaborate />
          </motion.div>
        );
      case "analytics":
        return (
          <motion.div
            key="analytics"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Analytics {...pageProps} />
          </motion.div>
        );
      case "integrations":
        return (
          <motion.div
            key="integrations"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Integrations {...pageProps} />
          </motion.div>
        );
      case "settings":
        return (
          <motion.div
            key="settings"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <SettingsPage />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="main-default"
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <MainPage
              onLogin={handleLogin}
              onSignUp={handleSignUp}
            />
          </motion.div>
        );
    }
  };

  // Show full-screen layout for main page and signup page with smart animations
  if (currentPage === "main" || currentPage === "signup") {
    return (
      <div className="w-full h-screen overflow-auto">
        <AnimatePresence mode="wait" initial={false}>
          {renderCurrentPage()}
        </AnimatePresence>
      </div>
    );
  }

  // Show dashboard layout for authenticated pages with standard transitions
  return (
    <div className="h-screen flex m-0 p-0" style={{ backgroundColor: '#0E0E10' }}>
      {/* Left Sidebar */}
      <motion.div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} flex-shrink-0 m-0 p-0`}
        style={{ 
          background: 'linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)'
        }}
        animate={{ width: sidebarCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="h-full flex flex-col m-0 p-0">
          {/* Logo */}
          <div className="px-4 py-6 border-b border-white/10" style={{ margin: 0, padding: '1.5rem 1rem' }}>
            <div className="flex items-center">
              <motion.img
                src={opsynLogo}
                alt="OPSYN"
                className="h-8 w-auto"
                layoutId="opsyn-logo"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 font-semibold" 
                    style={{ color: '#EAEAEA' }}
                  >
                    OPSYN
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => navigateToPage(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-white"
                        : "hover:bg-white/10 hover:text-white"
                    }`}
                    style={{
                      backgroundColor: isActive ? '#1D0210' : 'transparent',
                      color: isActive ? '#EAEAEA' : '#A1A1A5'
                    }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      hover: { duration: 0.2 },
                      tap: { duration: 0.1 }
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-white/10">
            <motion.button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              style={{ color: '#A1A1A5' }}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                hover: { duration: 0.2 },
                tap: { duration: 0.1 }
              }}
            >
              <LogOut className="h-5 w-5" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden m-0 p-0">
        {/* Top Bar */}
        <div className="border-b" style={{ 
          backgroundColor: '#000000', 
          borderColor: 'rgba(255, 255, 255, 0.1)',
          margin: 0,
          padding: '1.5rem 1.5rem'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSidebarCollapsed(!sidebarCollapsed)
                  }
                  style={{ color: '#A1A1A5' }}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Search */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#6D6D70' }} />
                <Input
                  placeholder="Search workflows, integrations..."
                  className="pl-10 w-80 border-0"
                  style={{ 
                    backgroundColor: '#0E0E10', 
                    color: '#EAEAEA',
                    '::placeholder': { color: '#6D6D70' }
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" style={{ color: '#A1A1A5' }}>
                  <Bell className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" style={{ color: '#A1A1A5' }}>
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Sarah Chen
                  </div>
                  <div className="text-xs" style={{ color: '#6D6D70' }}>
                    Admin
                  </div>
                </div>
                <ChevronDown className="h-4 w-4" style={{ color: '#6D6D70' }} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: '#000000' }}>
          <AnimatePresence mode="wait">
            {renderCurrentPage()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}