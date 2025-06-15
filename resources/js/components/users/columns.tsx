"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
	id: string
	name: string
	email: string
	role_id: string
	role?: { id: string; name: string } // Include role object
}

export const columns = (
	setSelectedUser: (user: Users | null) => void,
	setIsEditModalOpen: (open: boolean) => void,
	confirmDelete: (user: Users) => void,
): ColumnDef<Users>[] => [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: 'no',
			header: '#',
			cell: ({ row }) => row.index + 1,
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Email
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => row.original.role?.name || 'N/A',
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const user = row.original

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem
								onClick={() => {
									console.log('Opening modal for user:', user);
									// Ensure role_id is a string
									setSelectedUser({
										...user,
										role_id: user.role_id?.toString(),
									});
									setIsEditModalOpen(true); // Use the correct state setter
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => confirmDelete(user)}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
