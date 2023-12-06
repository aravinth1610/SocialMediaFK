export class UserModal {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    intro: string;
    hometown: string;
    currentCity: string;
    eduInstitution: string;
    workplace: string;
    country: string;
    profilePhoto: string;
    coverPhoto: string;
    role: string;
    followerCount: number;
    followingCount: number;
    enabled: boolean;
    accountVerified: boolean;
    emailVerified: boolean;
    birthDate: string;
    joinDate: string;
    dateLastModified: string;


    constructor(id?: string, email?: string, firstName?: string, lastName?: string, gender?: string, intro?: string,
        currentCity?: string, hometown?: string, eduInstitution?: string, workplace?: string, country?: string,
        profilePhoto?: string, coverPhoto?: string, role?: string, followerCount?: number, followingCount?: number,
        enabled?: boolean, accountVerified?: boolean, emailVerified?: boolean, birthDate?: string, joinDate?: string, dateLastModified?: string) { }

}
