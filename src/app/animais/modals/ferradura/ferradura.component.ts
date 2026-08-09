import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FerraduraData {
  shoe_date?: string | null;
  exchange_months?: number | null;
}

@Component({
  selector: 'app-ferradura',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule],
  templateUrl: './ferradura.component.html',
  styleUrl: './ferradura.component.scss'
})
export class FerraduraComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<FerraduraComponent>);

  maxDate: Date;

  ferradura = new FormGroup({
    shoe_date: new FormControl<Date | null>(null, Validators.required),
    exchange_months: new FormControl<number>(3, [Validators.required, Validators.min(1), Validators.max(24)])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: FerraduraData = {}) { }

  ngOnInit() {
    this.maxDate = new Date();

    if (this.data?.shoe_date) {
      this.ferradura.controls.shoe_date.setValue(new Date(this.data.shoe_date));
    }
    if (this.data?.exchange_months) {
      this.ferradura.controls.exchange_months.setValue(this.data.exchange_months);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
