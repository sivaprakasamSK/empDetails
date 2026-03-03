export interface EmployeeSchema {
    employeeId: string,
    name: string,
    roles: string[],
    email: string
}

export interface BranchSchema {
    branchId: string,
    branchName: string,
    employees?: EmployeeSchema[];
}
export interface BranchDetailsSchema {
    branches: BranchSchema[]
}