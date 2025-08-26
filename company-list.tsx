"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Building2 } from "lucide-react"

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

interface CompanyListProps {
  companies: Company[]
  onEdit: (company: Company) => void
  onDelete: (id: number) => void
  onView: (company: Company) => void
}

export default function CompanyList({ companies, onEdit, onDelete, onView }: CompanyListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.projectManager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          لیست شرکت‌ها
        </CardTitle>
        <CardDescription>مدیریت و مشاهده اطلاعات شرکت‌های ثبت شده</CardDescription>
      </CardHeader>
      <CardContent>
        {/* جستجو */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جستجو در نام شرکت، پروژه یا مدیر پروژه..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* جدول شرکت‌ها */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "شرکتی با این مشخصات یافت نشد" : "هنوز شرکتی ثبت نشده است"}
            </p>
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام شرکت</TableHead>
                  <TableHead>نام پروژه</TableHead>
                  <TableHead>مدیر پروژه</TableHead>
                  <TableHead>تاریخ شروع</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.projectName}</TableCell>
                    <TableCell>{company.projectManager}</TableCell>
                    <TableCell>{formatDate(company.contractStartDate)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">فعال</Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(company)}>
                            <Eye className="mr-2 h-4 w-4" />
                            مشاهده جزئیات
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(company)}>
                            <Edit className="mr-2 h-4 w-4" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(company.id)} className="text-destructive">
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
  )
}
