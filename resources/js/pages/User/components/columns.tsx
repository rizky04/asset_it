"use client"

import { Users } from "@/types"
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

export const columns: ColumnDef<Users>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "departement",
    header: "Departement",
  },
  {
    accessorKey: "business_unit",
    header: "Business Unit",
  },
  {
    accessorKey: "work_location",
    header: "Work Location",
  },  
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "access",
    header: "Access",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const user = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        console.log(user.id)
        const onDelete = () => {
            router.delete(route('user.destroy', user.id), {
                onSuccess: () => {
                    toast.success('user deleted successfully')
                },
                onError: () => {
                    toast.error('Failed to delete user')
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
                onClick={() => {router.visit(route('user.edit', user.id))}}
              >
               Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {router.visit(route('user.show', user.id))}}
              >
               Detail
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete product {user.name} ?</AlertDialogTitle>
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