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
import { Permission } from "@/types"

export const columns = (
	setSelectedPermission: (permission: Permission | null) => void,
	setIsEditModalOpen: (open: boolean) => void,
	confirmDelete: (permission: Permission) => void,
): ColumnDef<Permission>[] => [
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
			header: 'No',
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
			id: "actions",
			cell: ({ row }) => {
				const permission = row.original

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
									console.log('Opening modal for role:', permission);
									setSelectedPermission({
										...permission,
									});
									setIsEditModalOpen(true); // Use the correct state setter
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => confirmDelete(permission)}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]