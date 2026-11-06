export interface LocationRecord {
  id: string;
  officeName: string;
  pincode: string;
  officeType: string;
  relatedSuboffice: string;
  relatedHeadOffice: string;
  taluk: string;
  district: string;
  areaCategory: string;
}

export interface PincodeCheckResult {
  checkedPin: string;
  available: boolean;
  message: string;
  locations: LocationRecord[];
}

