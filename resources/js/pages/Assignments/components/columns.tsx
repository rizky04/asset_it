"use client"

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
import { Assignments } from "@/types"

export const columns: ColumnDef<Assignments>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user_id",
    header: "user_id",
    cell:({row}) => row.original.user.name
  }, 
  {
    accessorKey: "Asset ",
    header: "Asset",
    cell:({row}) => row.original.asset.name
  },
  {
    accessorKey: "Asset Code",
    header: "Asset Code",
    cell:({row}) => row.original.asset.assets_code
  },
  {
    accessorKey: "assignment_date",
    header: "assignment_date",
  },
  {
    accessorKey: "return_date",
    header: "return_date",
  },
  {
    accessorKey: "condition_note",
    header: "condition_note",
  },
  {
    accessorKey: "received_by",
    header: "received_by",
    cell:({row}) => row.original.user.name
  },
  {
    accessorKey: "status",
    header: "status",
    cell:({row}) => {
      const status = row.original.status
      return (
        <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === "returned"
            ? "bg-red-100 text-red-800"
            : status === "assigned"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
      )
    }
  },
  {
    accessorKey: "document_url",
    header: "document_url",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const assignments = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        console.log(assignments.id)
        const onDelete = () => {
            router.delete(route('assignments.destroy', assignments.id), {
                onSuccess: () => {
                    toast.success('assignments deleted successfully')
                },
                onError: () => {
                    toast.error('Failed to delete assignments')
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
                onClick={() => {router.visit(route('assignments.edit', assignments.id))}}
              >
               Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {router.visit(route('assignments.show', assignments.id))}}
              >
               Detail
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {router.visit(route('assignments.returned', assignments.id))}}
              >
               Return
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {router.visit(route('assignments.assign', assignments.id))}}
              >
              Assign to
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete data {assignments.asset.assets_code} ?</AlertDialogTitle>
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