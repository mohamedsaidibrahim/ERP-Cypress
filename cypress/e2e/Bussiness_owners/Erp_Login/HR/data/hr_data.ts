import { getRandomNumber, generateRandomString } from "../../../../../support/utils";

export class HRData {
    static appName = 'hr';
    static attendanceCode= getRandomNumber(9,999).toString();
    static militaryNumber= getRandomNumber(7,777).toString();
    static employeeName = "employee "+generateRandomString(4);
    static birthDate = "1987-02-21"
    static hrUrl = 'https://mohamed.microtecdev.com:2050/hr/masterdata/employee';
    static addEmp1SectionsHeaders = [
        'basic information',
        'birth information',
        'other information',
        'military information',
        'special Care'];
    static addEmp1TextLabels = [
        'employee code',
        'attendance code',
        'employee Name',
        'birth date',
        'age',
        'country of birth',
        'birth city',
        'nationality',
        'gender',
        'marital status',
        'religion',
        'military status',
        'military number',
        'blood type'];
}