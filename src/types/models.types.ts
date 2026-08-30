import { User, Role } from './auth.types';

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Ensure Role from auth.types matches this structure, or extend it.
export interface RoleDetails extends Role {
  description?: string;
  isSystem: boolean;
  createdAt: string;
}

export interface UserDetails extends User {
  phone?: string;
  jobTitle?: string;
  startDate?: string;
  departmentId?: string;
  department?: Department;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface CreateUserDto {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  departmentId?: string;
  jobTitle?: string;
  startDate?: string;
  roleIds?: string[];
  isActive?: boolean;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
