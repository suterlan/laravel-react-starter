import AppLayout from "@/layouts/app-layout"
import { DataTable as DataTableRole } from "@/components/roles/data-table";
import { Role, type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import { columns as columnsRole } from "@/components/roles/columns";
import { AlertTriangle, Plus } from "lucide-react";
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Manage Roles',
		href: '/dashboard/roles',
	},
];

type Errors = { [key: string]: string };

type RoleProps = {
	roles: Role[];
}

const ManageRoles = ({ roles }: RoleProps) => {
	const [role, setRole] = useState<Role[]>(roles);
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);
	const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
	// State for errors
	const [insertErrors, setInsertErrors] = useState<Errors>({});
	const [editErrors, setEditErrors] = useState<Errors>({});
	// state for modal
	const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	//state for insert Role
	const [newRole, setNewRole] = useState<Role>({
		id: '',
		name: ''
	});

	useEffect(() => {
		setRole(roles);
	}, [roles]);

	const handleInsert = () => {
		setIsSubmitting(true);

		router.post(route('superadmin.roles.store'), {
			name: newRole.name,
		}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				setIsSubmitting(false);
				setIsInsertModalOpen(false);
				setInsertErrors({});
				setNewRole({ id: '', name: '' }); // reset input
			},
			onError: (err) => {
				setIsSubmitting(false);
				setInsertErrors(err as Errors);
			}
		});
	};

	const handleUpdate = () => {
		if (!selectedRole) return;

		setIsSubmitting(true);

		router.put(route('superadmin.roles.update', selectedRole.id), {
			name: selectedRole.name,
		}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				setIsSubmitting(false);
				setIsEditModalOpen(false);
				setEditErrors({});
			},
			onError: (err) => {
				setIsSubmitting(false);
				setEditErrors(err as Errors);
			}
		});
	};

	const confirmDelete = (role: Role) => {
		setRoleToDelete(role);
		setIsDeleteModalOpen(true);
	}

	const handleDelete = () => {
		if (!roleToDelete) return;

		router.delete(route('superadmin.roles.destroy', roleToDelete.id), {
			preserveScroll: true,
			onSuccess: () => {
				setIsDeleteModalOpen(false);
				setRoleToDelete(null);
			},
		});
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Manage Roles" />

			<div className="container mx-auto py-10 px-3">
				<button
					className="flex items-center bg-slate-500 dark:bg-slate-600 text-slate-100 text-sm px-3 py-1.5 rounded-md mb-4 hover:bg-slate-600 dark:hover:bg-slate-700 cursor-pointer active:bg-slate-700 dark:active:bg-slate-800 gap-0.5"
					onClick={() => setIsInsertModalOpen(true)}
				>
					<Plus size={18} />
					Add Role
				</button>

				<DataTableRole
					columns={columnsRole(setSelectedRole, setIsEditModalOpen, confirmDelete)}
					data={role}
				/>
			</div>

			{/* Insert Role Modal */}
			<Modal
				isOpen={isInsertModalOpen}
				onClose={() => setIsInsertModalOpen(false)}
				title="Add New Role"
				onSubmit={handleInsert}
				submitText="Submit"
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-3">
						<Input
							value={newRole.name}
							onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
							required
							autoComplete="name"
							placeholder="Role name..."
						/>
						<InputError className="mt-2" message={insertErrors.name || ''} />
					</div>
				</form>
			</Modal>

			{/* Edit Role Modal */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title="Edit Role"
				onSubmit={handleUpdate}
				submitText="Update"
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-3">
						<Input
							value={selectedRole?.name || ''}
							onChange={(e) => setSelectedRole((prev) => (prev ? { ...prev, name: e.target.value } : null))}
							required
							autoComplete="name"
							placeholder="Role name..."
						/>
						<InputError className="mt-2" message={editErrors.name || ''} />
					</div>
				</form>
			</Modal>

			{/* Confirm Delete Role Modal */}
			<Modal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				title="Confirm Deletion"
				onSubmit={handleDelete}
				submitText="Yes, Delete"
			>
				<div className="flex items-start space-x-3">
					<div className="text-red-600 mt-1">
						<AlertTriangle className="text-yellow-500 dark:text-yellow-300" />
					</div>
					<div>
						<p className="text-sm text-gray-800 dark:text-gray-200 mb-1">
							Are you sure you want to delete role {' '}
							<span className="font-semibold text-red-600">
								{roleToDelete?.name}
							</span>
							?
						</p>
						<p className="text-xs text-gray-600 dark:text-gray-400">
							This action cannot be undone.
						</p>
					</div>
				</div>
			</Modal>

		</AppLayout>
	)
}

export default ManageRoles