"use client"

import { Asset } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
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

import { useState } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { parse } from "path"

export const columns: ColumnDef<Asset>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "assets_code",
    header: "Code",
  },
  // {
  //   accessorKey: "name",
  //   header: "name",
  // },
  {
    accessorKey: "brand",
    header: "brand",
  },
  {
    accessorKey: "model",
    header: "model",
  },
  {
    accessorKey: "serial_number",
    header: "SN",
  },
  {
    header: "Spesifikasi",
    // accessorKey: "processor",
    cell: ({ row }) => {
      const processor = row.original.processor || "-";
      const storage = row.original.storage || "-";
      const ram = row.original.ram || "-";
      const ukuran_layar = row.original.ukuran_layar || "-";
      const os = row.original.os || "-";
      const office = row.original.office || "-";
      return (
        <div className="flex flex-col">
          {/* <span className="font-medium">{serial}</span> */}
          <span className="text-xs text-gray-500">{processor}</span>
          <span className="text-xs text-gray-500">{storage}</span>
          <span className="text-xs text-gray-500">{ram}</span>
          <span className="text-xs text-gray-500">{os}</span>
          <span className="text-xs text-gray-500">{office}</span>
          <span className="text-xs text-gray-500">{ukuran_layar}</span>
        </div>
      );
    }
  },
  //  {
  //   accessorKey: "storage",
  //   header: "storage",
  // },
  // {
  //   accessorKey: "ram",
  //   header: "RAM",
  // },
  // {
  //   accessorKey: "os",
  //   header: "os",
  // },
  // {
  //   accessorKey: "office",
  //   header: "office",
  // },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status;
  
      const statusColors: { [key: string]: string } = {
        available: "bg-green-100 text-green-800",
        assigned: "bg-blue-100 text-blue-800",
        maintenance: "bg-yellow-100 text-yellow-800",
        damaged: "bg-red-100 text-red-800",
        disposed: "bg-gray-200 text-gray-800",
      };
  
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            statusColors[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    }
  },
  // {
  //   accessorKey: "purchase_price",
  //   header: "purchase_price",
  //   cell:({row}) => {
  //     const price = parseFloat(row.getValue('purchase_price'))
  //     const formatted = new Intl.NumberFormat("id-ID", 
  //       { style: "currency", currency: "IDR"}).format(price);
  //     return formatted
  //   }
  // },
  // {
  //   accessorKey: "current_value",
  //   header: "current_value",
  //   cell:({row}) => {
  //     const current_value = parseFloat(row.getValue('current_value'))
  //     const formatted = new Intl.NumberFormat("id-ID",{
  //        style: "currency", 
  //        currency: "IDR"
  //       }).format(current_value);
  //     return formatted
  //   }
  // },
  {
    accessorKey: "category",
    header: "Category",
    cell:({row}) => row.original.category.name
  },
  
  
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const asset = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        console.log(asset.id)
        const onDelete = () => {
            router.delete(route('asset.destroy', asset.id), {
                onSuccess: () => {
                    toast.success('Asset deleted successfully')
                },
                onError: () => {
                    toast.error('Failed to delete Asset')
                },
            })
            setIsDialogOpen(false)
        }
        return (
          <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {router.visit(route('asset.edit', asset.id))}}
              >
               Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {router.visit(route('asset.show', asset.id))}}
              >
               Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {router.visit(route('asset.history', asset.id))}}
              >
               History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {router.visit(route('asset.duplicate', asset.id))}}
              >
               Copy Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete product {asset.name} ?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </>
        )
      },
  },
]