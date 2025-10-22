import React, { useState, Suspense } from "react";
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
  Link as LinkIcon,
} from "lucide-react";
import opsynLogo from "figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png";

/* ---------------- Error Boundary ---------------- */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0E0E10",
            color: "#EAEAEA",
            padding: 24,
            fontFamily: "ui-sans-serif, system-ui",
          }}
        >
          <h1 style={{ fontSize: 20, marginBottom: 8 }}>Something went wrong.</h1>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#141419",
              border: "1px solid rgba(161,161,165,.4)",
              borderRadius: 12,
              padding: 12,
              color: "#ff9",
              overflowX: "auto",
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* --------- Safe lazy helpers (support named or default) --------- */
const lazyDefault = <T extends any>(loader: () => Promise<{ default: T }>) =>
  React.lazy(loader);

// try default export; if absent, map a named export to default
const lazyEither = <T extends any>(
  loader: () => Promise<any>,
  named?: string
) =>
  React.lazy(async () => {
    const mod = await loader();
    if (mod?.default) return { default: mod.default as T };
    if (named && mod[named]) return { default: mod[named] as T };
    throw new Error(
      `Failed to load module: neither default nor named export "${named}" found.`
    );
  });

/* --------- Pages (SAFE lazy imports) --------- */
// These match your previous imports where some were named exports:
const MainPage = lazyEither(() => import("./components/pages/MainPage"), "MainPage");
const SignUpPage = lazyEither(() => import("./components/pages/SignUpPage"), "SignUpPage");
const LoginPage = lazyEither(() => import("./components/pages/LoginPage"), "default");
const ResetPasswordPage = lazyEither(
  () => import("./components/pages/ResetPasswordPage"),
  "default"
);

const Dashboard = lazyEither(() => import("./components/pages/Dashboard"), "Dashboard");
const Analytics = lazyEither(() => import("./components/pages/Analytics"), "Analytics");
const Builder = lazyEither(() => import("./components/pages/Builder"), "Builder");
const WorkflowsPage = lazyEither(
  () => import("./components/pages/WorkflowsPage"),
  "WorkflowsPage"
);
const Collaborate = lazyEither(
  () => import("./components/pages/Collaborate"),
  "Collaborate"
);
const Integrations = lazyEither(
  () => import("./components/pages/Integrations"),
  "Integrations"
);
const SettingsPage = lazyEither(
  () => import("./components/pages/SettingsPage"),
  "SettingsPage"
);

