"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { GiPartyPopper } from "react-icons/gi";
import { HiPlus } from "react-icons/hi";

export default function Home() {
	return (
		<div className="text-gray-900 dark:text-gray-50">
			<div className="relative isolate overflow-hidden">
				<svg
					className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="new-world-pattern"
							width="200"
							height="200"
							x="50%"
							y="-1"
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<svg
						x="50%"
						y="-1"
						className="overflow-visible fill-gray-200/20 dark:fill-gray-800/20"
					>
						<path
							d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
							strokeWidth="0"
						/>
					</svg>
					<rect
						width="100%"
						height="100%"
						strokeWidth="0"
						fill="url(#new-world-pattern)"
					/>
				</svg>
				<div
					className="absolute -top-40 -right-20 -z-10 transform-gpu blur-3xl"
					aria-hidden="true"
				>
					<div
						className="from-primary/20 to-accent/20 aspect-1108/632 w-277 bg-linear-to-r opacity-20"
						style={{
							clipPath:
								"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
						<div className="mt-6 sm:mt-10">
							<span className="font-medium">Track Your Groups</span>
						</div>
						<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
							New World Helper
						</h1>
						<p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
							Track your Company or Raid Groups to build Raid runs to see how ready
							you are.
						</p>
						<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
							<Button
								as={Link}
								href="/company/list"
								color="primary"
								size="xl"
								className="w-full px-6 sm:w-auto"
							>
								View Companies / Groups
							</Button>
							<Button
								as={Link}
								href="/company/new"
								color="secondary"
								size="xl"
								className="w-full px-6 sm:w-auto"
							>
								<HiPlus className="mr-2 h-5 w-5" />
								Create New
							</Button>
						</div>
					</div>
					<div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0">
						<div className="relative">
							<Image
								src="/NewWorld.jpg"
								alt="New World Image"
								width={400}
								height={400}
								className="relative z-10 w-full rounded-2xl shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
							/>
							<div className="bg-accent absolute -bottom-10 -left-10 h-full w-full rounded-2xl opacity-10 blur-lg"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
				<svg
					className="absolute inset-0 -z-10 h-full w-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="cta-pattern"
							width="200"
							height="200"
							x="50%"
							y="0"
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<svg
						x="50%"
						y="0"
						className="overflow-visible fill-gray-200/20 dark:fill-gray-800/20"
					>
						<path
							d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
							strokeWidth="0"
						/>
					</svg>
					<rect width="100%" height="100%" strokeWidth="0" fill="url(#cta-pattern)" />
				</svg>
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="from-accent to-primary relative left-[calc(50%-11rem)] aspect-1108/632 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
						Ready to start tracking?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
						Begin organizing your New World Company/Raid Group today.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
						<Button
							as={Link}
							href="/company/new"
							color="primary"
							size="xl"
							className="w-full sm:w-auto"
						>
							<GiPartyPopper className="mr-2 h-5 w-5" />
							Create Company / Group
						</Button>
						<Button
							as={Link}
							href="/company/list"
							color="light"
							size="xl"
							className="w-full sm:w-auto"
						>
							View Companies / Groups
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
