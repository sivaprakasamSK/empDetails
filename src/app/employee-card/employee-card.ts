import { Component,EventEmitter,Input,Output } from '@angular/core';
import { BranchSchema } from '../shared/interface/branch.interface';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css',
})
export class EmployeeCard {

  @Input() branch!: BranchSchema;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
