import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="bg-primary p-6 text-white">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="col-span-1 md:col-span-2">
						<Link href="/" className="mb-4 flex items-center">
							{/*<Image
								src=""
								className="mr-3 h-8"
								alt="New World Logo"
								width={32}
								height={32}
							/>*/}
							<span className="self-center text-2xl font-semibold whitespace-nowrap">
								New World Helper
							</span>
						</Link>
						<p className="my-4 font-light">
							New World Helper to help you tracker your company members in game
							character details and build parties for Raids and other in game events.
						</p>
						<ul className="mt-5 flex space-x-6">
							<li>
								<a
									href="https://github.com/chiefpansancolt/dinkum-tracker"
									className="hover:text-highlight text-gray-200"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaGithub className="h-5 w-5" />
									<span className="sr-only">GitHub</span>
								</a>
							</li>
							<li>
								<a
									href="https://discord.gg/cwFw5EwThh"
									className="hover:text-highlight text-gray-200"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaDiscord className="h-5 w-5" />
									<span className="sr-only">Discord</span>
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
						<ul>
							<li className="mb-4">
								<a
									href="https://nwdb.info"
									className="hover:text-highlight"
									target="_blank"
									rel="noopener noreferrer"
								>
									New World Database
								</a>
							</li>
							<li className="mb-4">
								<a href="/settings" className="hover:text-highlight">
									Settings
								</a>
							</li>
						</ul>
					</div>

					<div>
						<ul>
							<li className="mb-4 text-sm">
								This project is not affiliated with, endorsed by, or connected to
								New World or its creators.
							</li>
							<li className="mb-4 text-sm">
								Game data is sourced from the New World Database. Game images and
								names are used for reference purposes only.
							</li>
						</ul>
					</div>
				</div>
				<hr className="my-6 border-gray-200/20 lg:my-8" />
				<div className="text-center">
					<span className="text-sm">© 2025 New World Helper. All Rights Reserved.</span>
				</div>
			</div>
		</footer>
	);
}
