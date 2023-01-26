import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  title: string = '';
  description: string = '';
  icon: string = '';
  link: string = '';

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
    // The 'data' keeps the information sent from the calling component
    console.log(this.data);
  }
}
