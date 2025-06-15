type DashboardCardsProps = {
	usersCount: number;
	rolesCount: number;
	permissionsCount: number;
};

export const DashboardCard = ({
	usersCount,
	rolesCount,
	permissionsCount,
}: DashboardCardsProps) => {
	const cards = [
		{ label: 'Users', count: usersCount, color: 'text-blue-600 dark:text-blue-400' },
		{ label: 'Roles', count: rolesCount, color: 'text-green-600 dark:text-green-400' },
		{ label: 'Permissions', count: permissionsCount, color: 'text-purple-600 dark:text-purple-400' },
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{cards.map(({ label, count, color }) => (
				<div key={label} className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold text-slate-700 dark:text-white">{label}</h2>
					<p className={`text-3xl font-bold ${color}`}>{count}</p>
				</div>
			))}
		</div>
	)
}
