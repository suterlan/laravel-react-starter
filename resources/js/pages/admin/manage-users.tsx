import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { Users, columns } from '@/components/users/columns';
import { DataTable as DataTableUser } from "@/components/users/data-table"
import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { AlertTriangle, Plus } from 'lucide-react';

type Errors = { [key: string]: string };

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Manage Users',
		href: '/dashboard/manage-users',
	},
];

export default function ManageUsers({ users }: { users: Users[] }) {
	const { roles } = usePage<{ roles: { id: number; name: string }[] }>().props; // Ambil roles dari props Inertia
	const [data, setData] = useState<Users[]>(users);
	// State for errors
	const [insertErrors, setInsertErrors] = useState<Errors>({});
	const [editErrors, setEditErrors] = useState<Errors>({});

	// State for selected user
	const [selectedUser, setSelectedUser] = useState<Users | null>(null);
	const [userToDelete, setUserToDelete] = useState<Users | null>(null);

	// State for modal visibility
	const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// State for new user
	const [newUser, setNewUser] = useState<Users & { password?: string; confirmPassword?: string }>({
		id: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role_id: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		// Set data pengguna
		setData(users);
	}, [users]);

	// Handle insert new user
	const handleInsert = () => {
		const newErrors: Errors = {};
		if (!newUser.name) newErrors.name = 'Name is required.';
		if (!newUser.email) newErrors.email = 'Email is required.';
		if (!newUser.password) newErrors.password = 'Password is required.';
		if (!newUser.confirmPassword) newErrors.confirmPassword = 'Password confirmation is required.';
		if (newUser.password !== newUser.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
		if (!newUser.role_id) newErrors.role_id = 'Role is required.';

		if (Object.keys(newErrors).length > 0) {
			setInsertErrors(newErrors);
			return;
		}

		setIsSubmitting(true);

		// Kirim data pengguna baru ke backend
		router.post(route('dashboard.manage-users.store'), {
			name: newUser.name,
			email: newUser.email,
			password: newUser.password,
			password_confirmation: newUser.confirmPassword,
			role_id: newUser.role_id,
		}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				setIsSubmitting(false);
				setIsInsertModalOpen(false);
				setInsertErrors({});
				setNewUser({
					id: '',
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
					role_id: '',
				});
			},
			onError: (backendErrors) => {
				setIsSubmitting(false);
				setInsertErrors(backendErrors as Errors);
			},
		});
	};

	// Handle user update
	const handleUpdate = () => {
		if (!selectedUser) return;

		setIsSubmitting(true);

		router.put(route('dashboard.manage-users.update', selectedUser.id), {
			name: selectedUser.name,
			email: selectedUser.email,
			role_id: selectedUser.role_id,
		}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				setIsSubmitting(false);
				setIsEditModalOpen(false);
				setEditErrors({}); // Reset errors after successful update
			},
			onError: (backendErrors) => {
				setIsSubmitting(false);
				setEditErrors(backendErrors as Errors);
			},
		});
	};

	const handleDelete = () => {
		if (!userToDelete) return;

		router.delete(route('dashboard.manage-users.destroy', userToDelete.id), {
			preserveScroll: true,
			onSuccess: () => {
				setIsDeleteModalOpen(false);
				setUserToDelete(null);
			},
		});
	}

	const confirmDelete = (user: Users) => {
		setUserToDelete(user);
		setIsDeleteModalOpen(true);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Manage Users" />

			<div className="container mx-auto py-10 px-3">
				<button
					className="flex bg-slate-500 dark:bg-slate-600 text-slate-100 text-sm px-3 py-1.5 rounded-md mb-4 hover:bg-slate-600 dark:hover:bg-slate-700 cursor-pointer active:bg-slate-700 dark:active:bg-slate-800 gap-0.5"
					onClick={() => setIsInsertModalOpen(true)}
				>
					<Plus size={18} />
					Add User
				</button>

				<DataTableUser
					columns={columns(setSelectedUser, setIsEditModalOpen, confirmDelete)}
					data={data}
				/>
			</div>

			{/* Insert User Modal */}
			<Modal
				isOpen={isInsertModalOpen}
				onClose={() => setIsInsertModalOpen(false)}
				title="Add New User"
				onSubmit={handleInsert}
				submitText="Add"
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Name</label>
						<Input
							id='name'
							className={`mt-1 block w-full ${insertErrors.name ? 'border-red-500' : ''}`}
							value={newUser.name}
							onChange={(e) =>
								setNewUser((prev) => ({ ...prev, name: e.target.value }))
							}
							required
							autoComplete="name"
							placeholder="Full name"
						/>

						<InputError className="mt-2" message={insertErrors.name || ''} />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Email</label>
						<Input
							type="email"
							className="mt-1 block w-full"
							value={newUser.email}
							onChange={(e) =>
								setNewUser((prev) => ({ ...prev, email: e.target.value }))
							}
							required
							autoComplete='email'
							placeholder='Email address'
						/>

						<InputError className="mt-2" message={insertErrors.email || ''} />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Password</label>
						<Input
							id='password'
							type='password'
							className='mt-1 block w-full'
							value={newUser.password || ''}
							onChange={(e) =>
								setNewUser((prev) => ({ ...prev, password: e.target.value }))
							}
							required
							placeholder="Password"
						/>

						<InputError className="mt-2" message={insertErrors.password || ''} />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Password Confirm</label>
						<Input
							id='confirmPassword'
							type='password'
							className='mt-1 block w-full'
							value={newUser.confirmPassword || ''}
							onChange={(e) =>
								setNewUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
							}
							required
							placeholder="Password Confirmation"
						/>

						<InputError className="mt-2" message={insertErrors.confirmPassword || ''} />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Role</label>
						<Select
							value={newUser.role_id || ''}
							onValueChange={(value) =>
								setNewUser((prev) => ({ ...prev, role_id: value }))
							}
							required
						>
							<SelectTrigger className="mt-1" aria-label="Role">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								{roles.map((role) => (
									<SelectItem key={role.id} value={role.id.toString()}>
										{role.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<InputError className="mt-2" message={insertErrors.role_id} />
					</div>
				</form>
			</Modal>

			{/* Edit User Modal */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)} // Close the modal
				title="Edit User"
				onSubmit={handleUpdate} // Save the changes
				isLoading={isSubmitting}
			>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Name</label>
						<Input
							id='edit-name'
							type="text"
							className={`mt-1 block w-full ${editErrors.name ? 'border-red-500' : ''}`}
							value={selectedUser?.name || ''}
							onChange={(e) =>
								setSelectedUser((prev) => (prev ? { ...prev, name: e.target.value } : null))
							}
							required
							autoComplete="name"
							placeholder="Full name"
						/>

						<InputError className="mt-2" message={editErrors.name || ''} />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Email</label>
						<Input
							id="edit-email"
							type="email"
							className={`mt-1 block w-full ${editErrors.email ? 'border-red-500' : ''}`}
							value={selectedUser?.email || ''}
							onChange={(e) =>
								setSelectedUser((prev) => (prev ? { ...prev, email: e.target.value } : null))
							}
							required
							autoComplete="email"
							placeholder="Email address"
						/>

						<InputError className="mt-2" message={editErrors.email || ''} />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Role</label>
						<Select
							value={selectedUser?.role_id || ''}
							onValueChange={(value) =>
								setSelectedUser((prev) => (prev ? { ...prev, role_id: value } : null))
							}
						>
							<SelectTrigger className="mt-1" aria-label="Role">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								{roles.map((role) => (
									<SelectItem key={role.id} value={role.id.toString()}>
										{role.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<InputError className="mt-2" message={editErrors.role_id || ''} />
					</div>
				</form>
			</Modal>

			{/* Confirm Delete User Modal */}
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
							Are you sure you want to delete user {' '}
							<span className="font-semibold text-red-600">
								{userToDelete?.name}
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