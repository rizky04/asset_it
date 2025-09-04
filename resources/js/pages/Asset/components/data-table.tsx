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

import { FormEvent, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // +++


import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Link } from "@inertiajs/react"
import { router } from '@inertiajs/react'

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
    window.location.href = "/assets/export";
  };

  const handleImport = (e: FormEvent) => {
    e.preventDefault();
    if (fileInput.current?.files?.[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      router.post("/assets/import", formData);
      setIsDialogOpen(false)
    }
  };

  const handleDownloadTemplate = () => {
    window.location.href = "/assets/template";
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
    // +++ enable row selection
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter, // ← tambahkan ini
      rowSelection, // +++
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
          placeholder="Filter data"
          // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("name")?.setFilterValue(event.target.value)
          // }
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
              <Button
                  variant="secondary"
                  onClick={() => window.print()}
                  disabled={table.getSelectedRowModel().rows.length === 0}
              >
                  Print QR ({table.getSelectedRowModel().rows.length})
              </Button>
        <div className="flex flex-wrap gap-2 items-center">

          {/* <form onSubmit={handleImport} encType="multipart/form-data" className="flex items-center gap-2">
            <Input type="file" name="file" className="text-sm h-10 px-2 py-1 w-40" ref={fileInput} accept=".xlsx,.xls" />
            <Button type="submit">
              Import
            </Button>
          </form> */}
          <Button onClick={handleExport}>
            Export
          </Button>
          <Button onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>
          Import
          </Button>
          <Button>
            <Link href={route("asset.create")}>New Asset</Link>
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
      {/* <div className="rounded-md border">   */}
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[640px]">
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
        <style>{`
  @media print {
    body * { visibility: hidden; }
    #print-area, #print-area * { visibility: visible; }
    #print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 16px; }
    .qr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; page-break-inside: avoid; }
    .qr-card { display: flex; flex-direction: column; align-items: center; justify-content: center;
               padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; }
    .qr-title { font-size: 12px; margin-top: 8px; text-align: center; }
    .qr-sub { font-size: 11px; color: #6b7280; text-align: center; }
  }
`}</style>

<div id="print-area" className="hidden print:block">
  <div className="qr-grid">
    {table.getSelectedRowModel().rows.map((r) => {
      const a: any = r.original;
      const id = a?.assets_code;
      const label = a?.assets_code ?? a?.name ?? `Asset ${id}`;
      // URL sederhana (sesuaikan bila ada route publik detail asset)
      const url = `${window.location.origin}/qrcode/${id}`;
      return (
        <div key={id} className="qr-card">
          <QRCodeCanvas value={url} size={200} includeMargin />
          <div className="qr-title">{label}</div>
          <div className="qr-sub">{url}</div>
        </div>
      );
    })}
  </div>
</div>

    </>
  )
}