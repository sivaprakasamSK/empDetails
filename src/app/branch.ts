import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BranchSchema, EmployeeSchema } from './shared/interface/branch.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class branchService {
  private http = inject(HttpClient);

  getBranches() {
    return this.http.get<{ branches: BranchSchema[] }>('/branch.json').pipe(
      map(res => res.branches ?? [])
    )
  }

  getEmployeesByBranch(branchId: string) {
    return this.http
      .get<{ employeesByBranch: Record<string, EmployeeSchema[]> }>(
        '/employee.json'
      )
      .pipe(
        map(res => res.employeesByBranch[branchId] ?? [])
      );
  }
}
