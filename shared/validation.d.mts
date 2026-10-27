export type EnquiryKind = "contact" | "service" | "amc" | "partnership";
export type EnquiryData = Record<string, string | boolean | string[]>;
export const enquiryTypes: string[];
export const applianceCategories: string[];
export const businessTypes: string[];
export const partnershipServices: string[];
export const volumes: string[];
export const planNames: string[];
export function indiaToday(): string;
export function validateEnquiry(
  kind: string,
  data: unknown,
): { success: boolean; data?: EnquiryData; errors: Record<string, string> };
