import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BranchSchema } from '../shared/interface/branch.interface';
import { Card } from '../card/card';
import { EmployeeCard } from '../employee-card/employee-card';
import { branchService } from '../branch';

@Component({
  selector: 'app-spoc',
  standalone: true,
  imports: [FormsModule, Card, EmployeeCard],
  templateUrl: './spoc.html',
  styleUrl: './spoc.css',
})

export class Spoc implements OnInit {

  private branchService = inject(branchService);

  branches = signal<BranchSchema[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(12);
  selectedBranch = signal<BranchSchema | null>(null);
  showSuggestions = signal(false);



  filteredBranches = computed(() => {
    const term = this.searchText().toLowerCase().trim();
    if (!term) return this.branches();
    
    return this.branches().filter(branch =>
      branch.branchName.toLowerCase().includes(term) ||
      branch.branchId.toLowerCase().includes(term)
    );
  });

  paginatedBranches = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.filteredBranches().slice(startIndex, startIndex + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredBranches().length / this.pageSize()) || 0;
  });

  suggestions = computed(() => {
    const term = this.searchText().toLowerCase().trim();
    if (!term || term.length < 1) return [];
  
    return this.branches()
      .filter(branch =>
        branch.branchName.toLowerCase().includes(term) ||
        branch.branchId.toLowerCase().includes(term)
      )
      .slice(0, 8); 
  });

  selectSuggestion(branch: BranchSchema) {
    this.searchText.set(branch.branchName);
    this.currentPage.set(1);
    this.showSuggestions.set(false);
  }

  onBlur() {
    setTimeout(() => this.showSuggestions.set(false), 150);
  }

  ngOnInit() {
    this.branchService.getBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
      },
      error: err => console.error(err)
    });4200
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  goToPrev() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  goToNext() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  openEmployeeDetails(branch: BranchSchema) {
    this.branchService.getEmployeesByBranch(branch.branchId).subscribe(employees => {
      this.selectedBranch.set({
        ...branch,
        employees
      });
    });
  }

  closeEmployeeDetails() {
    this.selectedBranch.set(null);
  }
}

