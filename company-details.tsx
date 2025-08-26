"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, User, Calendar, FileText, ArrowRight } from "lucide-react"

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

interface CompanyDetailsProps {
  company: Company
  onBack: () => void
  onEdit: () => void
}

export default function CompanyDetails({ company, onBack, onEdit }: CompanyDetailsProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
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
          ویرایش شرکت
        </Button>
      </div>

      {/* اطلاعات اصلی شرکت */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {company.name}
          </CardTitle>
          <CardDescription>اطلاعات کامل شرکت و پروژه</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* اطلاعات قرارداد */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              اطلاعات قرارداد
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">تاریخ شروع قرارداد</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(company.contractStartDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">وضعیت</p>
                <Badge variant="secondary">فعال</Badge>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">شرح قرارداد</p>
              <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">{company.contractDescription}</p>
            </div>
          </div>

          <Separator />

          {/* اطلاعات مسئولین */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              مسئولین پروژه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">مدیر پروژه</p>
                <p className="font-medium">{company.projectManager}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">سرپرست کارگاه</p>
                <p className="font-medium">{company.workshopSupervisor}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">مسئول HSE</p>
                <p className="font-medium">{company.hseManager}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* اطلاعات پروژه */}
          <div>
            <h3 className="text-lg font-semibold mb-3">اطلاعات پروژه</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">نام پروژه</p>
                <p className="font-medium text-lg">{company.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">شرح کلی فعالیت پروژه</p>
                <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">{company.projectDescription}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
