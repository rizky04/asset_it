"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QRCodeCanvas } from "qrcode.react";
import { Asset } from "@/types";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // optional: membuat URL QR per asset
  buildAssetUrl?: (a: any) => string;
};

export function DataTable<TData extends Asset, TValue>({
  columns,
  data,
  buildAssetUrl = (a) => `${window.location.origin}/qrcode/${a.id}`,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    // optional filter sederhana di sisi klien
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true;
      const v = `${JSON.stringify(row.original)}`.toLowerCase();
      return v.includes(String(filterValue).toLowerCase());
    },
  });

  const selectedAssets = table.getSelectedRowModel().rows.map((r) => r.original as Asset);

  // Render sheet tersembunyi untuk printing
  const printRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (selectedAssets.length === 0) return;

    // Tampilkan area print, lalu window.print
    const area = printRef.current;
    if (!area) return;

    // Simpel: gunakan CSS @media print agar hanya area ini yang dicetak
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search assets..."
          className="w-[260px]"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <Button
          variant="secondary"
          onClick={handlePrint}
          disabled={selectedAssets.length === 0}
          title={selectedAssets.length ? `Print ${selectedAssets.length} QR` : "Select assets first"}
        >
          Print QR ({selectedAssets.length})
        </Button>
        <Button
          variant="outline"
          onClick={() => table.resetRowSelection()}
          disabled={selectedAssets.length === 0}
        >
          Clear Selection
        </Button>
      </div>

      {/* Tabel */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {/* AREA CETAK */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .qr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; page-break-inside: avoid; }
          .qr-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .qr-title { font-size: 12px; margin-top: 8px; text-align: center; }
          .qr-sub { font-size: 11px; color: #6b7280; text-align: center; }
        }
      `}</style>

      <div id="print-area" ref={printRef} className="hidden print:block">
        <div className="qr-grid">
          {selectedAssets.map((a) => {
            const url = buildAssetUrl(a);
            return (
              <div key={a.id} className="qr-card">
                <QRCodeCanvas value={url} size={140} includeMargin />
                <div className="qr-title">{a.assets_code || a.name}</div>
                <div className="qr-sub">{url}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
