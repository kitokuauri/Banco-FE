import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {

  constructor(
    public dialogref: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any
  ){}

  onNoClick(): void{
    this.dialogref.close(false);
  }

  onYesClick(): void{
    this.dialogref.close(true);
  }

}
