import { Company } from "@/types";

export const STORAGE_KEY = "new-world-helper-companies";

export const getCompanies = (): Company[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    return [];
  }

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing company from localStorage:", error);
    return [];
  }
};

export const getCompanyById = (id: string): Company | null => {
  const company = getCompanies();
  return company.find((Company) => Company.id === id) || null;
};

export const saveCompany = (company: Company): void => {
  if (typeof window === "undefined") {
    return;
  }

  const companies = getCompanies();
  const existingIndex = companies.findIndex((p) => p.id === company.id);

  if (existingIndex >= 0) {
    companies[existingIndex] = {
      ...company,
      updatedAt: new Date().toISOString(),
    };
  } else {
    companies.push({
      ...company,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
};

export const deleteCompany = (id: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const companies = getCompanies();
  const updatedCompany = companies.filter((p) => p.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompany));
};

export const createEmptyCompany = (name: string, type: "Company" | "Raid Group"): Company => {
  return {
    id: Date.now().toString(),
    type,
    name,
    createdAt: "",
    updatedAt: "",
    members: [],
  };
};

export const updateCompanyData = (companyId: string, updates: {}): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const company = getCompanyById(companyId);

  if (!company) {
    return false;
  }

  const updatedCompany = {
    ...company,
    updatedAt: new Date().toISOString(),
  };

  saveCompany(updatedCompany);

  return true;
};
