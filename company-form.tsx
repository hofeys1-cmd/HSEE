"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"

interface Company {
  id?: number
  name: string
  contractStartDate: string
  contractDescription: string
  projectManager: string
  workshopSupervisor: string
  hseManager: string
  projectName: string
  projectDescription: string
}

interface CompanyFormProps {
  company?: Company
  onSave: (company: Company) => void
  onCancel: () => void
}

export default function CompanyForm({ company, onSave, onCancel }: CompanyFormProps) {
  const [formData, setFormData] = useState<Company>({
    name: company?.name || "",
    contractStartDate: company?.contractStartDate || "",
    contractDescription: company?.contractDescription || "",
    projectManager: company?.projectManager || "",
    workshopSupervisor: company?.workshopSupervisor || "",
    hseManager: company?.hseManager || "",
    projectName: company?.projectName || "",
    projectDescription: company?.projectDescription || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: company?.id })
  }

  const handleChange = (field: keyof Company, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{company ? "ویرایش شرکت" : "ثبت شرکت جدید"}</CardTitle>
        <CardDescription>اطلاعات کامل شرکت و پروژه را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* اطلاعات اصلی شرکت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام شرکت *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="نام شرکت را وارد کنید"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractStartDate">تاریخ شروع قرارداد *</Label>
              <Input
                id="contractStartDate"
                type="date"
                value={formData.contractStartDate}
                onChange={(e) => handleChange("contractStartDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractDescription">شرح قرارداد *</Label>
            <Textarea
              id="contractDescription"
              value={formData.contractDescription}
              onChange={(e) => handleChange("contractDescription", e.target.value)}
              placeholder="شرح کامل قرارداد را وارد کنید"
              rows={3}
              required
            />
          </div>

          {/* اطلاعات مسئولین */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectManager">نام مدیر پروژه *</Label>
              <Input
                id="projectManager"
                value={formData.projectManager}
                onChange={(e) => handleChange("projectManager", e.target.value)}
                placeholder="نام مدیر پروژه"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workshopSupervisor">نام سرپرست کارگاه *</Label>
              <Input
                id="workshopSupervisor"
                value={formData.workshopSupervisor}
                onChange={(e) => handleChange("workshopSupervisor", e.target.value)}
                placeholder="نام سرپرست کارگاه"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hseManager">نام مسئول HSE *</Label>
              <Input
                id="hseManager"
                value={formData.hseManager}
                onChange={(e) => handleChange("hseManager", e.target.value)}
                placeholder="نام مسئول HSE"
                required
              />
            </div>
          </div>

          {/* اطلاعات پروژه */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">نام پروژه *</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="نام پروژه را وارد کنید"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">شرح کلی فعالیت پروژه *</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => handleChange("projectDescription", e.target.value)}
                placeholder="شرح کامل فعالیت‌های پروژه را وارد کنید"
                rows={4}
                required
              />
            </div>
          </div>

          {/* دکمه‌های عملیات */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {company ? "به‌روزرسانی" : "ثبت شرکت"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              انصراف
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
