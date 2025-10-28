import { Company, CompanyUpdateData } from "@/types";
import * as browserStorage from "./localStorage";

export const STORAGE_KEY = "new-world-helper-companies";

export const getCompanies = async (): Promise<Company[]> => {
  return browserStorage.getCompanies();
};

export const getCompanyById = async (id: string): Promise<Company | null> => {
  return browserStorage.getCompanyById(id);
};

export const saveCompany = async (company: Company): Promise<void> => {
  browserStorage.saveCompany(company);
};

export const deleteCompany = async (id: string): Promise<void> => {
  browserStorage.deleteCompany(id);
};

export const createEmptyCompany = (name: string, type: "Company" | "Raid Group"): Company => {
  return browserStorage.createEmptyCompany(name, type);
};

export const updateCompanyData = async (
  companyId: string,
  updates: CompanyUpdateData,
): Promise<boolean> => {
  return browserStorage.updateCompanyData(companyId, updates);
};

export const addMemberToCompany = async (
  companyId: string,
  member: Company["members"][0],
): Promise<boolean> => {
  return browserStorage.addMemberToCompany(companyId, member);
};

export const updateMemberInCompany = async (
  companyId: string,
  originalName: string,
  updatedMember: Company["members"][0],
): Promise<boolean> => {
  return browserStorage.updateMemberInCompany(companyId, originalName, updatedMember);
};

export const getMemberByIndex = async (
  companyId: string,
  index: number,
): Promise<Company["members"][0] | null> => {
  return browserStorage.getMemberByIndex(companyId, index);
};
