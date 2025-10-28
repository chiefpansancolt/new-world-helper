import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { BreadCrumbsProps } from "@/types";

const BreadcrumbsComp = ({ name, overview = false, routeName, id }: BreadCrumbsProps) => {
	return (
		<nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-700">
			<div className="flex items-center justify-between px-4 py-2">
				<Breadcrumb aria-label="Default breadcrumb example">
					<BreadcrumbItem href="/" icon={HiHome}>
						Home
					</BreadcrumbItem>
					<BreadcrumbItem href="/company/list">Companies</BreadcrumbItem>
					{overview ? (
						<BreadcrumbItem>{name}</BreadcrumbItem>
					) : (
						<>
							<BreadcrumbItem href={`/company/${id}/`}>{name}</BreadcrumbItem>
							<BreadcrumbItem>{routeName}</BreadcrumbItem>
						</>
					)}
				</Breadcrumb>
			</div>
		</nav>
	);
};

export default BreadcrumbsComp;
