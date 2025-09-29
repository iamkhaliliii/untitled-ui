import { useState, useEffect } from "react";
import { Plus, Edit03, Trash02, BookmarkCheck, X, ArrowLeft, Download03, Save01, Settings01, Globe01, Calendar, MessageSquare01, UsersPlus, Zap, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { NexusLogo } from "@/components/foundations/logo/nexus-logo";
import { Link } from "react-router";
import navigationData from "@/data/navigation-data.json";
import { saveNavigationData, loadNavigationData, clearNavigationData, hasStoredData } from "@/api/navigation";

interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  status: string;
  statusColor: "gray" | "blue" | "success" | "orange";
}

interface NavigationData {
  admin: NavigationItem[];
  site: NavigationItem[];
  getStarted: NavigationItem[];
}

export const EditDashboard = () => {
  const [data, setData] = useState<NavigationData>(navigationData as NavigationData);
  const [editingItem, setEditingItem] = useState<{ section: keyof NavigationData; index: number } | null>(null);
  const [editForm, setEditForm] = useState<NavigationItem>({
    id: "",
    title: "",
    icon: "",
    path: "",
    status: "",
    statusColor: "gray"
  });
  const [showAddForm, setShowAddForm] = useState<keyof NavigationData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const storedData = await loadNavigationData();
        if (storedData) {
          setData(storedData);
          console.log('Loaded data from localStorage');
        } else {
          console.log('No stored data found, using default data');
          // Keep using the imported JSON data as fallback
        }
      } catch (error) {
        console.error('Failed to load data from storage, using fallback:', error);
        // Keep using the imported JSON data as fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const statusOptions = [
    { value: "On Hold", color: "gray" as const },
    { value: "Under Design", color: "blue" as const },
    { value: "Ready for Dev", color: "success" as const },
    { value: "Under Review", color: "orange" as const }
  ];

  const iconOptions = [
    "Settings01",
    "Globe01",
    "Calendar",
    "MessageSquare01",
    "UsersPlus",
    "Zap",
    "CheckCircle"
  ];

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Settings01: Settings01,
    Globe01: Globe01,
    Calendar: Calendar,
    MessageSquare01: MessageSquare01,
    UsersPlus: UsersPlus,
    Zap: Zap,
    CheckCircle: CheckCircle
  };

  const saveData = async () => {
    setIsSaving(true);
    try {
      await saveNavigationData(data);
      setHasChanges(false);
      
      // Create a success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
      notification.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Changes saved successfully!
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error('Failed to save data:', error);
      
      // Create an error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
      notification.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Failed to save changes. Please try again.
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'navigation-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset all data to default? This will remove all your changes.')) {
      clearNavigationData();
      setData(navigationData as NavigationData);
      setHasChanges(false);
      
      // Create a notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
      notification.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Data reset to default values
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  const startEdit = (section: keyof NavigationData, index: number) => {
    setEditingItem({ section, index });
    setEditForm({ ...data[section][index] });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({
      id: "",
      title: "",
      icon: "",
      path: "",
      status: "",
      statusColor: "gray"
    });
  };

  const saveEdit = () => {
    if (editingItem) {
      const newData = { ...data };
      newData[editingItem.section][editingItem.index] = { ...editForm };
      setData(newData);
      setEditingItem(null);
      setHasChanges(true);
    }
  };

  const deleteItem = (section: keyof NavigationData, index: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const newData = { ...data };
      newData[section].splice(index, 1);
      setData(newData);
      setHasChanges(true);
    }
  };

  const addItem = (section: keyof NavigationData) => {
    if (editForm.title && editForm.path) {
      const newData = { ...data };
      const newItem = {
        ...editForm,
        id: editForm.title.toLowerCase().replace(/\s+/g, '-')
      };
      newData[section].push(newItem);
      setData(newData);
      setShowAddForm(null);
      setEditForm({
        id: "",
        title: "",
        icon: "",
        path: "",
        status: "",
        statusColor: "gray"
      });
      setHasChanges(true);
    }
  };

  const renderSection = (sectionKey: keyof NavigationData, sectionTitle: string) => (
    <div className="space-y-3">
      {/* Add Form */}
      {showAddForm === sectionKey && (
        <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200">
          <h4 className="font-medium mb-3 text-primary">Add New Item</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Path"
              value={editForm.path}
              onChange={(e) => setEditForm({ ...editForm, path: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <select
              value={editForm.icon}
              onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select Icon</option>
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>📋 {icon}</option>
              ))}
            </select>
            <select
              value={editForm.status}
              onChange={(e) => {
                const selectedStatus = statusOptions.find(s => s.value === e.target.value);
                setEditForm({ 
                  ...editForm, 
                  status: e.target.value,
                  statusColor: selectedStatus?.color || "gray"
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>{status.value}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-3">
            <Button 
              size="sm" 
              onClick={() => addItem(sectionKey)} 
              isDisabled={!editForm.title || !editForm.path}
              iconLeading={Plus}
            >
              Add
            </Button>
            <Button size="sm" color="secondary" onClick={() => setShowAddForm(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(sectionKey)}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-brand-solid/50 hover:bg-gray-50 transition-colors"
        >
          <Plus className="size-5 mx-auto mb-2 text-gray-400" />
          <span className="text-sm text-gray-600">Add new item</span>
        </button>
      )}

      {/* Items */}
      {data[sectionKey].map((item, index) => (
        <div key={item.id}>
          {editingItem?.section === sectionKey && editingItem?.index === index ? (
            /* Edit Mode */
            <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200">
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editForm.path}
                  onChange={(e) => setEditForm({ ...editForm, path: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Path"
                />
                <select
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>📋 {icon}</option>
                  ))}
                </select>
                <select
                  value={editForm.status}
                  onChange={(e) => {
                    const selectedStatus = statusOptions.find(s => s.value === e.target.value);
                    setEditForm({ 
                      ...editForm, 
                      status: e.target.value,
                      statusColor: selectedStatus?.color || "gray"
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.value}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  onClick={saveEdit}
                  iconLeading={BookmarkCheck}
                >
                  Save
                </Button>
                <Button size="sm" color="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* View Mode - Card Style like Home Screen */
            <div className="group">
              <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                      {(() => {
                        const IconComponent = iconMap[item.icon] || Settings01;
                        return <IconComponent className="size-4 text-brand-solid" />;
                      })()}
                    </span>
                    <span className="text-sm font-medium text-primary">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={item.statusColor} size="sm">{item.status}</Badge>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="sm" 
                        color="tertiary" 
                        onClick={() => startEdit(sectionKey, index)}
                        iconLeading={Edit03}
                      />
                      <Button 
                        size="sm" 
                        color="tertiary" 
                        onClick={() => deleteItem(sectionKey, index)}
                        iconLeading={Trash02}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-tertiary">
                  {item.path}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="size-5" />
                <NexusLogo className="h-8 w-auto" />
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Navigation Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your navigation items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button color="tertiary" onClick={resetToDefault}>
                Reset
              </Button>
              <Button 
                color="tertiary" 
                onClick={downloadJSON}
                iconLeading={Download03}
              >
                Export JSON
              </Button>
              <Button 
                onClick={saveData} 
                isDisabled={!hasChanges || isSaving}
                isLoading={isSaving}
                iconLeading={Save01}
              >
                {isSaving ? 'Saving...' : hasChanges ? 'Save Changes' : 'All Saved'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Three-column Kanban-style layout */}
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* Admin column */}
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
            {renderSection("admin", "Admin Section")}
          </div>

          {/* Site column */}
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Site</div>
            {renderSection("site", "Site Section")}
          </div>

          {/* Get Started column */}
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Get Started</div>
            {renderSection("getStarted", "Get Started Section")}
          </div>
        </div>
      </div>
    </div>
  );
};
