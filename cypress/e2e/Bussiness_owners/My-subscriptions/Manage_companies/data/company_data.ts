import { generateRandomMobileNumber, generateRandomString, generateValidMobileNumber } from "../../../../../support/utils";

export class CompanyData {
  static cListGrid_selector = "tbody";
  static cCardItem_selector = "tr";
  static randomStr = generateRandomString(6);
  static companyName = "Company_" + this.randomStr;
  static branchName = "Branch" + this.randomStr;
  static cCountry = "Germany";
  static cCity = "Berlin";
  static cRegion = "Berlin Region";
  static address = "Address 12 33 45 66, Berlin";
  static cLongitude = "123456.789";
  static cLatitude = "987.651";
  static cTelephone = generateRandomMobileNumber();
  static cMail = "ccccc@gooo.com";
  static cAddress = "77 ddp Berlin 199877";
  static cPerson = "012123456789";
  static cPersonMail = "ppppp@gggg.com";
  static cContactPersonPosition = "Manager";
  static OrganizationUnit = "OrganizationUnit OrganizationUnit";
  static Organization = "Organization Organization";
  static TaxID = "TaxID TaxID";
  static CommercialID = "CommercialID CommercialID";
  static RegisteredAddress = "RegisteredAddress RegisteredAddress";
  static BusinessCategory = "BusinessCategory BusinessCategory";
  static StreetName = "StreetName StreetName";
  static CitySubdivisionName = "CitySubdivisionName CitySubdivisionName";
  static CompanyAddCityName = "CompanyAddCityName CompanyAddCityName";
  static PostalZone = "PostalZone PostalZone";
  static CountrySubentity = "CountrySubentity CountrySubentity";
  static BuildingNumber = "BuildingNumber BuildingNumber";
  static AdditionalStreetName = "AdditionalStreetName AdditionalStreetName";
  static RegistrationName = "RegistrationName RegistrationName";
  static branchesThSelector = 'th[role="columnheader"]';
  static codeTh = "Code";
  static BranchNameTh = "Branch Name";
  static BranchRegionTh = "Branch Region";
  static BranchCityTh = "Branch City";
  static BranchAdressTh = "Branch Address";
  static BranchPhoneTh = "Phone";
  static BranchEmailTh = "Branch Email";
  static BranchStatusRh = "Status";
  static BranchActionsTh = "Actions";
  static companyPhoneNumber = "+20";
  static contactNumber = "+20";
  static branchMobileNumber = generateRandomMobileNumber();

  static branchHeadersList = [
    "Code",
    "Branch Name",
    "Branch Region",
    "Branch City",
    "Branch Address",
    "Phone",
    "Branch Email",
    "Status",
    "Actions",
  ];
}
