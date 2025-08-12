export interface User {
    id?:string;
    userName?:string;
    password?:string;
    email?:string;
    phoneNumber?:string;
}

export interface IdentityUserDto {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null; // ISO string or null
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export const mapIdentityUser = (dto: IdentityUserDto): User => ({
  id: dto.id,
  userName: dto.userName,
  email: dto.email,
  phoneNumber: dto.phoneNumber || undefined,
});