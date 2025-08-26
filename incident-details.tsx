"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, User, Calendar, MapPin, ArrowRight, Building2 } from "lucide-react"

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

interface IncidentDetailsProps {
  incident: Incident
  onBack: () => void
  onEdit: () => void
}

export default function IncidentDetails({ incident, onBack, onEdit }: IncidentDetailsProps) {
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

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "جزئی":
        return "text-green-600"
      case "متوسط":
        return "text-yellow-600"
      case "شدید":
        return "text-orange-600"
      case "خیلی شدید":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "-"
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return `${age} سال`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
          <ArrowRight className="h-4 w-4" />
          بازگشت به لیست
        </Button>
        <Button onClick={onEdit} className="flex items-center gap-2">
          ویرایش حادثه
        </Button>
      </div>

      {/* اطلاعات اصلی حادثه */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${getIncidentColor(incident.incidentType)}`} />
            جزئیات حادثه
          </CardTitle>
          <CardDescription>اطلاعات کامل حادثه و مصدوم</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* اطلاعات حادثه */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              اطلاعات حادثه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">تاریخ حادثه</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(incident.incidentDate)}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">شرکت</p>
                <p className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {incident.companyName}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">نوع حادثه</p>
                <Badge variant={getIncidentBadgeVariant(incident.incidentType)} className="mt-1">
                  {incident.incidentType}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* اطلاعات مصدوم */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              مشخصات فرد حادثه دیده
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">نام و نام خانوادگی</p>
                <p className="font-medium text-lg">
                  {incident.victimFirstName} {incident.victimLastName}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">کد ملی</p>
                <p className="font-medium">{incident.victimNationalId}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">تاریخ تولد</p>
                <p className="font-medium">{formatDate(incident.victimBirthDate)}</p>
                <p className="text-xs text-muted-foreground">({calculateAge(incident.victimBirthDate)})</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">محل مصدومیت</p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {incident.injuryLocation}
                </p>
              </div>
            </div>
          </div>

          {/* توضیحات */}
          {incident.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">توضیحات حادثه</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{incident.description}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
