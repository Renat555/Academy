import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addElement,
  addForm,
  deleteElement,
  deleteForm,
} from 'src/app/store/actions/duels/createHero.actions';
import {
  selectElements,
  selectForms,
} from 'src/app/store/selectors/duels/createHero.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.less'],
})
export class CreateHeroComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  isElementOneSelected = false;
  isElementTwoSelected = false;
  isElementThreeSelected = false;
  isElementFourSelected = false;
  isElementFiveSelected = false;
  isElementSixSelected = false;
  isFormOneSelected = false;
  isFormTwoSelected = false;
  isFormThreeSelected = false;
  isFormFourSelected = false;
  isFormFiveSelected = false;
  isFormSixSelected = false;
  isFormSevenSelected = false;
  isFormEightSelected = false;
  isFormNineSelected = false;

  selectElement(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let element = (target as HTMLElement).dataset.element;

      let elements: string[] = [];

      this.store.select(selectElements).subscribe((res) => {
        elements = res;
      });

      console.log('element: ' + element);
      console.log('elements length: ' + elements.length);

      if (element) {
        if (elements.indexOf(element) === -1) {
          if (elements.length > 2) return;

          this.store.dispatch(addElement({ element }));
          console.log('add');

          if (element == 'fire') {
            this.isElementOneSelected = true;
          } else if (element == 'water') {
            this.isElementTwoSelected = true;
          } else if (element == 'earth') {
            this.isElementThreeSelected = true;
          } else if (element == 'air') {
            this.isElementFourSelected = true;
          } else if (element == 'life') {
            this.isElementFiveSelected = true;
          } else if (element == 'death') {
            this.isElementSixSelected = true;
          }
        } else {
          this.store.dispatch(deleteElement({ element }));
          console.log('delete');

          if (element == 'fire') {
            this.isElementOneSelected = false;
          } else if (element == 'water') {
            this.isElementTwoSelected = false;
          } else if (element == 'earth') {
            this.isElementThreeSelected = false;
          } else if (element == 'air') {
            this.isElementFourSelected = false;
          } else if (element == 'life') {
            this.isElementFiveSelected = false;
          } else if (element == 'death') {
            this.isElementSixSelected = false;
          }
        }
      }
    }
  }

  selectForm(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let form = (target as HTMLElement).dataset.form;

      let forms: string[] = [];

      this.store.select(selectForms).subscribe((res) => {
        forms = res;
      });

      console.log('form: ' + form);
      console.log('forms length: ' + forms.length);

      if (form) {
        if (forms.indexOf(form) === -1) {
          if (forms.length > 4) return;

          this.store.dispatch(addForm({ form }));
          console.log('add');

          if (form == 'spear') {
            this.isFormOneSelected = true;
          } else if (form == 'shield') {
            this.isFormTwoSelected = true;
          } else if (form == 'crown') {
            this.isFormThreeSelected = true;
          } else if (form == 'source') {
            this.isFormFourSelected = true;
          } else if (form == 'sphere') {
            this.isFormFiveSelected = true;
          } else if (form == 'stamp') {
            this.isFormSixSelected = true;
          } else if (form == 'key') {
            this.isFormSevenSelected = true;
          } else if (form == 'flow') {
            this.isFormEightSelected = true;
          } else if (form == 'power') {
            this.isFormNineSelected = true;
          }
        } else {
          this.store.dispatch(deleteForm({ form }));
          console.log('delete');

          if (form == 'spear') {
            this.isFormOneSelected = false;
          } else if (form == 'shield') {
            this.isFormTwoSelected = false;
          } else if (form == 'crown') {
            this.isFormThreeSelected = false;
          } else if (form == 'source') {
            this.isFormFourSelected = false;
          } else if (form == 'sphere') {
            this.isFormFiveSelected = false;
          } else if (form == 'stamp') {
            this.isFormSixSelected = false;
          } else if (form == 'key') {
            this.isFormSevenSelected = false;
          } else if (form == 'flow') {
            this.isFormEightSelected = false;
          } else if (form == 'power') {
            this.isFormNineSelected = false;
          }
        }
      }
    }
  }

  showData() {
    this.store.select(selectElements).subscribe((res) => {
      console.log(res);
    });
    this.store.select(selectForms).subscribe((res) => {
      console.log(res);
    });
  }

  goToHall() {
    this.router.navigate(['']);
  }
}
