import MainLayout from "./components/layout/MainLayout";
import HeroSection from "./components/dashboard/HeroSection";
import FeatureGrid from "./components/dashboard/FeatureGrid";
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
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4">
        {activeTab === "dashboard" && <DashboardView setActiveTab={setActiveTab} />}
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
        
        {/* Fallback for AI if accessed directly (though it's now in FAB) */}
        {activeTab === "ai" && <SarthiAI />}
      </div>
    </MainLayout>
  );
}

function DashboardView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <HeroSection setActiveTab={setActiveTab} />
      <FeatureGrid setActiveTab={setActiveTab} />
    </div>
  );
}
