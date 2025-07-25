import React, { useState } from "react";
import { UsersPlus, DotsVertical, Edit01, Trash01, Mail01, Download01, Eye, UserCheck01, SearchMd, CheckCircle, XCircle, Users01 } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Avatar } from "@/components/base/avatar/avatar";
import { Toggle } from "@/components/base/toggle/toggle";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Tabs } from "@/components/application/tabs/tabs";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

import { cx } from "@/utils/cx";

// Mock data for members
const mockMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    role: "Admin",
    status: "Active",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
    role: "Moderator",
    status: "Active",
    joinedDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
    role: "Member",
    status: "Inactive",
    joinedDate: "2024-02-01",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    avatar: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
    role: "Member",
    status: "Active",
    joinedDate: "2024-02-10",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
    role: "Member",
    status: "Active",
    joinedDate: "2024-02-15",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
    role: "Moderator",
    status: "Inactive",
    joinedDate: "2024-02-20",
  },
];

// Mock data for membership requests
const mockRequests = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex.chen@example.com",
    avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
    requestDate: "2024-03-01",
    message: "Hi, I'd love to join this space to connect with like-minded people and share my experiences.",
    status: "pending",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
    requestDate: "2024-03-02",
    message: "I'm interested in the events and discussions happening in this community.",
    status: "pending",
  },
  {
    id: 3,
    name: "James Thompson",
    email: "james.thompson@example.com",
    avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
    requestDate: "2024-02-28",
    message: "Looking forward to contributing to this amazing community!",
    status: "pending",
  },
];

const roleOptions = [
  { label: "Admin", id: "admin" },
  { label: "Moderator", id: "moderator" },
  { label: "Member", id: "member" },
];

