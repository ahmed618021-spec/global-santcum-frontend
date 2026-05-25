"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UsersTab = "all-users" | "roles" | "activity" | "invites";

type TeamUser = {
  initials: string;
  avatarTone: "admin" | "developer" | "va" | "advisor" | "content" | "support";
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
  online: "Online" | "Away" | "Offline" | "Pending";
  permissions: string[];
  lastActive: string;
  detail: string;
};

const users: TeamUser[] = [
  {
    initials: "KM",
    avatarTone: "admin",
    name: "Kate Morrison",
    email: "kate@theglobalsanctum.com",
    role: "Admin",
    status: "Active",
    online: "Online",
    permissions: ["Full Access"],
    lastActive: "Now",
    detail: "Brisbane, AU",
  },
  {
    initials: "IZ",
    avatarTone: "developer",
    name: "Izhar",
    email: "izhar@webflow.dev",
    role: "Developer",
    status: "Active",
    online: "Online",
    permissions: ["Venues", "Content", "Settings"],
    lastActive: "Now",
    detail: "Webflow Dev",
  },
  {
    initials: "MH",
    avatarTone: "developer",
    name: "Muhammad",
    email: "muhammad@dev.com",
    role: "Developer",
    status: "Active",
    online: "Away",
    permissions: ["Venues", "Bookings", "Settings"],
    lastActive: "2 hours ago",
    detail: "Backend Dev",
  },
  {
    initials: "DN",
    avatarTone: "advisor",
    name: "Dan",
    email: "dan@techadvisor.com",
    role: "Technical Advisor",
    status: "Active",
    online: "Offline",
    permissions: ["Analytics", "Settings"],
    lastActive: "3 days ago",
    detail: "System Architecture",
  },
  {
    initials: "VA1",
    avatarTone: "va",
    name: "Maria Santos",
    email: "maria@va-team.com",
    role: "Virtual Assistant",
    status: "Active",
    online: "Online",
    permissions: ["Venues", "Content"],
    lastActive: "Now",
    detail: "Venue Curation",
  },
  {
    initials: "VA2",
    avatarTone: "va",
    name: "James Reyes",
    email: "james@va-team.com",
    role: "Virtual Assistant",
    status: "Active",
    online: "Offline",
    permissions: ["Venues", "Content"],
    lastActive: "Yesterday",
    detail: "Venue Curation",
  },
  {
    initials: "SC",
    avatarTone: "content",
    name: "Sarah Chen",
    email: "sarah@theglobalsanctum.com",
    role: "Content Writer",
    status: "Active",
    online: "Offline",
    permissions: ["Content", "Analytics"],
    lastActive: "2 days ago",
    detail: "Wellness Edit",
  },
  {
    initials: "JD",
    avatarTone: "support",
    name: "Julie Davis",
    email: "julie@wellness.us",
    role: "Partner",
    status: "Invited",
    online: "Pending",
    permissions: ["Venues", "Bookings"],
    lastActive: "Pending",
    detail: "US Market Partner",
  },
];

const tabs: Array<{ key: UsersTab; label: string; count?: number }> = [
  { key: "all-users", label: "All Users", count: 8 },
  { key: "roles", label: "Roles & Permissions" },
  { key: "activity", label: "Activity Log" },
  { key: "invites", label: "Pending Invites", count: 1 },
];

const activityRows = [
  ["KM", "Kate Morrison logged in from Brisbane, AU", "Today at 9:42 AM", "Login"],
  ["VA1", "Maria Santos added 12 new venues to the database", "Today at 9:15 AM", "Create"],
  ["IZ", "Izhar updated venue listing template settings", "Today at 8:30 AM", "Edit"],
  ["KM", "Kate Morrison exported subscriber list from Sanctum Journal", "Yesterday at 4:22 PM", "Export"],
  ["MH", "Muhammad updated booking confirmation email template", "Yesterday at 2:15 PM", "Edit"],
];

