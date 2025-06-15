import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { columns as columnsPermission } from "@/components/permissions/columns";
import { DataTable as DataTablePermission } from "@/components/permissions/data-table";
import { Permission, type BreadcrumbItem } from "@/types";
import { AlertTriangle, Plus } from "lucide-react";
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Manage Permissions',
		href: '/dashboard/permissions',
	},
];

type Errors = { [key: string]: string };

type PermissionProps = {
	permissions: Permission[];
}

const ManagePermissions = ({ permissions }: PermissionProps) => {
	const [permission, setPermission] = useState<Permission[]>(permissions);
	const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
	const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);
	// State for errors
	const [insertErrors, setInsertErrors] = useState<Errors>({});
	const [editErrors, setEditErrors] = useState<Errors>({});
	// state for modal
	const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	//state for insert Permission
	const [newPermission, setNewPermission] = useState<Permission>({
		id: '',
		name: ''
	});

	useEffect(() => {
		setPermission(permission);
	}, [permission]);

	const handleInsert = () => {
		setIsSubmitting(true);

		router.post(route('superadmin.permissions.store'), {
			name: newPermission.name,
		}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				setIsSubmitting(false);
				setIsInsertModalOpen(false);
				setInsertErrors({});
				setNewPermission({ id: '', name: '' }); // reset input
			},
			onError: (err) => {
				setIsSubmitting(false);
				setInsertErrors(err as Errors);
			}
		});
	};

	const handleUpdate = () => {
		if (!selectedPermission) return;

		setIsSubmitting(true);

		router.put(route('superadmin.permissions.update', selectedPermission.id), {
			name: selectedPermission.name,
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

	const confirmDelete = (permission: Permission) => {
		setPermissionToDelete(permission);
		setIsDeleteModalOpen(true);
	}

	const handleDelete = () => {
		if (!permissionToDelete) return;

		router.delete(route('superadmin.permissions.destroy', permissionToDelete.id), {
			preserveScroll: true,
			onSuccess: () => {
				setIsDeleteModalOpen(false);
				setPermissionToDelete(null);
			},
		});
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Manage Permissions" />

			<div className="container mx-auto py-10 px-3">
				<button
					className="flex items-center bg-slate-500 dark:bg-slate-600 text-slate-100 text-sm px-3 py-1.5 rounded-md mb-4 hover:bg-slate-600 dark:hover:bg-slate-700 cursor-pointer active:bg-slate-700 dark:active:bg-slate-800 gap-0.5"
					onClick={() => setIsInsertModalOpen(true)}
				>
					<Plus size={18} />
					Add Permission
				</button>

				<DataTablePermission
					columns={columnsPermission(setSelectedPermission, setIsEditModalOpen, confirmDelete)}
					data={permission}
				/>
			</div>

			{/* Insert Permission Modal */}
			<Modal
				isOpen={isInsertModalOpen}
				onClose={() => setIsInsertModalOpen(false)}
				title="Add New Permission"
				onSubmit={handleInsert}
				submitText="Submit"
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-3">
						<Input
							value={newPermission.name}
							onChange={(e) => setNewPermission((prev) => ({ ...prev, name: e.target.value }))}
							required
							autoComplete="name"
							placeholder="Permission name..."
						/>
						<InputError className="mt-2" message={insertErrors.name || ''} />
					</div>
				</form>
			</Modal>

			{/* Edit Permission Modal */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title="Edit Permission"
				onSubmit={handleUpdate}
				submitText="Update"
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-3">
						<Input
							value={selectedPermission?.name || ''}
							onChange={(e) => setSelectedPermission((prev) => (prev ? { ...prev, name: e.target.value } : null))}
							required
							autoComplete="name"
							placeholder="Permission name..."
						/>
						<InputError className="mt-2" message={editErrors.name || ''} />
					</div>
				</form>
			</Modal>

			{/* Confirm Delete Permission Modal */}
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
							Are you sure you want to delete permission {' '}
							<span className="font-semibold text-red-600">
								{permissionToDelete?.name}
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

export default ManagePermissions