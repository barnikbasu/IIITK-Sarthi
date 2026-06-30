import MainLayout from "./components/layout/MainLayout";
import UnifiedDashboard from "./components/dashboard/UnifiedDashboard";
import SarthiAI from "./components/ai/SarthiAI";
import ScheduleView from "./components/views/ScheduleView";
import ResourcesView from "./components/views/ResourcesView";
import MarketView from "./components/views/MarketView";
import MapView from "./components/views/MapView";
import TasksView from "./components/views/TasksView";
import OpportunitiesView from "./components/views/OpportunitiesView";
import EmergencyView from "./components/views/EmergencyView";
import DirectoryView from "./components/views/DirectoryView";
import ClubsView from "./components/views/ClubsView";
import AnalyticsView from "./components/views/AnalyticsView";
import SettingsView from "./components/views/SettingsView";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4">
        {activeTab === "dashboard" && <UnifiedDashboard setActiveTab={setActiveTab} />}
        {activeTab === "tasks" && <TasksView />}
        {activeTab === "opportunities" && <OpportunitiesView />}
        {activeTab === "resources" && <ResourcesView />}
        {activeTab === "market" && <MarketView />}
        {activeTab === "directory" && <DirectoryView />}
        {activeTab === "schedule" && <ScheduleView />}
        {activeTab === "emergency" && <EmergencyView />}
        {activeTab === "clubs" && <ClubsView />}
        {activeTab === "analytics" && <AnalyticsView />}
        {activeTab === "map" && <MapView />}
        {activeTab === "settings" && <SettingsView />}
        
        {/* Fallback for AI if accessed directly (though it's now in FAB) */}
        {activeTab === "ai" && <SarthiAI />}
      </div>
    </MainLayout>
  );
}