/* ------------------- App ------------------- */
export default function App() {
  type Page =
    | "main"
    | "signup"
    | "login"
    | "reset-password"
    | "dashboard"
    | "workflows"
    | "builder"
    | "collaborate"
    | "analytics"
    | "integrations"
    | "settings";

  const [currentPage, setCurrentPage] = useState<Page>("main");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");

  // Transitions
  const pageTransitions = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 },
  };
  const smartAnimateTransitions: Record<string, any> = {
    main: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 100 } },
    signup: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -100 } },
    login: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -100 } },
    "reset-password": { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -100 } },
  };

  const navigateToPage = (p: Page) => setCurrentPage(p);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "builder", label: "Builder", icon: Brain },
    { id: "collaborate", label: "Collaborate", icon: Users },
    { id: "analytics", label: "Analytics", icon: Activity },
    { id: "integrations", label: "Integrations", icon: LinkIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  // Global states you already had
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [errorAnalysisOpen, setErrorAnalysisOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [workflowFilter, setWorkflowFilter] = useState("all");
  const [integrationFilter, setIntegrationFilter] = useState("all");
  const [integrationSearch, setIntegrationSearch] = useState("");
  const [errorFilter, setErrorFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => navigateToPage("login");
  const handleSignUp = () => navigateToPage("signup");
  const handleSignUpComplete = () => navigateToPage("dashboard");
  const handleLoginComplete = () => navigateToPage("dashboard");
  const handleBackToMain = () => navigateToPage("main");
  const handleLogout = () => navigateToPage("main");

  const handleForgotPassword = (emailFromLogin: string) => {
    setPrefillEmail(emailFromLogin || "");
    navigateToPage("reset-password");
  };

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

  const getTransition = (page: Page) =>
    page === "main" || page === "signup" || page === "login" || page === "reset-password"
      ? smartAnimateTransitions[page] || pageTransitions
      : pageTransitions;

  const Fallback = (
    <div style={{ color: "#EAEAEA", padding: 16, fontFamily: "ui-sans-serif, system-ui" }}>
      Loading…
    </div>
  );

  const renderCurrentPage = () => {
    const transition = getTransition(currentPage);
    switch (currentPage) {
      case "main":
        return (
          <motion.div key="main" initial={transition.initial} animate={transition.animate} exit={transition.exit}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], scale: { duration: 0.4 }, opacity: { duration: 0.3 } }}
            className="w-full h-full"
          >
            <Suspense fallback={Fallback}>
              <MainPage onLogin={handleLogin} onSignUp={handleSignUp} />
            </Suspense>
          </motion.div>
        );

      case "signup":
        return (
          <motion.div key="signup" initial={transition.initial} animate={transition.animate} exit={transition.exit}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], scale: { duration: 0.4 }, opacity: { duration: 0.3 } }}
            className="w-full h-full"
          >
            <Suspense fallback={Fallback}>
              <SignUpPage onBack={handleBackToMain} onSignUpComplete={handleSignUpComplete} />
            </Suspense>
          </motion.div>
        );

      case "login":
        return (
          <motion.div key="login" initial={transition.initial} animate={transition.animate} exit={transition.exit}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], scale: { duration: 0.4 }, opacity: { duration: 0.3 } }}
            className="w-full h-full"
          >
            <Suspense fallback={Fallback}>
              <LoginPage
                onBack={handleBackToMain}
                onLoginComplete={handleLoginComplete}
                onForgotPassword={handleForgotPassword}
              />
            </Suspense>
          </motion.div>
        );

      case "reset-password":
        return (
          <motion.div key="reset" initial={transition.initial} animate={transition.animate} exit={transition.exit}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], scale: { duration: 0.4 }, opacity: { duration: 0.3 } }}
            className="w-full h-full"
          >
            <Suspense fallback={Fallback}>
              <ResetPasswordPage
                initialEmail={prefillEmail}
                onBack={() => navigateToPage("login")}
                onSent={() => navigateToPage("login")}
              />
            </Suspense>
          </motion.div>
        );

      case "dashboard":
        return (
          <motion.div key="dashboard" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <Dashboard />
            </Suspense>
          </motion.div>
        );

      case "workflows":
        return (
          <motion.div key="workflows" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <WorkflowsPage {...pageProps} />
            </Suspense>
          </motion.div>
        );

      case "builder":
        return (
          <motion.div key="builder" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <Builder {...pageProps} />
            </Suspense>
          </motion.div>
        );

      case "collaborate":
        return (
          <motion.div key="collaborate" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <Collaborate />
            </Suspense>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div key="analytics" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <Analytics {...pageProps} />
            </Suspense>
          </motion.div>
        );

      case "integrations":
        return (
          <motion.div key="integrations" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <Integrations {...pageProps} />
            </Suspense>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div key="settings" initial={pageTransitions.initial} animate={pageTransitions.animate} exit={pageTransitions.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={Fallback}>
              <SettingsPage />
            </Suspense>
          </motion.div>
        );
    }
  };

  // Main/splash-like pages fill the screen
  if (["main", "signup", "login", "reset-password"].includes(currentPage)) {
    return (
      <ErrorBoundary>
        <div className="w-full h-screen overflow-auto">
          <AnimatePresence mode="wait" initial={false}>
            {renderCurrentPage()}
          </AnimatePresence>
        </div>
      </ErrorBoundary>
    );
  }

  // Authenticated layout (sidebar + content)
  return (
    <ErrorBoundary>
      <div className="h-screen flex m-0 p-0" style={{ backgroundColor: "#0E0E10" }}>
        {/* Sidebar */}
        <motion.div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} flex-shrink-0 m-0 p-0`}
          style={{
            background:
              "linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)",
          }}
          animate={{ width: sidebarCollapsed ? 64 : 256 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="h-full flex flex-col m-0 p-0">
            {/* Logo */}
            <div className="px-4 py-6 border-b border-white/10" style={{ margin: 0, padding: "1.5rem 1rem" }}>
              <div className="flex items-center">
                <motion.img
                  src={opsynLogo}
                  alt="OPSYN"
                  className="h-8 w-auto"
                  layoutId="opsyn-logo"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 font-semibold"
                    style={{ color: "#EAEAEA" }}
                  >
                    OPSYN
                  </motion.span>
                )}
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4">
              <div className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === (item.id as Page);
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => navigateToPage(item.id as Page)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                        isActive ? "text-white" : "hover:bg-white/10 hover:text-white"
                      }`}
                      style={{
                        backgroundColor: isActive ? "#1D0210" : "transparent",
                        color: isActive ? "#EAEAEA" : "#A1A1A5",
                      }}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        hover: { duration: 0.2 },
                        tap: { duration: 0.1 },
                      }}
                    >
                      <Icon className="h-5 w-5" />
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
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-white/10">
              <motion.button
                onClick={() => navigateToPage("main")}
                className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                style={{ color: "#A1A1A5" }}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ hover: { duration: 0.2 }, tap: { duration: 0.1 } }}
              >
                <LogOut className="h-5 w-5" />
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
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden m-0 p-0">
          {/* Top bar */}
          <div
            className="border-b"
            style={{
              backgroundColor: "#000000",
              borderColor: "rgba(255, 255, 255, 0.1)",
              margin: 0,
              padding: "1.5rem 1.5rem",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    style={{ color: "#A1A1A5" }}
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
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: "#6D6D70" }}
                  />
                  <Input
                    placeholder="Search workflows, integrations..."
                    className="pl-10 w-80 border-0"
                    style={{ backgroundColor: "#0E0E10", color: "#EAEAEA" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </motion.div>
              </div>

              {/* User */}
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" style={{ color: "#A1A1A5" }}>
                    <Bell className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" style={{ color: "#A1A1A5" }}>
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
                    <div className="text-sm font-medium" style={{ color: "#EAEAEA" }}>
                      Sarah Chen
                    </div>
                    <div className="text-xs" style={{ color: "#6D6D70" }}>
                      Admin
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" style={{ color: "#6D6D70" }} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: "#000000" }}>
            <AnimatePresence mode="wait" initial={false}>
              {renderCurrentPage()}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
