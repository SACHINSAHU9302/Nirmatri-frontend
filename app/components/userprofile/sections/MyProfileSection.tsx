"use client";

import { useState } from "react";
import {
  Edit2,
  Lock,
  Mail,
  Phone,
  User,
  Loader2,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Shield,
  Bell,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/app/components/ui/separator";

export function MyProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const [profile, setProfile] = useState({
    name: "Rahul Kumar",
    email: "rahul.kumar@gmail.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    dob: "15 March 1990",
    occupation: "Senior Software Engineer",
    company: "TechCorp Solutions",
    website: "www.rahulkumar.dev",
    bio: "Passionate software developer with 8+ years of experience in web technologies. Love building scalable applications and mentoring junior developers.",
    joinedDate: "January 2020",
    status: "Active",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    privacyMode: false,
  });

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setIsEditing(false);
  };

  const toggleSecuritySetting = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and account settings
          </p>
        </div>

        <Button
          onClick={handleEditSave}
          disabled={saving}
          className={`gap-2 self-start sm:self-auto ${
            isEditing
              ? "bg-orange-500 hover:bg-orange-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black"
              : "border border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10"
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </>
          )}
        </Button>
      </div>

      {/* ================= MAIN PROFILE LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - ACCOUNT INFO */}
        <div className="lg:col-span-1 space-y-6">
          {/* ACCOUNT STATUS CARD */}
          <Card className="bg-white dark:bg-[#0f0f10] border border-gray-200 dark:border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500 dark:text-blue-400" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Account Status</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {profile.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                <span className="font-medium">{profile.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Login</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Email Notifications</span>
                  </div>
                  <Switch 
                    checked={securitySettings.emailNotifications}
                    onCheckedChange={() => toggleSecuritySetting('emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">SMS Notifications</span>
                  </div>
                  <Switch 
                    checked={securitySettings.smsNotifications}
                    onCheckedChange={() => toggleSecuritySetting('smsNotifications')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QUICK ACTIONS CARD */}
          <Card className="bg-white dark:bg-[#0f0f10] border border-gray-200 dark:border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("security")}
              >
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("personal")}
              >
                <User className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <Shield className="w-4 h-4" />
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - PROFILE INFORMATION */}
        <div className="lg:col-span-2 space-y-6">
          {/* TABS FOR DIFFERENT SECTIONS */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="professional">
                <Briefcase className="w-4 h-4 mr-2" />
                Professional
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* PERSONAL INFO TAB */}
            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-white dark:bg-[#0f0f10] border border-gray-200 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500 dark:text-blue-400" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* HORIZONTAL INFO BOXES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Full Name</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.name}</p>
                      )}
                    </div>

                    {/* Email Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Email Address</Label>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">{profile.email}</p>
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      </div>
                    </div>

                    {/* Phone Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Phone Number</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.phone}</p>
                      )}
                    </div>

                    {/* Location Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Location</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.location}</p>
                      )}
                    </div>

                    {/* Date of Birth Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Date of Birth</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.dob}
                          onChange={(e) => setProfile({...profile, dob: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.dob}</p>
                      )}
                    </div>

                    {/* Website Box */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Website</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.website}
                          onChange={(e) => setProfile({...profile, website: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {profile.website}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Bio
                    </Label>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full min-h-[120px] p-3 border border-orange-200 dark:border-blue-800 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                        <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PROFESSIONAL INFO TAB */}
            <TabsContent value="professional" className="space-y-6">
              <Card className="bg-white dark:bg-[#0f0f10] border border-gray-200 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-500 dark:text-blue-400" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Occupation</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.occupation}
                          onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.occupation}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        <Label className="text-sm font-medium">Company</Label>
                      </div>
                      {isEditing ? (
                        <Input
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="border-orange-200 dark:border-blue-800"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.company}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Work Experience
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <p className="text-gray-600 dark:text-gray-400">
                        {profile.occupation} at {profile.company} since {profile.joinedDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-white dark:bg-[#0f0f10] border border-gray-200 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange-500 dark:text-blue-400" />
                    Password & Security
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                          </div>
                        </div>
                        <Switch 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={() => toggleSecuritySetting('twoFactorAuth')}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Login Alerts</p>
                            <p className="text-sm text-gray-500">Get notified for new logins</p>
                          </div>
                        </div>
                        <Switch 
                          checked={securitySettings.loginAlerts}
                          onCheckedChange={() => toggleSecuritySetting('loginAlerts')}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="font-medium">Privacy Mode</p>
                            <p className="text-sm text-gray-500">Hide your online status</p>
                          </div>
                        </div>
                        <Switch 
                          checked={securitySettings.privacyMode}
                          onCheckedChange={() => toggleSecuritySetting('privacyMode')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                          className="border-orange-200 dark:border-blue-800"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          className="border-orange-200 dark:border-blue-800"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          className="border-orange-200 dark:border-blue-800"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setUpdatingPassword(true)}
                        disabled={updatingPassword}
                        className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
                      >
                        {updatingPassword ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}