"use client";

import {
	Button,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { Company } from "@/types";
import { deleteCompany, getCompanies } from "@/lib/storage";

export default function CompanyListPage() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCompanies();
	}, []);

	const loadCompanies = async () => {
		try {
			const data = await getCompanies();
			setCompanies(data);
		} catch (error) {
			console.error("Error loading companies:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string, name: string) => {
		if (
			window.confirm(
				`Are you sure you want to delete "${name}"? This action cannot be undone.`
			)
		) {
			try {
				await deleteCompany(id);
				await loadCompanies();
			} catch (error) {
				console.error("Error deleting company:", error);
				alert("Failed to delete. Please try again.");
			}
		}
	};

	const formatDate = (dateString: string) => {
		if (!dateString) return "Never";
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="flex min-h-96 items-center justify-center">
				<p className="text-gray-500 dark:text-gray-400">Loading...</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Companies & Raid Groups
				</h1>
				<Button as={Link} href="/company/new" color="primary">
					<HiPlus className="mr-2 h-5 w-5" />
					Create New
				</Button>
			</div>

			{companies.length === 0 ? (
				<Card className="border-t-primary border-t-4 py-8 text-center">
					<div className="mx-auto max-w-md">
						<Image
							src="/NewWorldLogo.svg"
							alt="New World Logo"
							className="mx-auto mb-6 h-20 w-20"
							width={80}
							height={80}
						/>
						<h2 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">
							No Companies / Raid Groups Found
						</h2>
						<p className="mb-6 text-gray-600 dark:text-gray-400">
							You haven&apos;t created any Companies / Raid Groups yet. Create your
							first one to start tracking!
						</p>
						<div className="flex justify-center">
							<Button
								as={Link}
								href="/company/new"
								color="primary"
								size="lg"
								className="flex items-center gap-2"
							>
								<HiPlus className="h-5 w-5" />
								Create Your First Company / Raid Group
							</Button>
						</div>
					</div>
				</Card>
			) : (
				<Card>
					<div className="overflow-x-auto">
						<Table>
							<TableHead>
								<TableRow>
									<TableHeadCell>Name</TableHeadCell>
									<TableHeadCell>Type</TableHeadCell>
									<TableHeadCell>Member Count</TableHeadCell>
									<TableHeadCell>Last Updated</TableHeadCell>
									<TableHeadCell>
										<span className="sr-only">Actions</span>
									</TableHeadCell>
								</TableRow>
							</TableHead>
							<TableBody className="divide-y">
								{companies.map((company) => (
									<TableRow
										key={company.id}
										className="bg-white dark:border-gray-700 dark:bg-gray-800"
									>
										<TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
											{company.name}
										</TableCell>
										<TableCell>{company.type}</TableCell>
										<TableCell>{company.members.length}</TableCell>
										<TableCell>{formatDate(company.updatedAt)}</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button
													as={Link}
													href={`/company/${company.id}`}
													color="primary"
													size="sm"
												>
													<HiPencil className="mr-1 h-4 w-4" />
													Manage
												</Button>
												<Button
													color="red"
													size="sm"
													outline
													onClick={() =>
														handleDelete(company.id, company.name)
													}
												>
													<HiTrash className="mr-1 h-4 w-4" />
													Delete
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			)}
		</div>
	);
}
