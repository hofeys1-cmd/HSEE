"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Save, X, User } from "lucide-react"

interface Company {
  id: number
  name: string
}

interface Incident {
  id?: number
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

interface IncidentFormProps {
  incident?: Incident
  companies: Company[]
  onSave: (incident: Incident) => void
  onCancel: () => void
}

export default function IncidentForm({ incident, companies, onSave, onCancel }: IncidentFormProps) {
  const [formData, setFormData] = useState<Incident>({
    companyId: incident?.companyId || 0,
    companyName: incident?.companyName || "",
    incidentDate: incident?.incidentDate || "",
    incidentType: incident?.incidentType || "جزئی",
    victimFirstName: incident?.victimFirstName || "",
    victimLastName: incident?.victimLastName || "",
    victimNationalId: incident?.victimNationalId || "",
    victimBirthDate: incident?.victimBirthDate || "",
    injuryLocation: incident?.injuryLocation || "",
    description: incident?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedCompany = companies.find((c) => c.id === formData.companyId)
    if (selectedCompany) {
      onSave({
        ...formData,
        id: incident?.id,
        companyName: selectedCompany.name,
      })
    }
  }

  const handleChange = (field: keyof Incident, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getIncidentTypeColor = (type: string) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          {incident ? "ویرایش حادثه" : "ثبت حادثه جدید"}
        </CardTitle>
        <CardDescription>اطلاعات کامل حادثه و مصدوم را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* اطلاعات اصلی حادثه */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">شرکت *</Label>
              <Select
                value={formData.companyId.toString()}
                onValueChange={(value) => handleChange("companyId", Number.parseInt(value))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="شرکت را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incidentDate">تاریخ حادثه *</Label>
              <Input
                id="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={(e) => handleChange("incidentDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incidentType">نوع حادثه *</Label>
            <Select
              value={formData.incidentType}
              onValueChange={(value) => handleChange("incidentType", value as Incident["incidentType"])}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="جزئی">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    جزئی
                  </span>
                </SelectItem>
                <SelectItem value="متوسط">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    متوسط
                  </span>
                </SelectItem>
                <SelectItem value="شدید">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    شدید
                  </span>
                </SelectItem>
                <SelectItem value="خیلی شدید">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    خیلی شدید
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* اطلاعات مصدوم */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              مشخصات فرد حادثه دیده
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="victimFirstName">نام *</Label>
                <Input
                  id="victimFirstName"
                  value={formData.victimFirstName}
                  onChange={(e) => handleChange("victimFirstName", e.target.value)}
                  placeholder="نام فرد مصدوم"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="victimLastName">نام خانوادگی *</Label>
                <Input
                  id="victimLastName"
                  value={formData.victimLastName}
                  onChange={(e) => handleChange("victimLastName", e.target.value)}
                  placeholder="نام خانوادگی فرد مصدوم"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="victimNationalId">کد ملی *</Label>
                <Input
                  id="victimNationalId"
                  value={formData.victimNationalId}
                  onChange={(e) => handleChange("victimNationalId", e.target.value)}
                  placeholder="کد ملی 10 رقمی"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="victimBirthDate">تاریخ تولد *</Label>
                <Input
                  id="victimBirthDate"
                  type="date"
                  value={formData.victimBirthDate}
                  onChange={(e) => handleChange("victimBirthDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="injuryLocation">محل مصدومیت *</Label>
              <Input
                id="injuryLocation"
                value={formData.injuryLocation}
                onChange={(e) => handleChange("injuryLocation", e.target.value)}
                placeholder="مثال: دست راست، پا، سر و..."
                required
              />
            </div>
          </div>

          {/* توضیحات */}
          <div className="space-y-2">
            <Label htmlFor="description">توضیحات حادثه</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="شرح کامل نحوه وقوع حادثه و جزئیات..."
              rows={4}
            />
          </div>

          {/* دکمه‌های عملیات */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {incident ? "به‌روزرسانی" : "ثبت حادثه"}
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
