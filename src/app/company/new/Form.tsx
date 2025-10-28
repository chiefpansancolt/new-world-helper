"use client";

import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEmptyCompany, saveCompany } from "@/lib/storage";

export default function NewCompanyForm() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [type, setType] = useState<"Company" | "Raid Group">("Company");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			setError("Please enter a name for your company/raid group");
			return;
		}

		setIsSubmitting(true);
		setError("");

		try {
			const newCompany = createEmptyCompany(name.trim(), type);
			saveCompany(newCompany);

			router.push("/company/list");
		} catch (err) {
			console.error("Error creating company/raid group:", err);
			setError("Failed to create company/raid group. Please try again.");
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto max-w-md">
			<Card className="text-gray-900 dark:text-gray-50">
				<h2 className="mb-6 text-2xl font-bold">Create New Company/Group</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="type">Type</Label>
						</div>
						<Select
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value as "Company" | "Raid Group")}
							required
						>
							<option value="Company">Company</option>
							<option value="Raid Group">Raid Group</option>
						</Select>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Choose whether this is a Company or a Raid Group.
						</p>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="name">Name</Label>
						</div>
						<TextInput
							id="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Give your {type} a name.
						</p>
					</div>

					{error && <Alert color="failure">{error}</Alert>}

					<div className="flex justify-end">
						<Button type="submit" color="primary" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : `Create ${type}`}
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
