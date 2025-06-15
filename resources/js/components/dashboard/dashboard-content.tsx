import { usePage } from '@inertiajs/react';
import { DashboardCard } from './dashboard-card'
import { RoleBarChart, RolePieChart } from './dashboard-charts';
import { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { Role, SharedData, User } from '@/types';
import { RecentUsers } from './recent-users';

type RoleDistributionItem = Role & { users_count: number };

type DashboardUpdateEvent = {
	type: string;
	usersCount: number;
	rolesCount: number;
	permissionsCount: number;
	roleDistribution: RoleDistributionItem[];
	newUser?: User;
};

export const DashboardContent = () => {
	const { auth } = usePage<SharedData>().props;
	const {
		usersCount: initialUsersCount = 0,
		rolesCount: initialRolesCount = 0,
		permissionsCount: initialPermissionsCount = 0,
		roleDistribution: initialRoleDistribution = [],
		recentUsers: initialRecentUsers = [],
	} = usePage<{
		usersCount: number;
		rolesCount: number;
		permissionsCount: number;
		roleDistribution: RoleDistributionItem[];
		recentUsers: User[];
	}>().props;

	const [usersCount, setUsersCount] = useState<number>(initialUsersCount);
	const [rolesCount, setRolesCount] = useState<number>(initialRolesCount);
	const [permissionsCount, setPermissionsCount] = useState<number>(initialPermissionsCount);
	const [roleDistribution, setRoleDistribution] = useState<RoleDistributionItem[]>(initialRoleDistribution);
	const [recentUsers, setRecentUsers] = useState<User[]>(initialRecentUsers);

	const userRole = auth?.user?.role?.name ?? 'guest';

	useEffect(() => {
		if (typeof window.Echo === 'undefined') return;

		const channelName = `dashboard.${userRole}`;
		const echoChannel = window.Echo.private(channelName);

		echoChannel.listen('.dashboard.updates', (event: DashboardUpdateEvent) => {
			if (!event) return;

			toast.info(`Dashboard updated: ${event.type.replace('_', ' ')}`, {
				toastId: `dashboard-${event.type}`, // agar tidak spam toast
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: true,
				theme: 'light',
				transition: Slide,
			});

			setUsersCount(event.usersCount);
			setRolesCount(event.rolesCount);
			setPermissionsCount(event.permissionsCount);
			setRoleDistribution(event.roleDistribution);

			const user = event.newUser;
			if (!user) return;

			if (event.type === 'created') {
				// Tambahkan user baru di awal
				setRecentUsers(prev => [user, ...prev.filter(u => u.id !== user.id)].slice(0, 5)); // Batasi hanya 5 user terbaru
			} else if (event.type === 'updated') {
				// Update user jika ada di list
				setRecentUsers(prev => {
					const updated = prev.map(u => u.id === user.id ? user : u);
					// Tambahkan jika belum ada
					if (!prev.some(u => u.id === user.id)) {
						return [user, ...updated].slice(0, 5); // Batasi hanya 5 user terbaru
					}
					return updated;
				});
			} else if (event.type === 'deleted') {
				// Hapus user dari recentUsers
				setRecentUsers(prev => prev.filter(u => u.id !== user.id));
			}
		});

		return () => {
			window.Echo.leave(channelName);
		};
	}, [userRole]);

	// Render konten berdasarkan role
	if (userRole === 'superadmin' || userRole === 'admin') {
		return (
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

				<DashboardCard
					usersCount={usersCount}
					rolesCount={rolesCount}
					permissionsCount={permissionsCount}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<RolePieChart roleDistribution={roleDistribution} />
					<RoleBarChart roleDistribution={roleDistribution} />
				</div>

				{/* Recent Users */}
				<RecentUsers recentUsers={recentUsers} />

			</div>
		);
	}

	// Default untuk user biasa
	return (
		<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
			{/* User Dashboard */}
			<h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
				Welcome, {auth?.user?.name}!
			</h1>

			<p className="text-gray-600 dark:text-gray-400">
				You are logged in as a {userRole}.
			</p>

			{/* Tambahkan konten lain untuk user biasa */}

		</div>
	);
}
