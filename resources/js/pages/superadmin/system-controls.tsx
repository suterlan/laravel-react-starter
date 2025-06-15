import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Permission = {
	id: number;
	name: string;
};

type Role = {
	id: number;
	name: string;
	permissions: Permission[];
};

type PageProps = {
	roles: Role[];
	permissions: Permission[];
};

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'System Controls',
		href: '/dashboard/system',
	},
];

export default function SystemControls() {
	const { roles, permissions } = usePage<PageProps>().props;

	const [selectedRole, setSelectedRole] = useState<Role | null>(null);
	const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

	const handlePermissionChange = (permissionId: number) => {
		if (selectedPermissions.includes(permissionId)) {
			setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId));
		} else {
			setSelectedPermissions((prev) => [...prev, permissionId]);
		}
	};

	const handleSubmit = () => {
		if (!selectedRole) return;

		router.put(route('superadmin.role-permissions.update', selectedRole.id), {
			permissions: selectedPermissions,
		}, {
			preserveScroll: true,
			onSuccess: () => {
				setSelectedRole(null);
				setSelectedPermissions([]);
			},
		});
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="System Controls" />

			<div className="container mx-auto py-10 px-3">
				<h1 className="text-3xl font-extrabold mb-6 text-slate-800 dark:text-slate-100">
					Role Permissions
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{roles.map((role) => (
						<div
							key={role.id}
							className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
							onClick={() => {
								setSelectedRole(role);
								setSelectedPermissions(role.permissions.map((p) => p.id));
							}}
						>
							<h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
								{role.name}
							</h2>
							<p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
								Permissions: {role.permissions.map((p) => p.name).join(', ') || 'None'}
							</p>
						</div>
					))}
				</div>

				{selectedRole && (
					<div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
							Edit Permissions for Role: {selectedRole.name}
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{permissions.map((permission) => (
								<div key={permission.id} className="flex items-center">
									<input
										type="checkbox"
										id={`permission-${permission.id}`}
										checked={selectedPermissions.includes(permission.id)}
										onChange={() => handlePermissionChange(permission.id)}
										className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400 border-slate-300 dark:border-slate-600 rounded focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
									/>
									<label
										htmlFor={`permission-${permission.id}`}
										className="text-sm text-slate-800 dark:text-slate-100"
									>
										{permission.name}
									</label>
								</div>
							))}
						</div>

						<div className="mt-6 flex justify-end space-x-4">
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
								onClick={handleSubmit}
							>
								Save Permissions
							</button>
							<button
								className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
								onClick={() => {
									setSelectedRole(null);
									setSelectedPermissions([]);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</AppLayout>
	)
}