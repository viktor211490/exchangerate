import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Unit} from 'src/models/unit';
import {UnitService} from 'src/services/unit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any> | undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any> | undefined;

  edited: Unit | null = null;
  units: Array<Unit> = [];
  statusMessage: string = "";
  isLoaded: boolean = true;


  constructor(
    private unitService: UnitService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoaded = true;
    forkJoin({
      units: this.unitService.getAll(),
    }).subscribe(value => {
      console.log(value.units);
      this.units = value.units;
      console.log(this.units);
      this.isLoaded = false;
    })
  }

  edit(unit: Unit) {
    if (this.edited && this.edited.id === unit.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate
    }
  }

  loadTemplate(unit: Unit) {
    if (this.edited && this.edited.id === unit.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  save() {

    this.unitService.update(this.edited as Unit)
      .subscribe(data => {
        this.statusMessage = "Данные успешно обновлены"
        this.getAll();
      });
    this.edited = null;
  }


  cancel() {
    this.edited = null;
  }

  delete(unit: Unit) {
    this.unitService.delete(unit.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены'
      this.getAll();
    });
  }

}
