export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: any) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomEmail() {
  var email = generateRandomString(8) + "@test.com";
  return email;
}

export function generateRandomMobileNumber() {
  const prefix = "010";
  const randomNumber = Math.floor(Math.random() * 1e8)
    .toString()
    .padStart(8, "0");
  return prefix + randomNumber;
}
export function generateValidMobileNumber() {
  const prefix = "010";
  const randomNumber = Math.floor(Math.random() * 1e5)
    .toString()
    .padStart(5, "0");
  return prefix + randomNumber;
}
export function calculateExpiryDate(count: number, isMonthly: boolean): string {
  const today = new Date();
  let expiryDate;
  if (isMonthly) {
    expiryDate = new Date(today.setMonth(today.getMonth() + count));
  } else {
    expiryDate = new Date(today.setFullYear(today.getFullYear() + count));
  }
  expiryDate.setDate(expiryDate.getDate() - 1);
  const day = String(expiryDate.getDate()).padStart(2, "0");
  const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
  const year = expiryDate.getFullYear();
  const formattedExpiryDate = `${day}/${month}/${year}`;
  return formattedExpiryDate;
}

export const clearCookies = () => {
  cy.clearCookies();
};

export const clearLocalStorage = () => {
  cy.clearLocalStorage();
};

export const getWrappedString = (x: JQuery<HTMLElement>) => {
  var str = "";
  if (x != null) {
    str = trimText(x.toString()).trim();
  }
  return str;
};
export const getWrappedNumber = (x: JQuery<HTMLElement>) => {
  var i = 0;
  if (x != null) {
    i = parseInt(trimText(x.toString()).trim());
  }
  return i;
};

export function cleanText(txt: string): string {
  var cleanedText = "";
  if (txt != null) {
    cleanedText = txt
      .replace(/\u00a0/g, " ")
      .trim()
      .toString()
      .trim()
      .replace("&nbsp;", "");
  }
  return cleanedText;
}

export function getNextYearSameDay(): string {
  const today = new Date();
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(today.setFullYear(nextYear));

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return nextYearDate.toLocaleDateString("en-US", options);
}

export const trimText = (text: string) => text.replace(/\s/g, "").toString().trim();


export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function splitTextNumber(word: any) {
  return word.replace(/([^\d\s]+)(\d+)/, '$1 $2');
}

export function removeSpacesBetween(word: any): string {
  return word.split(" ").join("");
}

export function addSpaceBetweenTextAndNumber(word: any) {
  // Split the text at the number (assuming no other numbers are present)
  const splitText = word.split(/\d+/);
  // Check if there's already a space
  if (splitText.length !== 2) {
    return false;
  }
  // Return the combined text with a space
  return splitText[0] + ' ' + splitText[1];
}


export function getMaximumDatePlusOneDay(dates: any) {
  // Find the maximum date
  const maxDate = new Date(Math.max(...dates.map((date: any) => date.getTime())));
  // Add one day to the maximum date
  maxDate.setDate(maxDate.getDate() + 1);
  // Return the date plus one day in "YYYY-MM-DD" format
  const year = maxDate.getFullYear();
  const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
  const day = maxDate.getDate().toString().padStart(2, '0');
  const nextDay = `${year}-${month}-${day}`;
  return cy.wrap(nextDay);
}

function getMaximumDatePlusOneYear(dates: any) {
  // Find the maximum date
  const maxDate = new Date(Math.max(...dates.map((date: any) => date.getTime())));
  // Add one year to the maximum date
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  // Return the date plus one year in "YYYY-MM-DD" format
  const year = maxDate.getFullYear();
  const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
  const day = maxDate.getDate().toString().padStart(2, '0');
  const nextYearDate = `${year}-${month}-${day}`;
  return cy.wrap(nextYearDate);
}
export function getNextYearPlusOne(dateString: any): string {
  // Parse the input date string to a Date object
  const date = new Date(dateString);
  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
  }
  // Add one year to the date
  date.setFullYear(date.getFullYear() + 1);
  // Format the date to "YYYY-MM-DD"
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export function pushToIndex(strList: string[], value: string, index: number): string[] {
  if (index < 0 || index > strList.length) {
    throw new Error("Invalid index: Index must be within the array bounds.");
  }
  const result = [...strList]; // Create a copy of the original array
  result.splice(index, 0, value); // Insert the value at the specified index
  return result;
}
export const parseDate = (dateStr: string, format: string): Date => {
  var date2 = new Date();
  let day: number, month: number, year: number;
  if (format === 'dd/mm/yyyy') {
    [day, month, year] = dateStr.split('/').map(Number);
    date2 = new Date((year + 1), month - 1, day);
  } else if (format === 'yyyy-mm-dd') {
    [year, month, day] = dateStr.split('-').map(Number);
    year = year + 1;
    date2 = new Date(year, month - 1, day);
  } else {
    console.log('Invalid date format. Please use "dd/mm/yyyy" or "yyyy-mm-dd".');
  }
  return date2;
};
export const isAscendingOrder = (dates: Date[]): boolean => {
  for (let i = 0; i < dates.length - 1; i++) {
    if (dates[i].getTime() > dates[i + 1].getTime()) {
      return false;
    }
  }
  return true;
};

