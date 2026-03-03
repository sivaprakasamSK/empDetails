import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  BranchSchema } from '../shared/interface/branch.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() branch!: BranchSchema;
  @Output() open = new EventEmitter<BranchSchema>();

  openDetails() {
    this.open.emit(this.branch);
  }
}
