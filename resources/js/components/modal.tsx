import React from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { Loader2 } from 'lucide-react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	onSubmit: () => void;
	submitText?: string;
	isLoading?: boolean;
}

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	onSubmit,
	submitText = 'Save',
	isLoading,
}: ModalProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				{/* Background overlay */}
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black opacity-80" />
				</TransitionChild>

				{/* Modal content */}
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
								<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
									{title}
								</h3>
								<div className="mt-4">{children}</div>
								<div className="mt-6 flex justify-end space-x-2">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-rose-400 dark:bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 dark:hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 dark:focus-visible:ring-rose-400 focus-visible:ring-offset-2 cursor-pointer"
										onClick={onClose}
									>
										Cancel
									</button>
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-blue-300 focus-visible:ring-offset-2 cursor-pointer"
										onClick={onSubmit}
										disabled={isLoading}
									>
										{isLoading ? (
											<span className="flex items-center">
												<Loader2 className="animate-spin w-4 h-4 mr-2" />
												Loading...
											</span>
										) : (
											submitText
										)}
									</button>
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}