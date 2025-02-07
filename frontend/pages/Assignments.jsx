import { ThemeProvider } from "../context/ThemeContext";
import DashHeader from "../components/DashHeader";
import DashboardSidebar from "../components/DashboardSidebar";
// import QuoteDisplay from "../components/QuoteDisplay";
import AssignmentsManager from "../components/AssignmentsManager";
// import { TaskProvider } from "../context/TaskContext";
const Dashboard = () => {
  return (
    <ThemeProvider>
      <div className="h-screen">
        <DashHeader />
        <div className="fixed top-0 left-0 h-full w-[250px]">
          <DashboardSidebar />
        </div>
        <div className="ml-[250px] overflow-y-auto h-screen">
          {/* <QuoteDisplay /> */}
          <AssignmentsManager />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
