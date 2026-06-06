"use client";

import React, { useState, useMemo } from "react";
import { useCRMStore } from "@/store/crmStore";
import { parseNaturalLanguageQuery, ParsedCriteria } from "@/utils/aiSearch";
import { ProfileStatus } from "@/types/crm";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  X,
  Filter,
  Eye
} from "lucide-react";

export default function CustomersPage() {
  const router = useRouter();
  const { profiles, addProfile, selectProfile, setSidebarTab } = useCRMStore();

  // Search & Filter State
  const [activeSearchType, setActiveSearchType] = useState<"standard" | "ai">("standard");
  const [textSearch, setTextSearch] = useState("");
  const [aiSearch, setAiSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [genderFilter, setGenderFilter] = useState<string>("All");
  const [cityFilter, setCityFilter] = useState<string>("All");

  // Sorting State
  const [sortField, setSortField] = useState<"name" | "age" | "income" | "lastActivity">("lastActivity");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add Client Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    gender: "Female" as "Male" | "Female",
    age: 26,
    dob: "2000-01-01",
    height: 162,
    religion: "Hindu",
    caste: "Brahmin",
    maritalStatus: "Never Married" as "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce",
    email: "",
    phone: "",
    city: "Mumbai",
    college: "Delhi University",
    degree: "B.Tech",
    university: "Delhi University",
    company: "Google",
    designation: "Software Engineer",
    income: 18,
    industry: "Technology",
    assignedMatchmaker: "Gaurav",
    status: "New Lead" as ProfileStatus
  });

  // Extract cities from profiles dynamically
  const uniqueCities = useMemo(() => {
    const set = new Set(profiles.map((p) => p.city));
    return Array.from(set).sort();
  }, [profiles]);

  // Handle Standard vs AI Search Filtering
  const { filteredList, parsedCriteria } = useMemo(() => {
    let list = [...profiles];
    let criteria: ParsedCriteria = {};

    if (activeSearchType === "ai" && aiSearch.trim()) {
      const result = parseNaturalLanguageQuery(aiSearch, profiles);
      list = result.filtered;
      criteria = result.criteria;
    } else {
      // Standard search filters
      if (textSearch.trim()) {
        const q = textSearch.toLowerCase();
        list = list.filter(
          (p) =>
            `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q) ||
            p.career.designation.toLowerCase().includes(q)
        );
      }

      if (statusFilter !== "All") {
        list = list.filter((p) => p.status === statusFilter);
      }
      if (genderFilter !== "All") {
        list = list.filter((p) => p.gender === genderFilter);
      }
      if (cityFilter !== "All") {
        list = list.filter((p) => p.city === cityFilter);
      }
    }

    return { filteredList: list, parsedCriteria: criteria };
  }, [profiles, activeSearchType, textSearch, aiSearch, statusFilter, genderFilter, cityFilter]);

  // Handle Sorting
  const sortedList = useMemo(() => {
    const list = [...filteredList];
    list.sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      if (sortField === "name") {
        valA = `${a.firstName} ${a.lastName}`.toLowerCase();
        valB = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else if (sortField === "age") {
        valA = a.age;
        valB = b.age;
      } else if (sortField === "income") {
        valA = a.career.income;
        valB = b.career.income;
      } else if (sortField === "lastActivity") {
        valA = new Date(a.lastActivity).getTime();
        valB = new Date(b.lastActivity).getTime();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredList, sortField, sortDirection]);

  // Handle Pagination
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedList.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedList, currentPage]);

  const totalPages = Math.ceil(sortedList.length / itemsPerPage) || 1;

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleRowClick = (profileId: string) => {
    selectProfile(profileId);
    setSidebarTab("Customers");
    router.push(`/dashboard/customers/${profileId}`);
  };

  const getStatusBadgeClass = (status: ProfileStatus) => {
    switch (status) {
      case "New Lead":
        return "bg-sky-500/10 text-sky-500 border-sky-500/20";
      case "Verification Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Profile Verified":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Active Search":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Matched":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "Engaged":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "Married":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-foreground/10 text-foreground border-border";
    }
  };

  const handleCreateClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map custom object structure for Zustand store addProfile action
    addProfile({
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      gender: newClient.gender,
      dob: newClient.dob,
      age: parseInt(newClient.age.toString(), 10),
      height: parseInt(newClient.height.toString(), 10),
      languages: ["English", "Hindi"],
      religion: newClient.religion,
      caste: newClient.caste,
      maritalStatus: newClient.maritalStatus,
      email: newClient.email,
      phone: newClient.phone,
      country: "India",
      city: newClient.city,
      education: {
        college: newClient.college,
        degree: newClient.degree,
        university: newClient.university
      },
      career: {
        company: newClient.company,
        designation: newClient.designation,
        income: parseFloat(newClient.income.toString()),
        industry: newClient.industry
      },
      preferences: {
        wantKids: true,
        openToRelocate: "depends",
        openToPets: true,
        preferredAgeRange: { min: newClient.age - 4, max: newClient.age + 4 },
        preferredLocation: [newClient.city],
        lifestyleChoices: {
          drinking: "socially",
          smoking: "never",
          diet: "veg"
        }
      },
      familyInfo: {
        siblings: "1 sibling",
        background: "Upper Middle Class service background."
      },
      status: newClient.status,
      assignedMatchmaker: newClient.assignedMatchmaker
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Page Title & Add Client Button */}
      <div className="flex justify-between items-center pb-4 border-b border-border/80">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Customer Pipeline Database</h1>
          <p className="text-xs text-foreground/60 mt-1">
            Perform advanced searches, filter statuses, and select clients to review matchmaking profiles.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-glow"
        >
          <UserPlus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Search Type Selector Tabs */}
      <div className="flex gap-2 p-1 bg-input/40 rounded-lg w-fit border border-border">
        <button
          onClick={() => {
            setActiveSearchType("standard");
            setAiSearch("");
            setCurrentPage(1);
          }}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            activeSearchType === "standard" ? "bg-background text-brand-500 shadow-sm" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          Standard Filter Table
        </button>
        <button
          onClick={() => {
            setActiveSearchType("ai");
            setTextSearch("");
            setCurrentPage(1);
          }}
          className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
            activeSearchType === "ai" ? "bg-background text-brand-500 shadow-sm" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Global AI Semantic Search
        </button>
      </div>

      {/* Filters & Inputs Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-4">
        {activeSearchType === "standard" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-foreground/45" />
              <input
                type="text"
                placeholder="Search name, email, or designation..."
                value={textSearch}
                onChange={(e) => {
                  setTextSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-input/20 focus:bg-input focus:border-brand-500 focus:outline-none text-xs transition-colors duration-200"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60 font-medium shrink-0">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="New Lead">New Lead</option>
                <option value="Verification Pending">Verification Pending</option>
                <option value="Profile Verified">Profile Verified</option>
                <option value="Active Search">Active Search</option>
                <option value="Matched">Matched</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60 font-medium shrink-0">Gender:</span>
              <select
                value={genderFilter}
                onChange={(e) => {
                  setGenderFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
              >
                <option value="All">All Genders</option>
                <option value="Male">Grooms (Male)</option>
                <option value="Female">Brides (Female)</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60 font-medium shrink-0">City:</span>
              <select
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
              >
                <option value="All">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* AI Search input */}
            <div className="relative">
              <Sparkles className="absolute left-3 top-3 w-4.5 h-4.5 text-purple-500" />
              <input
                type="text"
                placeholder="Try: 'Show divorced women in Mumbai earning above 15 LPA' or 'unmarried men in Pune under 30'..."
                value={aiSearch}
                onChange={(e) => {
                  setAiSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-purple-500/30 focus:border-purple-500 bg-brand-500/5 focus:outline-none text-xs transition-all duration-200"
              />
              {aiSearch && (
                <button
                  onClick={() => setAiSearch("")}
                  className="absolute right-3 top-3 p-0.5 rounded-full hover:bg-input text-foreground/60 hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Criteria Badges */}
            {aiSearch.trim() && Object.keys(parsedCriteria).length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] text-foreground/45 font-bold tracking-wider uppercase flex items-center gap-1 shrink-0">
                  <Filter className="w-3 h-3" /> Parsed Query:
                </span>
                
                {parsedCriteria.gender && (
                  <span className="text-[10px] bg-brand-500/10 text-brand-500 font-semibold px-2 py-0.5 rounded-full border border-brand-500/15">
                    Gender: {parsedCriteria.gender}
                  </span>
                )}
                {parsedCriteria.city && (
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-500 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/15">
                    City: {parsedCriteria.city}
                  </span>
                )}
                {parsedCriteria.religion && (
                  <span className="text-[10px] bg-purple-500/10 text-purple-500 font-semibold px-2 py-0.5 rounded-full border border-purple-500/15">
                    Religion: {parsedCriteria.religion}
                  </span>
                )}
                {parsedCriteria.maritalStatus && (
                  <span className="text-[10px] bg-pink-500/10 text-pink-500 font-semibold px-2 py-0.5 rounded-full border border-pink-500/15">
                    Marital: {parsedCriteria.maritalStatus}
                  </span>
                )}
                {parsedCriteria.minIncome && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/15">
                    Income: &gt; {parsedCriteria.minIncome} LPA
                  </span>
                )}
                {(parsedCriteria.minAge || parsedCriteria.maxAge) && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 font-semibold px-2 py-0.5 rounded-full border border-amber-500/15">
                    Age: {parsedCriteria.minAge || 20}-{parsedCriteria.maxAge || 45}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Advanced Data Table */}
      <div className="rounded-2xl glass-panel border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-input/30 text-foreground/60 border-b border-border uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4 select-none cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1.5">
                    Name <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-4 select-none cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("age")}>
                  <div className="flex items-center gap-1.5">
                    Age <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Marital Status</th>
                <th className="py-3 px-4 select-none cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("income")}>
                  <div className="flex items-center gap-1.5">
                    Income <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Matchmaker</th>
                <th className="py-3 px-4 select-none cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("lastActivity")}>
                  <div className="flex items-center gap-1.5">
                    Last Active <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-foreground/50 font-medium">
                    No clients match the specified search query or filters.
                  </td>
                </tr>
              ) : (
                paginatedList.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => handleRowClick(p.id)}
                    className="hover:bg-input/20 cursor-pointer transition-colors duration-150 group"
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0 bg-gradient-to-tr ${p.gender === "Male" ? "from-brand-600 to-indigo-600" : "from-pink-500 to-purple-500"}`}>
                          {p.firstName[0]}
                        </div>
                        <div className="flex flex-col text-left">
                          <span>{p.firstName} {p.lastName}</span>
                          <span className="text-[10px] text-foreground/50 font-normal mt-0.5">{p.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-4 text-foreground/90 font-medium">
                      {p.age} years
                    </td>

                    {/* City */}
                    <td className="py-3.5 px-4 text-foreground/90">
                      {p.city}
                    </td>

                    {/* Marital Status */}
                    <td className="py-3.5 px-4 text-foreground/80">
                      {p.maritalStatus}
                    </td>

                    {/* Income */}
                    <td className="py-3.5 px-4 text-foreground/90 font-medium">
                      ₹{p.career.income} LPA
                    </td>

                    {/* Status Tags */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-semibold tracking-wide uppercase ${getStatusBadgeClass(p.status)}`}>
                        {p.status}
                      </span>
                    </td>

                    {/* Matchmaker */}
                    <td className="py-3.5 px-4 text-foreground/80">
                      {p.assignedMatchmaker}
                    </td>

                    {/* Last Activity */}
                    <td className="py-3.5 px-4 text-foreground/60 font-medium">
                      {new Date(p.lastActivity).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short"
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 rounded hover:bg-input text-foreground/60 hover:text-brand-500 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Panel */}
        <div className="px-4 py-3 border-t border-border bg-input/10 flex items-center justify-between text-xs">
          <span className="text-foreground/50">
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * itemsPerPage, sortedList.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{sortedList.length}</span> clients
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-border bg-background hover:bg-input transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="px-3 font-semibold text-foreground/75">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-border bg-background hover:bg-input transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Client Dialog Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl glass-panel border border-border shadow-glow-lg bg-[#ffffff] dark:bg-[#0c081e] p-6 z-10">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <UserPlus className="w-4.5 h-4.5 text-brand-500" /> Create Client Profile
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-input text-foreground/50 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClientSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">First Name</label>
                  <input
                    type="text"
                    required
                    value={newClient.firstName}
                    onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="Amit"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newClient.lastName}
                    onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="Sharma"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Gender</label>
                  <select
                    value={newClient.gender}
                    onChange={(e) => setNewClient({ ...newClient, gender: e.target.value as "Male" | "Female" })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="Female">Bride (Female)</option>
                    <option value="Male">Groom (Male)</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Age</label>
                  <input
                    type="number"
                    required
                    value={newClient.age}
                    onChange={(e) => setNewClient({ ...newClient, age: parseInt(e.target.value) || 25 })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    min={21}
                    max={50}
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Height (cm)</label>
                  <input
                    type="number"
                    required
                    value={newClient.height}
                    onChange={(e) => setNewClient({ ...newClient, height: parseInt(e.target.value) || 165 })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    min={140}
                    max={210}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Religion</label>
                  <select
                    value={newClient.religion}
                    onChange={(e) => setNewClient({ ...newClient, religion: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="Hindu">Hindu</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Christian">Christian</option>
                    <option value="Jain">Jain</option>
                    <option value="Muslim">Muslim</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Caste</label>
                  <input
                    type="text"
                    required
                    value={newClient.caste}
                    onChange={(e) => setNewClient({ ...newClient, caste: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="Brahmin / Arora / General"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Marital Status</label>
                  <select
                    value={newClient.maritalStatus}
                    onChange={(e) => setNewClient({ ...newClient, maritalStatus: e.target.value as typeof newClient.maritalStatus })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">City</label>
                  <input
                    type="text"
                    required
                    value={newClient.city}
                    onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Email</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="client@example.com"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Phone</label>
                  <input
                    type="text"
                    required
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="+91 99999 88888"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Designation</label>
                  <input
                    type="text"
                    required
                    value={newClient.designation}
                    onChange={(e) => setNewClient({ ...newClient, designation: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    placeholder="Product Manager"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Income (LPA)</label>
                  <input
                    type="number"
                    required
                    value={newClient.income}
                    onChange={(e) => setNewClient({ ...newClient, income: parseFloat(e.target.value) || 10 })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                    min={2}
                    max={300}
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-foreground/80">Pipeline Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value as ProfileStatus })}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Verification Pending">Verification Pending</option>
                    <option value="Profile Verified">Profile Verified</option>
                    <option value="Active Search">Active Search</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-input text-foreground/80 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-glow hover:from-purple-500 hover:to-indigo-500"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
