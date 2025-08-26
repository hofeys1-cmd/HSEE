"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, AlertTriangle, Shield, Search, FileText, Plus, Users, TrendingUp, Bell } from "lucide-react"
import CompanyForm from "@/components/company-form"
import CompanyList from "@/components/company-list"
import CompanyDetails from "@/components/company-details"
import IncidentForm from "@/components/incident-form"
import IncidentList from "@/components/incident-list"
import IncidentDetails from "@/components/incident-details"
import PWAInstallPrompt from "@/components/pwa-install-prompt"

interface Company {
  id: number
  name: string
  contractStartDate: string
  contractDescription: string
  projectManager: string
  workshopSupervisor: string
  hseManager: string
  projectName: string
  projectDescription: string
}

interface Incident {
  id: number
  companyId: number
  companyName: string
  incidentDate: string
  incidentType: "جزئی" | "متوسط" | "شدید" | "خیلی شدید"
  victimFirstName: string
  victimLastName: string
  victimNationalId: string
  victimBirthDate: string
  injuryLocation: string
  description: string
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "شرکت ساختمانی آریا",
      contractStartDate: "2024-01-15",
      contractDescription: "قرارداد ساخت مجتمع مسکونی 200 واحدی در منطقه 22 تهران",
      projectManager: "احمد محمدی",
      workshopSupervisor: "علی رضایی",
      hseManager: "مریم احمدی",
      projectName: "مجتمع مسکونی آریا",
      projectDescription: "ساخت مجتمع مسکونی 200 واحدی شامل 4 بلوک 10 طبقه با امکانات رفاهی کامل",
    },
    {
      id: 2,
      name: "گروه صنعتی پارس",
      contractStartDate: "2024-02-20",
      contractDescription: "قرارداد احداث کارخانه تولید قطعات خودرو",
      projectManager: "حسن کریمی",
      workshopSupervisor: "رضا نوری",
      hseManager: "فاطمه حسینی",
      projectName: "کارخانه قطعات پارس",
      projectDescription: "احداث کارخانه تولید قطعات خودرو با ظرفیت تولید 50000 قطعه در ماه",
    },
  ])

  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      companyId: 1,
      companyName: "شرکت ساختمانی آریا",
      incidentDate: "2024-08-15",
      incidentType: "جزئی",
      victimFirstName: "محمد",
      victimLastName: "احمدی",
      victimNationalId: "1234567890",
      victimBirthDate: "1985-05-10",
      injuryLocation: "دست راست",
      description: "برخورد با ابزار کار در حین کار با چکش",
    },
    {
      id: 2,
      companyId: 2,
      companyName: "گروه صنعتی پارس",
      incidentDate: "2024-08-12",
      incidentType: "متوسط",
      victimFirstName: "علی",
      victimLastName: "رضایی",
      victimNationalId: "0987654321",
      victimBirthDate: "1990-03-20",
      injuryLocation: "پای چپ",
      description: "سقوط از ارتفاع کم در محوطه کارخانه",
    },
  ])

  const [companyView, setCompanyView] = useState<"list" | "form" | "details">("list")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  const [incidentView, setIncidentView] = useState<"list" | "form" | "details">("list")
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null)

  const stats = {
    companies: companies.length,
    incidents: incidents.length,
    insuranceExpiring: 3,
    totalProjects: 156,
  }

  const recentIncidents = incidents
    .slice(-3)
    .reverse()
    .map((incident) => ({
      id: incident.id,
      company: incident.companyName,
      type: incident.incidentType,
      date: new Date(incident.incidentDate).toLocaleDateString("fa-IR"),
    }))

  const expiringInsurance = [
    { id: 1, company: "شرکت ساختمانی آریا", daysLeft: 12 },
    { id: 2, company: "گروه تولیدی سپهر", daysLeft: 8 },
    { id: 3, company: "شرکت خدماتی رایان", daysLeft: 5 },
  ]

  const handleSaveCompany = (companyData: Omit<Company, "id"> & { id?: number }) => {
    if (companyData.id) {
      setCompanies((prev) => prev.map((c) => (c.id === companyData.id ? { ...companyData, id: companyData.id } : c)))
    } else {
      const newCompany = { ...companyData, id: Date.now() }
      setCompanies((prev) => [...prev, newCompany])
    }
    setCompanyView("list")
    setEditingCompany(null)
  }

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
    setCompanyView("form")
  }

  const handleDeleteCompany = (id: number) => {
    if (confirm("آیا از حذف این شرکت اطمینان دارید؟")) {
      setCompanies((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company)
    setCompanyView("details")
  }

  const handleAddNewCompany = () => {
    setEditingCompany(null)
    setCompanyView("form")
  }

  const handleSaveIncident = (incidentData: Omit<Incident, "id"> & { id?: number }) => {
    if (incidentData.id) {
      setIncidents((prev) => prev.map((i) => (i.id === incidentData.id ? { ...incidentData, id: incidentData.id } : i)))
    } else {
      const newIncident = { ...incidentData, id: Date.now() }
      setIncidents((prev) => [...prev, newIncident])
    }
    setIncidentView("list")
    setEditingIncident(null)
  }

  const handleEditIncident = (incident: Incident) => {
    setEditingIncident(incident)
    setIncidentView("form")
  }

  const handleDeleteIncident = (id: number) => {
    if (confirm("آیا از حذف این حادثه اطمینان دارید؟")) {
      setIncidents((prev) => prev.filter((i) => i.id !== id))
    }
  }

  const handleViewIncident = (incident: Incident) => {
    setSelectedIncident(incident)
    setIncidentView("details")
  }

  const handleAddNewIncident = () => {
    setEditingIncident(null)
    setIncidentView("form")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">سیستم مدیریت شرکت‌های پیمنکاری مجتمع فولاد بافق</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="جستجو در سیستم..." className="w-80 pr-10" />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex gap-2">
            {[
              { id: "dashboard", label: "داشبورد", icon: TrendingUp },
              { id: "companies", label: "شرکت‌ها", icon: Building2 },
              { id: "incidents", label: "حوادث", icon: AlertTriangle },
              { id: "insurance", label: "بیمه‌ها", icon: Shield },
              { id: "reports", label: "گزارش‌ها", icon: FileText },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id === "companies") {
                    setCompanyView("list")
                  }
                  if (tab.id === "incidents") {
                    setIncidentView("list")
                  }
                }}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">کل شرکت‌ها</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.companies}</div>
                  <p className="text-xs text-muted-foreground">+2 از ماه گذشته</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">حوادث این ماه</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.incidents}</div>
                  <p className="text-xs text-muted-foreground">-3 از ماه گذشته</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">بیمه‌های منقضی</CardTitle>
                  <Shield className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.insuranceExpiring}</div>
                  <p className="text-xs text-muted-foreground">نیاز به تمدید</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">کل پروژه‌ها</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProjects}</div>
                  <p className="text-xs text-muted-foreground">+12 از ماه گذشته</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    آخرین حوادث
                  </CardTitle>
                  <CardDescription>حوادث اخیر ثبت شده در سیستم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentIncidents.map((incident) => (
                      <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{incident.company}</p>
                          <p className="text-sm text-muted-foreground">{incident.date}</p>
                        </div>
                        <Badge variant={incident.type === "متوسط" ? "destructive" : "secondary"}>{incident.type}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("incidents")}
                  >
                    مشاهده همه حوادث
                  </Button>
                </CardContent>
              </Card>

              {/* Insurance Expiring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-destructive" />
                    بیمه‌های در حال انقضا
                  </CardTitle>
                  <CardDescription>بیمه‌هایی که کمتر از 14 روز به انقضا دارند</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringInsurance.map((insurance) => (
                      <div key={insurance.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{insurance.company}</p>
                          <p className="text-sm text-muted-foreground">{insurance.daysLeft} روز باقی‌مانده</p>
                        </div>
                        <Badge variant="destructive">فوری</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    مدیریت بیمه‌ها
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>عملیات سریع</CardTitle>
                <CardDescription>دسترسی سریع به عملیات پرکاربرد</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={handleAddNewCompany} className="flex items-center gap-2 h-12">
                    <Plus className="h-4 w-4" />
                    ثبت شرکت جدید
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-12 bg-transparent"
                    onClick={handleAddNewIncident}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    ثبت حادثه
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-12 bg-transparent">
                    <FileText className="h-4 w-4" />
                    تولید گزارش
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="space-y-6">
            {companyView === "list" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">مدیریت شرکت‌ها</h2>
                  <Button onClick={handleAddNewCompany} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    ثبت شرکت جدید
                  </Button>
                </div>
                <CompanyList
                  companies={companies}
                  onEdit={handleEditCompany}
                  onDelete={handleDeleteCompany}
                  onView={handleViewCompany}
                />
              </div>
            )}

            {companyView === "form" && (
              <CompanyForm
                company={editingCompany || undefined}
                onSave={handleSaveCompany}
                onCancel={() => setCompanyView("list")}
              />
            )}

            {companyView === "details" && selectedCompany && (
              <CompanyDetails
                company={selectedCompany}
                onBack={() => setCompanyView("list")}
                onEdit={() => handleEditCompany(selectedCompany)}
              />
            )}
          </div>
        )}

        {activeTab === "incidents" && (
          <div className="space-y-6">
            {incidentView === "list" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">مدیریت حوادث</h2>
                  <Button onClick={handleAddNewIncident} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    ثبت حادثه جدید
                  </Button>
                </div>
                <IncidentList
                  incidents={incidents}
                  onEdit={handleEditIncident}
                  onDelete={handleDeleteIncident}
                  onView={handleViewIncident}
                />
              </div>
            )}

            {incidentView === "form" && (
              <IncidentForm
                incident={editingIncident || undefined}
                companies={companies}
                onSave={handleSaveIncident}
                onCancel={() => setIncidentView("list")}
              />
            )}

            {incidentView === "details" && selectedIncident && (
              <IncidentDetails
                incident={selectedIncident}
                onBack={() => setIncidentView("list")}
                onEdit={() => handleEditIncident(selectedIncident)}
              />
            )}
          </div>
        )}

        {activeTab !== "dashboard" && activeTab !== "companies" && activeTab !== "incidents" && (
          <Card>
            <CardHeader>
              <CardTitle>در حال توسعه</CardTitle>
              <CardDescription>این بخش در مراحل بعدی پیاده‌سازی خواهد شد</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                بخش {activeTab === "insurance" ? "بیمه‌ها" : "گزارش‌ها"}
                در مرحله بعدی توسعه پیاده‌سازی خواهد شد.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <PWAInstallPrompt />
    </div>
  )
}
