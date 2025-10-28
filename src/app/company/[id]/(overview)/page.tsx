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
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiEye, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import { Company, Member } from "@/types";
import { getCompanyById } from "@/lib/storage";

export default function MembersPage() {
	const params = useParams();
	const router = useRouter();
	const companyId = params?.id as string;

	const [company, setCompany] = useState<Company | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCompany();
	}, [companyId]);

	const loadCompany = async () => {
		try {
			const data = await getCompanyById(companyId);
			setCompany(data);
		} catch (error) {
			console.error("Error loading company:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteMember = (memberName: string) => {
		if (
			window.confirm(
				`Are you sure you want to remove ${memberName} from ${company?.name}? This action cannot be undone.`
			)
		) {
			// TODO: Implement member deletion
			console.log("Delete member:", memberName);
		}
	};

	const getPrimaryGearset = (member: Member): string => {
		const primary = member.gearsets.find((gs) => gs.primary);
		return primary ? primary.type : "-";
	};

	if (loading) {
		return (
			<div className="flex min-h-96 items-center justify-center">
				<p className="text-gray-500 dark:text-gray-400">Loading...</p>
			</div>
		);
	}

	if (!company) {
		return (
			<div className="p-6">
				<Card>
					<div className="py-12 text-center">
						<p className="mb-4 text-gray-500 dark:text-gray-400">
							Company/Raid Group not found.
						</p>
						<Button as={Link} href="/company/list" color="primary">
							Back to List
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div>
			<BreadcrumbsComp name={company.name} overview={true} id={companyId} />

			<div className="p-6">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							{company.name}
						</h1>
						<p className="mt-1 text-gray-500 dark:text-gray-400">
							{company.type} • {company.members.length} member
							{company.members.length !== 1 ? "s" : ""}
						</p>
					</div>
					<Button as={Link} href={`/company/${companyId}/member/new`} color="primary">
						<HiPlus className="mr-2 h-5 w-5" />
						Add Member
					</Button>
				</div>

			{company.members.length === 0 ? (
				<Card>
					<div className="py-12 text-center">
						<p className="mb-4 text-gray-500 dark:text-gray-400">
							No members found. Add your first member to get started.
						</p>
						<Button
							as={Link}
							href={`/company/${companyId}/member/new`}
							color="primary"
						>
							<HiPlus className="mr-2 h-5 w-5" />
							Add First Member
						</Button>
					</div>
				</Card>
			) : (
				<Card>
					<div className="overflow-x-auto">
						<Table>
							<TableHead>
								<TableRow>
									<TableHeadCell>Player Name</TableHeadCell>
									<TableHeadCell>Role</TableHeadCell>
									<TableHeadCell>House Count</TableHeadCell>
									<TableHeadCell>Trophy Count</TableHeadCell>
									<TableHeadCell>Gearset Count</TableHeadCell>
									<TableHeadCell>Gearset Primary</TableHeadCell>
									<TableHeadCell>
										<span className="sr-only">Actions</span>
									</TableHeadCell>
								</TableRow>
							</TableHead>
							<TableBody className="divide-y">
								{company.members.map((member, index) => (
									<TableRow
										key={index}
										className="bg-white dark:border-gray-700 dark:bg-gray-800"
									>
										<TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
											{member.name}
										</TableCell>
										<TableCell>{member.role}</TableCell>
										<TableCell>{member.houseCount}</TableCell>
										<TableCell>{member.trophies.length}</TableCell>
										<TableCell>{member.gearsets.length}</TableCell>
										<TableCell>{getPrimaryGearset(member)}</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button
													as={Link}
													href={`/company/${companyId}/member/${index}`}
													color="light"
													size="sm"
												>
													<HiEye className="mr-1 h-4 w-4" />
													View
												</Button>
												<Button
													as={Link}
													href={`/company/${companyId}/member/${index}/edit`}
													color="primary"
													size="sm"
												>
													<HiPencil className="mr-1 h-4 w-4" />
													Edit
												</Button>
												<Button
													color="red"
													size="sm"
													outline
													onClick={() => handleDeleteMember(member.name)}
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
		</div>
	);
}
