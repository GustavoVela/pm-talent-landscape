"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type CompetencyData = {
  type: "Global" | "Region" | "Country"
  name: string
  total: number
  core_pm: number
  business: number
  technical: number
  data: number
  ai: number
  ux_ui: number
}

const data: CompetencyData[] = [
  {
    type: "Global",
    name: "Global",
    total: 2836,
    core_pm: 94.3,
    business: 69.6,
    technical: 38.4,
    data: 51.6,
    ai: 29.6,
    ux_ui: 35.2,
  },
  {
    type: "Region",
    name: "Latinoamérica",
    total: 1497,
    core_pm: 92.8,
    business: 66.1,
    technical: 37.1,
    data: 47.6,
    ai: 23.7,
    ux_ui: 34.4,
  },
  {
    type: "Region",
    name: "United States",
    total: 1339,
    core_pm: 96.0,
    business: 73.6,
    technical: 39.7,
    data: 56.2,
    ai: 36.2,
    ux_ui: 36.0,
  },
  {
    type: "Country",
    name: "Brasil",
    total: 626,
    core_pm: 96.3,
    business: 64.9,
    technical: 39.1,
    data: 53.2,
    ai: 24.6,
    ux_ui: 37.4,
  },
  {
    type: "Country",
    name: "Chile",
    total: 182,
    core_pm: 86.8,
    business: 70.9,
    technical: 31.9,
    data: 48.9,
    ai: 20.3,
    ux_ui: 32.4,
  },
  {
    type: "Country",
    name: "Colombia",
    total: 201,
    core_pm: 94.0,
    business: 64.2,
    technical: 36.3,
    data: 41.3,
    ai: 27.9,
    ux_ui: 38.8,
  },
  {
    type: "Country",
    name: "México",
    total: 415,
    core_pm: 91.8,
    business: 66.3,
    technical: 38.8,
    data: 43.1,
    ai: 23.1,
    ux_ui: 30.4,
  },
  {
    type: "Country",
    name: "Perú",
    total: 73,
    core_pm: 79.5,
    business: 69.9,
    technical: 26.0,
    data: 38.4,
    ai: 16.4,
    ux_ui: 24.7,
  },
  {
    type: "Country",
    name: "United States",
    total: 1339,
    core_pm: 96.0,
    business: 73.6,
    technical: 39.7,
    data: 56.2,
    ai: 36.2,
    ux_ui: 36.0,
  },
]

const columns: ColumnDef<CompetencyData>[] = [
  {
    accessorKey: "name",
    header: "Región / País",
    cell: ({ row }) => {
      const type = row.original.type
      return (
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          {row.getValue("name")}
          <Badge variant="secondary" className="text-[10px] font-normal h-5 px-1.5 bg-slate-100 text-slate-500">
            {type}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Volumen (N)</div>,
    cell: ({ row }) => {
      const val = row.getValue("total") as number;
      return <div className="text-slate-600 text-right">{val.toLocaleString('en-US')}</div>
    },
  },
  {
    accessorKey: "core_pm",
    header: () => <div className="text-center">Core PM</div>,
    cell: ({ row }) => <div className="text-slate-600 font-medium text-center">{(row.getValue("core_pm") as number).toFixed(1)}%</div>,
  },
  {
    accessorKey: "business",
    header: () => <div className="text-center">Business</div>,
    cell: ({ row }) => <div className="text-slate-600 text-center">{(row.getValue("business") as number).toFixed(1)}%</div>,
  },
  {
    accessorKey: "technical",
    header: () => <div className="text-center">Technical</div>,
    cell: ({ row }) => <div className="text-slate-600 text-center">{(row.getValue("technical") as number).toFixed(1)}%</div>,
  },
  {
    accessorKey: "data",
    header: () => <div className="text-center">Data</div>,
    cell: ({ row }) => <div className="text-slate-600 text-center">{(row.getValue("data") as number).toFixed(1)}%</div>,
  },
  {
    accessorKey: "ai",
    header: () => <div className="text-center">AI</div>,
    cell: ({ row }) => <div className="text-slate-600 text-center">{(row.getValue("ai") as number).toFixed(1)}%</div>,
  },
  {
    accessorKey: "ux_ui",
    header: () => <div className="text-center">UX/UI</div>,
    cell: ({ row }) => <div className="text-slate-600 text-center">{(row.getValue("ux_ui") as number).toFixed(1)}%</div>,
  },
]

export function CompetencyDataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full mt-10">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-slate-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12 font-semibold text-slate-700">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
