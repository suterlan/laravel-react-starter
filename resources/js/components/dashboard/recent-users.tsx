import { User } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

type RecentUsersProps = {
	recentUsers: User[];
}
export const RecentUsers = ({ recentUsers }: RecentUsersProps) => {
	return (
		<div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
			<h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recent Users</h2>
			<table className="min-w-full text-left text-sm">
				<thead>
					<tr>
						<th className="px-4 py-2">Name</th>
						<th className="px-4 py-2">Email</th>
						<th className="px-4 py-2">Role</th>
					</tr>
				</thead>
				<tbody>
					<AnimatePresence>
						{recentUsers.length > 0 ? (
							recentUsers.map(user => (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="border-t border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
								>
									<td className="px-4 py-2">{user.name}</td>
									<td className="px-4 py-2">{user.email}</td>
									<td className="px-4 py-2">{user.role?.name || '-'}</td>
								</motion.tr>
							))
						) : (
							<tr>
								<td colSpan={3} className="text-center py-4 text-slate-500">
									No users found.
								</td>
							</tr>
						)}
					</AnimatePresence>
				</tbody>
			</table>
		</div>
	)
}
