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
import { SettingApproval } from "@/types"

export const columns: ColumnDef<SettingApproval>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user_id",
    header: "user_id",
    cell: ({ row }) => {
      const user = row.original.user
      return user ? user.name : 'N/A'
    }
  }, 


  {
    accessorKey: "type",
    header: "sequence",
  },
  {
    accessorKey: "name",
    header: "Type Name",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const settingApproval = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        console.log(settingApproval.id)
        const onDelete = () => {
            router.delete(route('settingApproval.destroy', settingApproval.id), {
                onSuccess: () => {
                    toast.success('settingApproval deleted successfully')
                },
                onError: () => {
                    toast.error('Failed to delete settingApproval')
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
                onClick={() => {router.visit(route('settingApproval.edit', settingApproval.id))}}
              >
               Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
              </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete data ?</AlertDialogTitle>
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