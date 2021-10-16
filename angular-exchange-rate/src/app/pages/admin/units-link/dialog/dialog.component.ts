import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnitService} from "../../../../../services/unit.service";
import {Unit} from "../../../../../models/unit";
import {UnitToUnit, UnitToUnitId} from "../../../../../models/unit-to-unit";
import {UnitToUnitService} from "../../../../../services/unit-to-unit.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class LinkDialogComponent implements OnInit {
  unitToUnit: UnitToUnit;
  isLoaded: boolean = true

  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    public unitToUnitService: UnitToUnitService,
    @Inject(MAT_DIALOG_DATA) public data: UnitToUnit,
  ) {
  }

  ngOnInit(): void {
    this.unitToUnit = this.data;
    this.isLoaded = false;
  }

  save() {
    this.unitToUnitService.update(this.unitToUnit).subscribe(value => {
      this.dialogRef.close(this.unitToUnit);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
