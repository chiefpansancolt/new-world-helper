"use client";

import { Alert, Badge, Button, Card, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import { Gearset, Member, Trophy } from "@/types";
import { getCompanyById, getMemberByIndex, updateMemberInCompany } from "@/lib/storage";

type TrophyType = Trophy["type"];
type TrophyLevel = Trophy["level"];
type GearsetType = Gearset["type"];
type WeaponType = Gearset["weapon1"];

const TROPHY_TYPES: TrophyType[] = [
	"Angry Earth",
	"Ancient",
	"Lost",
	"Human",
	"Beast",
	"Corrupted",
];

const GEARSET_TYPES: GearsetType[] = ["Healer", "Tank", "Melee", "Mage", "Artillery", "Ranged"];

const WEAPON_TYPES: WeaponType[] = [
	"Sword & Shield",
	"Rapier",
	"Hatchet",
	"Great Axe",
	"War Hammer",
	"Bow",
	"Musket",
	"Fire Staff",
	"Life Staff",
	"Spear",
	"Greatsword",
	"Ice Gauntlet",
	"Void Gauntlet",
	"Blunderbuss",
];

export default function EditMemberPage() {
	const params = useParams();
	const router = useRouter();
	const companyId = params?.id as string;
	const memberIndex = parseInt(params?.index as string);

	const [companyName, setCompanyName] = useState("");
	const [originalName, setOriginalName] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState<Member["role"]>("Member");
	const [houseCount, setHouseCount] = useState(0);
	const [preferredRaidDays, setPreferredRaidDays] = useState<string[]>([]);
	const [trophies, setTrophies] = useState<Trophy[]>([]);
	const [gearsets, setGearsets] = useState<Gearset[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		loadMemberData();
	}, [companyId, memberIndex]);

	const getTrophiesByType = (type: TrophyType): Trophy[] => {
		return trophies.filter((t) => t.type === type);
	};

	const addTrophy = (type: TrophyType) => {
		const existing = getTrophiesByType(type);
		if (existing.length >= 3) {
			return; // Max 3 per type
		}
		setTrophies([...trophies, { type, level: "Minor" }]);
	};

	const updateTrophyLevel = (type: TrophyType, index: number, level: TrophyLevel) => {
		const typeTrophies = getTrophiesByType(type);
		if (!typeTrophies[index]) return;

		const allOtherTrophies = trophies.filter((t) => t.type !== type);
		const updatedTypeTrophies = [...typeTrophies];
		updatedTypeTrophies[index] = { type, level };

		setTrophies([...allOtherTrophies, ...updatedTypeTrophies]);
	};

	const removeTrophy = (type: TrophyType, index: number) => {
		const typeTrophies = getTrophiesByType(type);
		const allOtherTrophies = trophies.filter((t) => t.type !== type);
		const updatedTypeTrophies = typeTrophies.filter((_, i) => i !== index);

		setTrophies([...allOtherTrophies, ...updatedTypeTrophies]);
	};

	const addGearset = () => {
		const newGearset: Gearset = {
			type: "Melee",
			weapon1: "Sword & Shield",
			weapon2: "Rapier",
			weaponArtifact: "",
			armorArtifact: "",
			trinketArtifact: "",
			gearscore: 700,
			attributes: {
				strength: 5,
				dexterity: 5,
				intelligence: 5,
				focus: 5,
				constitution: 5,
			},
			primary: gearsets.length === 0, // First one is primary by default
		};
		setGearsets([...gearsets, newGearset]);
	};

	const updateGearset = (index: number, updatedGearset: Gearset) => {
		const newGearsets = [...gearsets];

		// If setting this as primary, unset all others
		if (updatedGearset.primary) {
			newGearsets.forEach((gs, i) => {
				if (i !== index) {
					gs.primary = false;
				}
			});
		}

		newGearsets[index] = updatedGearset;
		setGearsets(newGearsets);
	};

	const removeGearset = (index: number) => {
		const newGearsets = gearsets.filter((_, i) => i !== index);

		// If we removed the primary, make the first one primary
		if (gearsets[index].primary && newGearsets.length > 0) {
			newGearsets[0].primary = true;
		}

		setGearsets(newGearsets);
	};

	const toggleRaidDay = (day: string) => {
		if (preferredRaidDays.includes(day)) {
			setPreferredRaidDays(preferredRaidDays.filter((d) => d !== day));
		} else {
			setPreferredRaidDays([...preferredRaidDays, day]);
		}
	};

	const loadMemberData = async () => {
		try {
			const company = await getCompanyById(companyId);
			if (company) {
				setCompanyName(company.name);
			}

			const member = await getMemberByIndex(companyId, memberIndex);
			if (member) {
				setOriginalName(member.name);
				setName(member.name);
				setRole(member.role);
				setHouseCount(member.houseCount);
				setPreferredRaidDays(member.preferredRaidDays || []);
				setTrophies(member.trophies || []);
				setGearsets(member.gearsets || []);
			} else {
				setError("Member not found");
			}
		} catch (err) {
			console.error("Error loading member:", err);
			setError("Failed to load member data");
		} finally {
			setLoading(false);
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
			const updatedMember: Member = {
				name: name.trim(),
				role,
				houseCount,
				preferredRaidDays,
				trophies,
				gearsets,
			};

			const success = await updateMemberInCompany(companyId, originalName, updatedMember);

			if (success) {
				router.push(`/company/${companyId}`);
			} else {
				setError("Failed to update member. Member not found.");
				setIsSubmitting(false);
			}
		} catch (err) {
			console.error("Error updating member:", err);
			setError("Failed to update member. Please try again.");
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex min-h-96 items-center justify-center">
				<p className="text-gray-500 dark:text-gray-400">Loading...</p>
			</div>
		);
	}

	if (error && !name) {
		return (
			<div className="p-6">
				<Card>
					<div className="py-12 text-center">
						<p className="mb-4 text-gray-500 dark:text-gray-400">{error}</p>
						<Button as={Link} href={`/company/${companyId}`} color="primary">
							Back to Company
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div>
			<BreadcrumbsComp
				name={companyName || "Company"}
				routeName={`Edit ${originalName}`}
				id={companyId}
			/>

			<div className="p-6">
				<div className="mx-auto max-w-7xl">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Section 1: Member Details */}
						<Card className="text-gray-900 dark:text-gray-50">
							<h2 className="mb-6 text-2xl font-bold">Member Details</h2>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
								</div>

								<div>
									<div className="mb-2 block">
										<Label htmlFor="houseCount">House Count</Label>
									</div>
									<TextInput
										id="houseCount"
										type="number"
										min="0"
										max="3"
										placeholder="0"
										value={houseCount}
										onChange={(e) => setHouseCount(parseInt(e.target.value) || 0)}
										required
									/>
								</div>

								<div className="md:col-span-2">
									<div className="mb-2 block">
										<Label>Preferred Raid Days</Label>
									</div>
									<div className="flex flex-wrap gap-2">
										{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
											(day) => (
												<label
													key={day}
													className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
												>
													<input
														type="checkbox"
														checked={preferredRaidDays.includes(day)}
														onChange={() => toggleRaidDay(day)}
														className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
													/>
													<span className="text-sm">{day}</span>
												</label>
											)
										)}
									</div>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										Select the days this player is available for raids.
									</p>
								</div>
							</div>
						</Card>

						{/* Section 2: Trophies */}
						<Card className="text-gray-900 dark:text-gray-50">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold">Trophies</h2>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Max 3 per type
								</p>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								{TROPHY_TYPES.map((type) => {
									const typeTrophies = getTrophiesByType(type);
									return (
										<Card key={type} className="bg-gray-50 dark:bg-gray-900">
											<div className="flex items-center justify-between">
												<h4 className="font-medium text-gray-900 dark:text-white">
													{type}
												</h4>
												<Button
													size="sm"
													color="light"
													onClick={() => addTrophy(type)}
													disabled={typeTrophies.length >= 3}
												>
													<HiPlus className="h-4 w-4" />
												</Button>
											</div>

											{typeTrophies.length > 0 ? (
												<div className="mt-3 space-y-2">
													{typeTrophies.map((trophy, index) => (
														<div key={index} className="flex items-center gap-2">
															<Select
																value={trophy.level}
																onChange={(e) =>
																	updateTrophyLevel(
																		type,
																		index,
																		e.target.value as TrophyLevel
																	)
																}
																className="flex-1"
																sizing="sm"
															>
																<option value="Minor">Minor</option>
																<option value="Basic">Basic</option>
																<option value="Major">Major</option>
															</Select>
															<Button
																size="sm"
																color="red"
																outline
																onClick={() => removeTrophy(type, index)}
															>
																<HiTrash className="h-4 w-4" />
															</Button>
														</div>
													))}
												</div>
											) : (
												<p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
													No trophies
												</p>
											)}
										</Card>
									);
								})}
							</div>
						</Card>

						{/* Section 3: Gearsets */}
						<Card className="text-gray-900 dark:text-gray-50">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold">Gearsets</h2>
								<Button size="sm" color="primary" onClick={addGearset}>
									<HiPlus className="mr-2 h-4 w-4" />
									Add Gearset
								</Button>
							</div>

							{gearsets.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-12">
									<p className="mb-4 text-gray-500 dark:text-gray-400">
										No gearsets added yet.
									</p>
									<Button color="primary" onClick={addGearset}>
										<HiPlus className="mr-2 h-5 w-5" />
										Add First Gearset
									</Button>
								</div>
							) : (
								<div className="space-y-4">
									{gearsets.map((gearset, index) => (
										<Card
											key={index}
											className="border-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
										>
											<div className="mb-4 flex items-center justify-between">
												<div className="flex items-center gap-2">
													<h3 className="text-lg font-semibold">
														{gearset.type} Build
													</h3>
													{gearset.primary && (
														<Badge color="success">Primary</Badge>
													)}
												</div>
												<Button
													size="sm"
													color="red"
													outline
													onClick={() => removeGearset(index)}
												>
													<HiTrash className="mr-1 h-4 w-4" />
													Remove
												</Button>
											</div>

											<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
												<div>
													<Label htmlFor={`type-${index}`}>Type</Label>
													<Select
														id={`type-${index}`}
														value={gearset.type}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																type: e.target.value as GearsetType,
															})
														}
														sizing="sm"
													>
														{GEARSET_TYPES.map((type) => (
															<option key={type} value={type}>
																{type}
															</option>
														))}
													</Select>
												</div>

												<div>
													<Label htmlFor={`weapon1-${index}`}>Weapon 1</Label>
													<Select
														id={`weapon1-${index}`}
														value={gearset.weapon1}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																weapon1: e.target.value as WeaponType,
															})
														}
														sizing="sm"
													>
														{WEAPON_TYPES.filter(
															(weapon) => weapon !== gearset.weapon2
														).map((weapon) => (
															<option key={weapon} value={weapon}>
																{weapon}
															</option>
														))}
													</Select>
												</div>

												<div>
													<Label htmlFor={`weapon2-${index}`}>Weapon 2</Label>
													<Select
														id={`weapon2-${index}`}
														value={gearset.weapon2}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																weapon2: e.target.value as WeaponType,
															})
														}
														sizing="sm"
													>
														{WEAPON_TYPES.filter(
															(weapon) => weapon !== gearset.weapon1
														).map((weapon) => (
															<option key={weapon} value={weapon}>
																{weapon}
															</option>
														))}
													</Select>
												</div>

												<div>
													<Label htmlFor={`gearscore-${index}`}>Gearscore</Label>
													<TextInput
														id={`gearscore-${index}`}
														type="number"
														min="0"
														max="800"
														value={gearset.gearscore}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																gearscore: parseInt(e.target.value) || 0,
															})
														}
														sizing="sm"
													/>
												</div>

												<div>
													<Label htmlFor={`weaponArtifact-${index}`}>
														Weapon Artifact
													</Label>
													<TextInput
														id={`weaponArtifact-${index}`}
														placeholder="Optional"
														value={gearset.weaponArtifact}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																weaponArtifact: e.target.value,
															})
														}
														sizing="sm"
													/>
												</div>

												<div>
													<Label htmlFor={`armorArtifact-${index}`}>
														Armor Artifact
													</Label>
													<TextInput
														id={`armorArtifact-${index}`}
														placeholder="Optional"
														value={gearset.armorArtifact}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																armorArtifact: e.target.value,
															})
														}
														sizing="sm"
													/>
												</div>

												<div>
													<Label htmlFor={`trinketArtifact-${index}`}>
														Trinket Artifact
													</Label>
													<TextInput
														id={`trinketArtifact-${index}`}
														placeholder="Optional"
														value={gearset.trinketArtifact}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																trinketArtifact: e.target.value,
															})
														}
														sizing="sm"
													/>
												</div>

												<div className="md:col-span-2 lg:col-span-3">
													<Label>Attributes</Label>
													<div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-5">
														<div>
															<Label
																htmlFor={`strength-${index}`}
																className="text-xs"
															>
																Strength
															</Label>
															<TextInput
																id={`strength-${index}`}
																type="number"
																min="5"
																value={gearset.attributes.strength}
																onChange={(e) =>
																	updateGearset(index, {
																		...gearset,
																		attributes: {
																			...gearset.attributes,
																			strength: parseInt(e.target.value) || 5,
																		},
																	})
																}
																sizing="sm"
															/>
														</div>
														<div>
															<Label
																htmlFor={`dexterity-${index}`}
																className="text-xs"
															>
																Dexterity
															</Label>
															<TextInput
																id={`dexterity-${index}`}
																type="number"
																min="5"
																value={gearset.attributes.dexterity}
																onChange={(e) =>
																	updateGearset(index, {
																		...gearset,
																		attributes: {
																			...gearset.attributes,
																			dexterity: parseInt(e.target.value) || 5,
																		},
																	})
																}
																sizing="sm"
															/>
														</div>
														<div>
															<Label
																htmlFor={`intelligence-${index}`}
																className="text-xs"
															>
																Intelligence
															</Label>
															<TextInput
																id={`intelligence-${index}`}
																type="number"
																min="5"
																value={gearset.attributes.intelligence}
																onChange={(e) =>
																	updateGearset(index, {
																		...gearset,
																		attributes: {
																			...gearset.attributes,
																			intelligence:
																				parseInt(e.target.value) || 5,
																		},
																	})
																}
																sizing="sm"
															/>
														</div>
														<div>
															<Label htmlFor={`focus-${index}`} className="text-xs">
																Focus
															</Label>
															<TextInput
																id={`focus-${index}`}
																type="number"
																min="5"
																value={gearset.attributes.focus}
																onChange={(e) =>
																	updateGearset(index, {
																		...gearset,
																		attributes: {
																			...gearset.attributes,
																			focus: parseInt(e.target.value) || 5,
																		},
																	})
																}
																sizing="sm"
															/>
														</div>
														<div>
															<Label
																htmlFor={`constitution-${index}`}
																className="text-xs"
															>
																Constitution
															</Label>
															<TextInput
																id={`constitution-${index}`}
																type="number"
																min="5"
																value={gearset.attributes.constitution}
																onChange={(e) =>
																	updateGearset(index, {
																		...gearset,
																		attributes: {
																			...gearset.attributes,
																			constitution:
																				parseInt(e.target.value) || 5,
																		},
																	})
																}
																sizing="sm"
															/>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2 md:col-span-2 lg:col-span-3">
													<input
														type="checkbox"
														id={`primary-${index}`}
														checked={gearset.primary}
														onChange={(e) =>
															updateGearset(index, {
																...gearset,
																primary: e.target.checked,
															})
														}
														className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
													/>
													<Label htmlFor={`primary-${index}`}>
														Set as Primary Gearset
													</Label>
												</div>
											</div>
										</Card>
									))}
								</div>
							)}
						</Card>

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
								{isSubmitting ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
