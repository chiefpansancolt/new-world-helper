"use client";

import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Member } from "@/types";
import { addMemberToCompany, getCompanyById } from "@/lib/storage";

export default function NewMemberPage() {
	const params = useParams();
	const router = useRouter();
	const companyId = params?.id as string;

	const [companyName, setCompanyName] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState<Member["role"]>("Member");
	const [houseCount, setHouseCount] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		loadCompanyName();
	}, [companyId]);

	const loadCompanyName = async () => {
		const company = await getCompanyById(companyId);
		if (company) {
			setCompanyName(company.name);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			setError("Please enter a player name");
			return;
		}

		setIsSubmitting(true);
		setError("");

		try {
			const newMember: Member = {
				name: name.trim(),
				role,
				houseCount,
				trophies: [],
				gearsets: [],
			};

			const success = await addMemberToCompany(companyId, newMember);

			if (success) {
				router.push(`/company/${companyId}`);
			} else {
				setError("Failed to add member. Company not found.");
				setIsSubmitting(false);
			}
		} catch (err) {
			console.error("Error adding member:", err);
			setError("Failed to add member. Please try again.");
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-6">
			<div className="mb-6">
				<Link
					href={`/company/${companyId}`}
					className="text-primary hover:underline"
				>
					← Back to {companyName || "Company"}
				</Link>
			</div>

			<div className="mx-auto max-w-2xl">
				<Card className="text-gray-900 dark:text-gray-50">
					<h2 className="mb-6 text-2xl font-bold">Add New Member</h2>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name">Player Name</Label>
							</div>
							<TextInput
								id="name"
								placeholder="Enter player name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Enter the in-game player name.
							</p>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="role">Role</Label>
							</div>
							<Select
								id="role"
								value={role}
								onChange={(e) => setRole(e.target.value as Member["role"])}
								required
							>
								<option value="Member">Member</option>
								<option value="Settler">Settler</option>
								<option value="Officer">Officer</option>
								<option value="Council">Council</option>
								<option value="Governor">Governor</option>
							</Select>
							<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Select the player's role in the company.
							</p>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="houseCount">House Count</Label>
							</div>
							<TextInput
								id="houseCount"
								type="number"
								min="0"
								max="5"
								placeholder="0"
								value={houseCount}
								onChange={(e) => setHouseCount(parseInt(e.target.value) || 0)}
								required
							/>
							<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Number of houses owned by this player (0-5).
							</p>
						</div>

						{error && <Alert color="failure">{error}</Alert>}

						<div className="flex justify-end gap-2">
							<Button
								as={Link}
								href={`/company/${companyId}`}
								color="light"
								disabled={isSubmitting}
							>
								Cancel
							</Button>
							<Button type="submit" color="primary" disabled={isSubmitting}>
								{isSubmitting ? "Adding..." : "Add Member"}
							</Button>
						</div>
					</form>

					<div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
						<p className="text-sm text-blue-800 dark:text-blue-300">
							<strong>Note:</strong> Trophies and gearsets can be added after
							creating the member by editing their profile.
						</p>
					</div>
				</Card>
			</div>
		</div>
	);
}
