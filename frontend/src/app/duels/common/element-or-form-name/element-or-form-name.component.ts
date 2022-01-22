import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addElement,
  addForm,
  deleteElement,
  deleteForm,
} from 'src/app/store/actions/duels/currentSpell.actions';
import {
  selectElement,
  selectForm,
} from 'src/app/store/selectors/duels/currentSpell.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-element-or-form-name',
  templateUrl: './element-or-form-name.component.html',
  styleUrls: ['./element-or-form-name.component.less'],
})
export class ElementOrFormNameComponent implements DoCheck {
  constructor(private store: Store<AppState>) {}

  ngDoCheck(): void {
    let form = '';
    let element = '';

    this.store.select(selectForm).subscribe((state) => {
      form = state;
    });

    this.store.select(selectElement).subscribe((state) => {
      element = state;
    });

    if (form === this.name || element === this.name) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  @Input() name?: string;
  @Input() russianName?: string;
  @Input() type?: string;

  isSelected = false;

  select() {
    if (this.type === 'form') {
      this.store.dispatch(deleteForm());

      if (this.name) {
        this.store.dispatch(addForm({ form: this.name }));
        this.isSelected = true;
      }
    } else if (this.type === 'element') {
      this.store.dispatch(deleteElement());

      if (this.name) {
        this.store.dispatch(addElement({ element: this.name }));
        this.isSelected = true;
      }
    }
    this.showData();
  }

  showData() {
    this.store.select(selectForm).subscribe((state) => {});
    this.store.select(selectElement).subscribe((state) => {});
  }
}