export default function PortalUsersPage() {
  const [activeTab, setActiveTab] = useState<UsersTab>("all-users");
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    const q = query.toLowerCase();
    return users.filter((user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q) || user.role.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">System</p>
            <Link href="/portal/tgs-internal-portal-analytics" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Analytics</Link>
            <Link href="/portal/tgs-internal-portal-users" className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white">Users & Team</Link>
            <Link href="/portal/tgs-internal-portal-settings" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Settings</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Users & Team</h1>
              <span className="rounded-full bg-gradient-to-br from-[#E8EFF9] to-[#E8F4EA] px-3 py-1.5 text-[11px] font-medium text-[#6B8EC9]">Internal Operations</span>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">Export</button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white">Invite User</button>
            </div>
          </header>

          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center"><p className="font-[Cormorant_Garamond,serif] text-[32px]">8</p><p className="text-[11px] uppercase text-[#B8B8B8]">Total Team</p></article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center"><p className="font-[Cormorant_Garamond,serif] text-[32px] text-[#4A7C59]">6</p><p className="text-[11px] uppercase text-[#B8B8B8]">Active</p></article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center"><p className="font-[Cormorant_Garamond,serif] text-[32px] text-[#6B8EC9]">1</p><p className="text-[11px] uppercase text-[#B8B8B8]">Pending Invite</p></article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center"><p className="font-[Cormorant_Garamond,serif] text-[32px]">3</p><p className="text-[11px] uppercase text-[#B8B8B8]">Online Now</p></article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center"><p className="font-[Cormorant_Garamond,serif] text-[32px]">6</p><p className="text-[11px] uppercase text-[#B8B8B8]">Roles</p></article>
          </section>

          <nav className="mb-5 flex overflow-x-auto border-b border-[#B8B8B8]/30">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium ${
                  activeTab === tab.key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"
                }`}
              >
                {tab.label}
                {typeof tab.count === "number" ? (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${activeTab === tab.key ? "bg-[#313131] text-white" : "bg-[#F7F5F1] text-[#313131]"}`}>
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {activeTab === "all-users" ? (
            <>
              <section className="mb-5 flex flex-wrap items-center gap-3">
                <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"><option>All Roles</option></select>
                <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"><option>All Status</option></select>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full max-w-[300px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"
                  placeholder="Search team members..."
                />
              </section>

              <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-[980px] w-full border-collapse">
                    <thead>
                      <tr className="bg-[#F7F5F1] text-left text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Permissions</th>
                        <th className="px-4 py-3">Last Active</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.email} className="border-t border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ${
                                  user.avatarTone === "admin"
                                    ? "bg-gradient-to-br from-[#313131] to-[#4a4a4a]"
                                    : user.avatarTone === "developer"
                                      ? "bg-gradient-to-br from-[#6B8EC9] to-[#5a7db8]"
                                      : user.avatarTone === "va"
                                        ? "bg-gradient-to-br from-[#4A7C59] to-[#3d6b4a]"
                                        : user.avatarTone === "advisor"
                                          ? "bg-gradient-to-br from-[#8B5A8B] to-[#6B4A6B]"
                                          : user.avatarTone === "content"
                                            ? "bg-gradient-to-br from-[#D4A853] to-[#b8923a]"
                                            : "bg-gradient-to-br from-[#6BC9C9] to-[#5ab8b8]"
                                }`}
                              >
                                {user.initials}
                              </div>
                              <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-[#B8B8B8]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">{user.role}</td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-[11px] ${user.status === "Active" ? "bg-[#E8F4EA] text-[#4A7C59]" : "bg-[#E8EFF9] text-[#6B8EC9]"}`}>
                              {user.status}
                            </span>
                            <p className="mt-1 text-xs text-[#B8B8B8]">{user.online}</p>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.map((permission) => (
                                <span key={permission} className="rounded bg-[#F7F5F1] px-1.5 py-0.5 text-[10px]">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p>{user.lastActive}</p>
                            <p className="text-xs text-[#B8B8B8]">{user.detail}</p>
                          </td>
                          <td className="px-4 py-4">
                            <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5 text-xs">
                              {user.status === "Invited" ? "Resend" : "Edit"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t border-[#B8B8B8]/20 bg-[#F7F5F1] px-4 py-3 text-sm text-[#B8B8B8]">
                  <p>Showing 1-{filteredUsers.length} of {users.length} users</p>
                  <button type="button" className="rounded border border-[#313131] bg-[#313131] px-3 py-1 text-xs text-white">1</button>
                </div>
              </section>
            </>
          ) : null}

          {activeTab === "roles" ? (
            <>
              <section className="mb-5 rounded-lg border border-[#6B8EC9] bg-[#E8EFF9] px-4 py-3 text-sm text-[#6B8EC9]">
                <strong>Role-Based Access Control:</strong> Each role has predefined permissions. Admins can customize permissions for individual users.
              </section>
              <section className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  ["👑", "1", "Admin", "Full system access and user management", ["Full Access"]],
                  ["💻", "2", "Developer", "Technical implementation and system configuration", ["Venues", "Content", "Settings", "Bookings"]],
                  ["📋", "2", "Virtual Assistant", "Venue curation and data entry tasks", ["Venues (View/Edit)", "Content (View)"]],
                  ["🎯", "1", "Technical Advisor", "System architecture and technical guidance", ["Analytics (View)", "Settings (View)"]],
                  ["✍️", "1", "Content Writer", "Blog and newsletter content creation", ["Content (Full)", "Analytics (View)"]],
                  ["🤝", "1", "Partner", "External partner with limited platform access", ["Venues (View)", "Bookings (View)"]],
                ].map(([icon, count, name, desc, perms]) => (
                  <article key={name as string} className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5">
                    <div className="mb-3 flex items-start justify-between"><div className="text-2xl">{icon as string}</div><p className="font-[Cormorant_Garamond,serif] text-[28px]">{count as string}</p></div>
                    <p className="font-[Cormorant_Garamond,serif] text-[20px] font-semibold">{name as string}</p>
                    <p className="mb-3 text-xs text-[#B8B8B8]">{desc as string}</p>
                    <div className="flex flex-wrap gap-1">
                      {(perms as string[]).map((permission) => (
                        <span key={permission} className="rounded bg-[#F7F5F1] px-2 py-1 text-[10px]">{permission}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </section>
            </>
          ) : null}

          {activeTab === "activity" ? (
            <section className="rounded-xl border border-[#B8B8B8]/20 bg-white">
              <header className="flex items-center justify-between border-b border-[#B8B8B8]/10 bg-[#F7F5F1] px-5 py-4">
                <h3 className="font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Recent Activity</h3>
                <button type="button" className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs">Export Log</button>
              </header>
              <div className="max-h-[420px] overflow-y-auto">
                {activityRows.map(([initials, text, time, type], idx) => (
                  <article key={`${initials}-${time}`} className={`flex items-start gap-3 px-5 py-4 ${idx === 0 ? "" : "border-t border-[#B8B8B8]/10"}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#313131] text-[11px] font-semibold text-white">{initials}</div>
                    <div className="flex-1">
                      <p className="text-[13px]">{text}</p>
                      <p className="text-xs text-[#B8B8B8]">{time}</p>
                    </div>
                    <span className="rounded bg-[#F7F5F1] px-2 py-1 text-[10px]">{type}</span>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "invites" ? (
            <>
              <section className="mb-5 rounded-lg border border-[#D4A853] bg-[#FEF9E7] px-4 py-3 text-sm text-[#D4A853]">
                <strong>1 pending invitation</strong> — Invite will expire in 5 days. Resend or revoke if needed.
              </section>
              <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
                <table className="w-full border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                      <th className="px-4 py-3">Invited User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Invited By</th>
                      <th className="px-4 py-3">Sent</th>
                      <th className="px-4 py-3">Expires</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#B8B8B8]/10">
                      <td className="px-4 py-4">Julie Davis<br /><span className="text-xs text-[#B8B8B8]">julie@wellness.us</span></td>
                      <td className="px-4 py-4">Partner</td>
                      <td className="px-4 py-4">Kate Morrison</td>
                      <td className="px-4 py-4">Feb 10, 2026</td>
                      <td className="px-4 py-4"><span className="text-[#D4A853]">Feb 17, 2026</span><br /><span className="text-xs text-[#B8B8B8]">5 days remaining</span></td>
                      <td className="px-4 py-4"><div className="flex gap-2"><button className="rounded border border-[#B8B8B8]/40 px-3 py-1.5 text-xs">Resend</button><button className="rounded border border-[#C45C5C] px-3 py-1.5 text-xs text-[#C45C5C]">Revoke</button></div></td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
