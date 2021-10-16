import {Component, Inject, OnInit} from '@angular/core';
import {Unit} from "../../../../../models/unit";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnitService} from "../../../../../services/unit.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  unit: Unit;
  isLoaded: boolean = true

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public unitService: UnitService,
    @Inject(MAT_DIALOG_DATA) public data: Unit,
  ) {
  }

  ngOnInit(): void {
    this.unit = this.data;
    this.isLoaded = false;
  }
  save(){
    this.unitService.update(this.unit).subscribe(value => {
      this.dialogRef.close(this.unit);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
