"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, AlertTriangle, Filter } from "lucide-react"

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

interface IncidentListProps {
  incidents: Incident[]
  onEdit: (incident: Incident) => void
  onDelete: (id: number) => void
  onView: (incident: Incident) => void
}

export default function IncidentList({ incidents, onEdit, onDelete, onView }: IncidentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.victimFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.victimLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.injuryLocation.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || incident.incidentType === typeFilter

    return matchesSearch && matchesType
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
  }

  const getIncidentBadgeVariant = (type: string) => {
    switch (type) {
      case "جزئی":
        return "secondary"
      case "متوسط":
        return "default"
      case "شدید":
        return "destructive"
      case "خیلی شدید":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getIncidentStats = () => {
    const stats = {
      total: incidents.length,
      minor: incidents.filter((i) => i.incidentType === "جزئی").length,
      moderate: incidents.filter((i) => i.incidentType === "متوسط").length,
      severe: incidents.filter((i) => i.incidentType === "شدید").length,
      critical: incidents.filter((i) => i.incidentType === "خیلی شدید").length,
    }
    return stats
  }

  const stats = getIncidentStats()

  return (
    <div className="space-y-6">
      {/* آمار حوادث */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">کل حوادث</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.minor}</div>
            <p className="text-xs text-muted-foreground">جزئی</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.moderate}</div>
            <p className="text-xs text-muted-foreground">متوسط</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.severe}</div>
            <p className="text-xs text-muted-foreground">شدید</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">خیلی شدید</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            لیست حوادث
          </CardTitle>
          <CardDescription>مدیریت و مشاهده حوادث ثبت شده</CardDescription>
        </CardHeader>
        <CardContent>
          {/* فیلترها و جستجو */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در شرکت، نام مصدوم یا محل مصدومیت..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه انواع</SelectItem>
                  <SelectItem value="جزئی">جزئی</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="شدید">شدید</SelectItem>
                  <SelectItem value="خیلی شدید">خیلی شدید</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* جدول حوادث */}
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || typeFilter !== "all" ? "حادثه‌ای با این مشخصات یافت نشد" : "هنوز حادثه‌ای ثبت نشده است"}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>شرکت</TableHead>
                    <TableHead>نام مصدوم</TableHead>
                    <TableHead>محل مصدومیت</TableHead>
                    <TableHead>نوع حادثه</TableHead>
                    <TableHead className="text-left">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>{formatDate(incident.incidentDate)}</TableCell>
                      <TableCell className="font-medium">{incident.companyName}</TableCell>
                      <TableCell>
                        {incident.victimFirstName} {incident.victimLastName}
                      </TableCell>
                      <TableCell>{incident.injuryLocation}</TableCell>
                      <TableCell>
                        <Badge variant={getIncidentBadgeVariant(incident.incidentType)}>{incident.incidentType}</Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(incident)}>
                              <Eye className="mr-2 h-4 w-4" />
                              مشاهده جزئیات
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(incident)}>
                              <Edit className="mr-2 h-4 w-4" />
                              ویرایش
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(incident.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
