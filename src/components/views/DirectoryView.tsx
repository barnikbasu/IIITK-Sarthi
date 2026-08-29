import React, { useState } from "react";
import PeopleHero from "../people/PeopleHero";
import FacultyDirectory from "../people/FacultyDirectory";
import AdministrationDirectory from "../people/AdministrationDirectory";
import GovernanceView from "../people/GovernanceView";
import ResearchExpertiseGraph from "../people/ResearchExpertiseGraph";
import MessagingHub from "../people/messaging/MessagingHub";
import WhoCanHelpModal from "../people/WhoCanHelpModal";
import PeopleCommandPalette from "../people/PeopleCommandPalette";
import FacultyProfileModal from "../people/FacultyProfileModal";
import MessageComposerModal from "../people/messaging/MessageComposerModal";
import AppointmentRequestModal from "../people/messaging/AppointmentRequestModal";
import { 
  FacultyMember, 
  AdministrativeOfficer, 
  AcademicAttachment, 
  MessageCategory,
  sampleAcademicConversations
} from "../../data/peopleData";

export default function DirectoryView() {
  const [activeTab, setActiveTab] = useState<"faculty" | "administration" | "governance" | "research" | "messages">("faculty");
  const [isWhoCanHelpOpen, setIsWhoCanHelpOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Modals & Active Profiles
  const [selectedFacultyForProfile, setSelectedFacultyForProfile] = useState<FacultyMember | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Direct Messaging modal state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [directComposeTarget, setDirectComposeTarget] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  // Appointment Modal
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [targetFacultyForAppointment, setTargetFacultyForAppointment] = useState<FacultyMember | null>(null);

  // Unread badge count
  const unreadMessagesCount = sampleAcademicConversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // Handlers
  const handleOpenFacultyProfile = (faculty: FacultyMember) => {
    setSelectedFacultyForProfile(faculty);
    setIsProfileModalOpen(true);
  };

  const handleSendMessageToFaculty = (faculty: FacultyMember) => {
    setDirectComposeTarget({
      name: faculty.name,
      email: faculty.email,
      role: `${faculty.designation} (${faculty.departmentShort})`
    });
    setIsComposerOpen(true);
  };

  const handleSendMessageToOfficer = (officer: AdministrativeOfficer) => {
    setDirectComposeTarget({
      name: officer.name,
      email: officer.email,
      role: `${officer.designation} (${officer.officeName})`
    });
    setIsComposerOpen(true);
  };

  const handleRequestAppointment = (faculty: FacultyMember) => {
    setTargetFacultyForAppointment(faculty);
    setIsAppointmentOpen(true);
  };

  const handleWhoCanHelpSelect = (targetEmail: string, targetName: string) => {
    setDirectComposeTarget({
      name: targetName,
      email: targetEmail,
      role: "Designated Institutional Authority"
    });
    setIsComposerOpen(true);
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Editorial Master Hero */}
      <PeopleHero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWhoCanHelp={() => setIsWhoCanHelpOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        unreadCount={unreadMessagesCount}
      />

      {/* Main Tab Views */}
      <div className="pt-2">
        {activeTab === "faculty" && (
          <FacultyDirectory
            onSendMessage={handleSendMessageToFaculty}
            onRequestAppointment={handleRequestAppointment}
            onOpenWhoCanHelp={() => setIsWhoCanHelpOpen(true)}
          />
        )}

        {activeTab === "administration" && (
          <AdministrationDirectory
            onSendMessage={handleSendMessageToOfficer}
            onOpenWhoCanHelp={() => setIsWhoCanHelpOpen(true)}
          />
        )}

        {activeTab === "governance" && (
          <GovernanceView />
        )}

        {activeTab === "research" && (
          <ResearchExpertiseGraph
            onSelectFaculty={handleOpenFacultyProfile}
            onSendMessage={handleSendMessageToFaculty}
          />
        )}

        {activeTab === "messages" && (
          <MessagingHub
            onOpenWhoCanHelp={() => setIsWhoCanHelpOpen(true)}
            directComposeTarget={directComposeTarget}
            onClearDirectCompose={() => setDirectComposeTarget(null)}
          />
        )}
      </div>

      {/* "Who Can Help?" Navigator Modal */}
      <WhoCanHelpModal
        isOpen={isWhoCanHelpOpen}
        onClose={() => setIsWhoCanHelpOpen(false)}
        onSelectAction={handleWhoCanHelpSelect}
      />

      {/* Global Command Palette (⌘K) */}
      <PeopleCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectFaculty={(faculty) => {
          setSelectedFacultyForProfile(faculty);
          setIsProfileModalOpen(true);
        }}
        onSelectAdministration={(officer) => {
          setActiveTab("administration");
        }}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenWhoCanHelp={() => setIsWhoCanHelpOpen(true)}
      />

      {/* Faculty Profile Modal */}
      <FacultyProfileModal
        faculty={selectedFacultyForProfile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSendMessage={(faculty) => {
          setIsProfileModalOpen(false);
          handleSendMessageToFaculty(faculty);
        }}
        onRequestAppointment={(faculty) => {
          setIsProfileModalOpen(false);
          handleRequestAppointment(faculty);
        }}
      />

      {/* Standalone Message Composer Modal (Triggered from cards/buttons) */}
      <MessageComposerModal
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setDirectComposeTarget(null);
        }}
        recipientName={directComposeTarget?.name}
        recipientEmail={directComposeTarget?.email}
        recipientRole={directComposeTarget?.role}
        onSend={(data) => {
          // Switch to messages tab and view
          setActiveTab("messages");
        }}
      />

      {/* Appointment Request Modal */}
      <AppointmentRequestModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setTargetFacultyForAppointment(null);
        }}
        faculty={targetFacultyForAppointment}
        onSubmit={(appointmentData) => {
          console.log("Appointment booked:", appointmentData);
        }}
      />
    </div>
  );
}
