import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { FormEvent, useRef } from "react";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Link } from "@inertiajs/react"
import { router } from '@inertiajs/react'

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10, // default 10 row per page
    });  

    const handleExport = () => {
      window.location.href = "/assignment/export";
    };
  
    const handleImport = (e: FormEvent) => {
      e.preventDefault();
      if (fileInput.current?.files?.[0]) {
        const formData = new FormData();
        formData.append("file", fileInput.current.files[0]);
        router.post("/assignment/import", formData);
        setIsDialogOpen(false)
      }
    };
  
    const handleDownloadTemplate = () => {
      window.location.href = "/assignment/template";
    };


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter, // ← handler untuk global filter
    globalFilterFn: "includesString", // default filter fn
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter, // ← tambahkan ini
    },
  })
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRows);
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter name product..."
          value={globalFilter ?? ""} // ini yang tidak berfungsi
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={handleExport}>
            Export
          </Button> 
          <Button onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>
          Import
          </Button>
        <Button>
              <Link href={route("assignments.create")}>New Assignments</Link>
            </Button>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground">
          Menampilkan {start}–{end} dari {totalRows} data
        </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <select
            className="border px-2 py-1 rounded text-sm"
            value={pagination.pageSize}
            onChange={(e) => {
              setPagination({ ...pagination, pageSize: Number(e.target.value) });
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Tampilkan {pageSize}
              </option>
            ))}
          </select>
      </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unduh template terlebih dahulu</AlertDialogTitle>
              <AlertDialogDescription>
              <form onSubmit={handleImport} encType="multipart/form-data" className="flex items-center gap-2">
               <Input type="file" name="file" ref={fileInput} accept=".xlsx,.xls" />
               <Button type="submit">
              Import
            </Button>
            </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
             
              <AlertDialogAction onClick={handleDownloadTemplate}>Unduh Template</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          
        </AlertDialog>
    </>
  )
}