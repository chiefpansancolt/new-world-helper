"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiCog } from "react-icons/hi";
import SidebarCollapse from "./SidebarCollapse";

interface SidebarLinkProps {
	href: string;
	currentPath: string;
	icon?: React.ReactNode;
	indented?: boolean;
	children: React.ReactNode;
}

const SidebarLink = ({ href, currentPath, icon, indented = false, children }: SidebarLinkProps) => {
	const isActive = currentPath === href;

	return (
		<Link
			href={href}
			className={`flex items-center rounded-lg ${indented ? "p-2 pl-11" : "p-2"} text-base font-medium transition duration-75 ${
				isActive ? "bg-primary text-white" : "hover:bg-primary text-white"
			} group`}
		>
			{icon && (
				<span
					className={`${indented ? "mr-2" : ""} h-5 w-5 text-white transition duration-75`}
				>
					{icon}
				</span>
			)}
			<span className={!indented && icon ? "ml-3" : ""}>{children}</span>
		</Link>
	);
};

export default function AppSidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
	const pathname = usePathname();
	const params = useParams();

	const companyId = params?.id as string;
	const isCompanyRoute = pathname?.includes("/company/") && companyId;

	useEffect(() => {
		if (pathname) {
		}
	}, [pathname]);

	return (
		<aside
			className={`fixed top-0 left-0 z-40 h-screen w-64 pt-20 transition-transform ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			} bg-accent border-r border-gray-200 md:translate-x-0 dark:border-gray-700`}
			aria-label="Sidenav"
			id="drawer-navigation"
		>
			<div className="bg-accent h-full overflow-y-auto px-3 pb-28">
				<div className="bg-accent absolute right-0 bottom-0 left-0 border-t border-gray-200 p-4 dark:border-gray-700">
					<ul className="space-y-2">
						<li>
							<SidebarLink
								href="/settings"
								currentPath={pathname}
								icon={<HiCog className="h-5 w-5" />}
							>
								Settings
							</SidebarLink>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
}