export const EventsMembersSettings = () => {
  const theme = useResolvedTheme();
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState(mockMembers);
  const [requests, setRequests] = useState(mockRequests);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [autoSubscribe, setAutoSubscribe] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "member",
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const newMemberData = {
        id: Date.now(), // Simple ID generation
        name: newMember.name,
        email: newMember.email,
        avatar: "https://www.untitledui.com/images/avatars/default-avatar?fm=webp&q=80",
        role: newMember.role,
        status: "Active",
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setMembers([...members, newMemberData]);
      setNewMember({ name: "", email: "", role: "member" });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteMember = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const handleEditMember = (memberId: number) => {
    console.log("Edit member:", memberId);
    // Add edit functionality here
  };

  const handleInviteMember = (memberId: number) => {
    console.log("Invite member:", memberId);
    // Add invite functionality here
  };

  const handleChangeRoleToSpaceAdmin = (memberId: number) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, role: "Space Admin" }
        : member
    ));
    console.log("Changed member role to Space Admin:", memberId);
  };

  const handleExportData = () => {
    console.log("Export data triggered");
    // Add export functionality here
    const csvData = members.map(member => ({
      Name: member.name,
      Email: member.email,
      Role: member.role,
      Status: member.status,
      JoinedDate: member.joinedDate
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Role,Status,Joined Date\n"
      + csvData.map(row => `${row.Name},${row.Email},${row.Role},${row.Status},${row.JoinedDate}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "members-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchMembers = () => {
    console.log("Search members triggered");
    // Add search functionality here
  };

  const handleAcceptRequest = (requestId: number) => {
    const request = requests.find(req => req.id === requestId);
    if (request) {
      // Add to members
      const newMember = {
        id: Date.now(),
        name: request.name,
        email: request.email,
        avatar: request.avatar,
        role: "Member",
        status: "Active",
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setMembers([...members, newMember]);
      
      // Remove from requests
      setRequests(requests.filter(req => req.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId: number) => {
    setRequests(requests.filter(req => req.id !== requestId));
  };

  const getRoleStyles = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'space admin':
        return 'bg-violet-100 border border-violet-200 text-violet-600';
      case 'moderator':
        return 'bg-blue-100 border border-blue-200 text-blue-600';
      case 'member':
      default:
        return theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700 text-gray-300'
          : 'bg-gray-100 border border-gray-200 text-gray-600';
    }
  };

  const MemberActionsDropdown = ({ member }: { member: any }) => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover className="w-min">
        <Dropdown.Menu
          onAction={(key) => {
            if (key === "edit") {
              handleEditMember(member.id);
            } else if (key === "invite") {
              handleInviteMember(member.id);
            } else if (key === "change-role") {
              handleChangeRoleToSpaceAdmin(member.id);
            } else if (key === "delete") {
              handleDeleteMember(member.id);
            }
          }}
        >
          <Dropdown.Item 
            id="edit"
            icon={Eye}
          >
            <span className="pr-4">View Profile</span>
          </Dropdown.Item>
          <Dropdown.Item 
            id="invite"
            icon={Mail01}
          >
            <span className="pr-4">Send Message</span>
          </Dropdown.Item>
          <Dropdown.Item 
            id="change-role"
            icon={UserCheck01}
          >
            <span className="pr-4">Change Role to Space Admin</span>
          </Dropdown.Item>
          <Dropdown.Item 
            id="delete"
            icon={Trash01}
          >
            <span className="pr-4">Remove Member</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );



  const renderNotificationConfig = () => (
    <div className="mb-4">
      <h5 className="text-md font-semibold text-primary mb-3">Notification Config</h5>
      <Toggle
        label="Auto-subscribe new and existing members"
        hint="Enable this setting to automatically subscribe new and existing members to notifications for updates and posts, unless they have already adjusted their notification settings."
        size="sm"
        slim
        isSelected={autoSubscribe}
        onChange={(value) => setAutoSubscribe(value)}
      />
    </div>
  );

  const renderMembersList = () => (
    <div className="space-y-4">
      <div className="divide-y divide-gray-200">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between py-3 hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar 
                src={member.avatar} 
                alt={member.name}
                size="sm"
              />
              <div>
                <div className="font-medium text-primary text-sm">
                  {member.name}
                </div>
                <div className="text-xs text-tertiary">
                  <span className={`${getRoleStyles(member.role)} rounded-full px-1 py-0.5 text-[0.6rem]`}>
                    {member.role}
                  </span> • joined {new Date(member.joinedDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <MemberActionsDropdown member={member} />
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Form - simplified without modal */}
      {isAddModalOpen && (
        <div className="mt-4 p-4 border border-secondary rounded-lg bg-primary">
          <h5 className="text-md font-semibold text-primary mb-3">Add New Member</h5>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter member's full name"
              value={newMember.name}
              onChange={(value) => setNewMember({ ...newMember, name: value })}
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter member's email"
              value={newMember.email}
              onChange={(value) => setNewMember({ ...newMember, email: value })}
            />
            
            <Select
              label="Role"
              selectedKey={newMember.role}
              onSelectionChange={(value) => setNewMember({ ...newMember, role: value as string })}
              items={roleOptions}
            >
              {(item) => (
                <Select.Item id={item.id}>
                  {item.label}
                </Select.Item>
              )}
            </Select>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              color="secondary" 
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              color="primary" 
              size="sm"
              onClick={handleAddMember}
              disabled={!newMember.name || !newMember.email}
            >
              Add Member
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRequestsList = () => (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
            <Users01 className="w-6 h-6 text-tertiary" />
          </div>
          <h6 className="text-sm font-medium text-primary mb-1">No pending requests</h6>
          <p className="text-xs text-tertiary">New membership requests will appear here for approval.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between py-3 hover:bg-secondary/10 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar 
                  src={request.avatar} 
                  alt={request.name}
                  size="sm"
                />
                <div>
                  <div className="font-medium text-primary text-sm">
                    {request.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ButtonUtility
                  size="sm"
                  color="tertiary"
                  icon={CheckCircle}
                  tooltip="Approve"
                  onClick={() => handleAcceptRequest(request.id)}
                />
                <ButtonUtility
                  size="sm"
                  color="tertiary"
                  icon={XCircle}
                  tooltip="Decline"
                  onClick={() => handleRejectRequest(request.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const tabItems = [
    { id: "members", label: `Members (${members.length})` },
    { id: "requests", label: `Request List (${requests.length})` }
  ];

  return (
    <div className="space-y-4 p-4">
      {renderNotificationConfig()}

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h5 className="text-md font-semibold text-primary">Space Members</h5>
          <div className="flex items-center gap-2">
            <ButtonUtility
              size="sm"
              color="tertiary"
              icon={SearchMd}
              tooltip="Search Members"
              onClick={handleSearchMembers}
            />
            <ButtonUtility
              size="sm"
              color="tertiary"
              icon={Download01}
              tooltip="Export Data"
              onClick={handleExportData}
            />
            <ButtonUtility
              size="sm"
              color="tertiary"
              icon={UsersPlus}
              tooltip="Add Member"
              onClick={() => setIsAddModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
        <Tabs.List
          items={tabItems}
          type="underline"
          size="md"
        >
          {(item) => (
            <Tabs.Item key={item.id} id={item.id}>
              {item.label}
            </Tabs.Item>
          )}
        </Tabs.List>
        
        <div className="mt-6">
          <Tabs.Panel id="members">
            {activeTab === "members" && renderMembersList()}
          </Tabs.Panel>
          
          <Tabs.Panel id="requests">
            {activeTab === "requests" && renderRequestsList()}
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}; 