"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import dayjs from 'dayjs'
 
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
import { Approval, Assignments, SettingApproval, Users } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InputError from "@/components/input-error"
import { Input } from "@/components/ui/input"

export const columns: ColumnDef<Assignments>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user",
    header: "User",
  }, 
  {
    accessorKey: "asset",
    header: "Assets",
  },
  {
    accessorKey: "assets_code",
    header: "Assets Code",
  },
  {
    accessorKey: "assignment_date",
    header: "Assignment Date",
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
  },
  {
    accessorKey: "condition_note",
    header: "Kondisi",
  },
  {
    accessorKey: "receivedBy",
    header: "Penerima",
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
    id: "approval_status",
    header: "Approval Status",
    // cell: ({ row, table }) => {
    //   const assignments = row.original;
    //   const approvals = table.options.meta?.approvals as Approval[];
    //   const settingApprovals = table.options.meta?.settingApproval as SettingApproval[];

    //   const assignmentApprovals = approvals.filter(
    //     (a) => a.assignment_id === assignments.id
    //   );

    //   const notApproved = settingApprovals.filter(
    //     (setting) =>
    //       !assignmentApprovals.some(
    //         (approval) => approval.user_id === setting.user_id
    //       )
    //   );

    //   return (
    //     <div>
    //       {notApproved.length > 0 ? (
    //         notApproved.map((setting) => (
    //           <p key={setting.id} className="text-red-600">
    //             ❌ {setting.name}
    //           </p>
    //         ))
    //       ) : (
    //         <p className="text-green-600">✅ All Approved</p>
    //       )}
    //     </div>
    //   );
    // },
    cell: ({ row, table }) => {
      const assignments = row.original;
      const approvals = table.options.meta?.approvals as Approval[];
      const settingApprovals = table.options.meta?.settingApproval as SettingApproval[];
     
    
      // Ambil approvals khusus untuk assignment ini
      const assignmentApprovals = approvals.filter(
        (a) => a.assignment_id === assignments.id
      );
    
      return (
        <div className="space-y-1">
          {settingApprovals
          .filter((setting) => setting.user_id === assignments.user_id)
          .map((setting) => {
            // Cari apakah setting approval ini sudah di-approve
            const approved = assignmentApprovals.find(
              (approval) => approval.user_id === setting.user_id
            );
    
            if (approved) {
              // ✅ Jika sudah approve, tampil centang hijau + nama user
              return (
                <p key={setting.id} className="text-green-600">
                  ✅ {setting.name} by {approved.user?.name || 'Unknown'}
                </p>
              );
            } else {
              // ❌ Jika belum approve
              return (
                <p key={setting.id} className="text-red-600">
                  ❌ {setting.name}
                </p>
              );
            }
          })}

{settingApprovals
          .filter((setting) => setting.type != 1)
          .map((setting) => {
            // Cari apakah setting approval ini sudah di-approve
            const approved = assignmentApprovals.find(
              (approval) => approval.user_id === setting.user_id
            );
    
            if (approved) {
              // ✅ Jika sudah approve, tampil centang hijau + nama user
              return (
                <p key={setting.id} className="text-green-600">
                  ✅ {setting.name} by {approved.user?.name || 'Unknown'}
                </p>
              );
            } else {
              // ❌ Jika belum approve
              return (
                <p key={setting.id} className="text-red-600">
                  ❌ {setting.name}
                </p>
              );
            }
          })}

{/* {approvals
  .filter((approval) => approval.assignment_id === assignments.id)
  .map((approval) => {
    // Jika approval user_id sama dengan assignment.received_by
    if (approval.user_id === assignments.received_by) {
      return (
        <p key={approval.id} className="text-green-600">
          ✅ Penerima {assignments.receivedBy || 'Unknown'}
        </p>
      );
    } else {
      return (
        <div key={approval.id} className="text-red-600">
          ❌ Penerima {assignments.receivedBy || 'Unknown'}
        </div>
      );
    }
  })} */
  
  }

{(() => {
  const hasApproved = approvals.some(
    (approval) =>
      approval.assignment_id === assignments.id &&
      approval.user_id === assignments.received_by // sesuaikan jika received_by adalah object
  );

  return (
    <p className={hasApproved ? "text-green-600" : "text-red-600"}>
      {hasApproved ? "✅ Penerima " : "❌ Penerima "}
      {assignments.receivedBy || "Unknown"}
    </p>
  );
})()}

  

        </div>
      ); 
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
        const assignments = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        const [openModal, setOpenModal] = useState(false)
        const [userID, setUserID] = useState<number>(0);
        const [date, setDate] = useState<string>();
        const users = table.options.meta?.users as Users[];

       
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

        const approved = (e: React.FormEvent) => {
          e.preventDefault();
          router.post(route('approved'), {
            assignment_id: assignments.id,
          },{
            onSuccess: () => {
              toast.success('approved successfully')
          },
          onError: () => {
              toast.error('Failed to approved')
          },
          });
        }

        const assignTo = (e: React.FormEvent) => {
          e.preventDefault();
         
          router.post(route('assignments.store'), {
            asset_id: assignments.asset_id,
            received_by: userID,
            assignment_date: date,
            condition_note : assignments.condition_note,
          },{
            onSuccess: () => {
              toast.success('assigned successfully')
              setOpenModal(false);
          },
          onError: () => {
              toast.error('Failed to assigned')
          },
          });
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
              <DropdownMenuItem onClick={() => {setTimeout(() => {setOpenModal(true)}, 100)}}>Asign to</DropdownMenuItem>
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
             Re_assign
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={approved}
              >
              Approved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete data {assignments.asset} ?</AlertDialogTitle>
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

<AlertDialog open={openModal} onOpenChange={setOpenModal}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Assign to user</AlertDialogTitle>
      <AlertDialogDescription>
        <form onSubmit={assignTo}>
          <div className="grid grid-cols-1 gap-4">
            <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Pilih User</label>
            <Select onValueChange={(value) => setUserID(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
            <Input
              type="date"
              name="condition_note"
              // defaultValue={assignments.condition_note}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter condition note"
            />
            </div>
          </div>

          
           <div className="gap-2 flex items-center justify-end mt-4">
           <Button type="submit" size="sm" className="mt-5">
            Sign to
          </Button>
          <Button type="button" size="sm" className="mt-5" onClick={() => setOpenModal(false)}>Cancel</Button>
            </div>     
         
          {/* <AlertDialogCancel onClick={() => setOpenModal(false)}>Cancel</AlertDialogCancel> */}
        </form>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      {/* <AlertDialogCancel onClick={() => setOpenModal(false)}>Cancel</AlertDialogCancel> */}
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


       
        </>
        )
      },
  },
]