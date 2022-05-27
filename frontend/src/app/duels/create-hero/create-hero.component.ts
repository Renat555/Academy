import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  AIEnemy,
  humanEnemy,
} from 'src/app/store/actions/duels/generalInfo.actions';
import {
  addElement,
  addForm,
  addUserName,
  deleteElement,
  deleteForm,
} from 'src/app/store/actions/duels/users.actions';
import {
  selectElements,
  selectForms,
  selectUsers,
} from 'src/app/store/selectors/duels/users.selectors';
import { selectUserName } from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.less'],
})
export class CreateHeroComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<AppState>) {}

  forms: string[] = [];
  elements: string[] = [];

  elementsSubscription = new Subscription();
  formsSubscription = new Subscription();
  userNameSubscription = new Subscription();

  ngOnInit(): void {
    this.elementsSubscription = this.store
      .select(selectElements)
      .subscribe((res) => {
        this.elements = res;

        for (let i = 0; i < res.length; i++) {
          this.selectElement(res[i]);
        }
      });

    this.formsSubscription = this.store.select(selectForms).subscribe((res) => {
      this.forms = res;

      for (let i = 0; i < res.length; i++) {
        this.selectForm(res[i]);
      }
    });

    this.userNameSubscription = this.store
      .select(selectUserName)
      .subscribe((name) => {
        if (name === '') {
          this.isUserAuth = false;
        } else {
          this.userName = name;
          this.isUserAuth = true;
        }
      });
  }

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

  textHint = '';
  isHintShown = false;

  userName = '';

  isUserAuth = false;

  addElement(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let element = (target as HTMLElement).dataset.element;

      if (element) {
        if (this.elements.indexOf(element) === -1) {
          if (this.elements.length > 2) return;

          this.store.dispatch(addElement({ element }));
          this.selectElement(element);
        } else {
          this.store.dispatch(deleteElement({ element }));
          this.cancelSelectElement(element);
        }
      }
    }
  }

  addForm(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let form = (target as HTMLElement).dataset.form;

      if (form) {
        if (this.forms.indexOf(form) === -1) {
          if (this.forms.length > 4) return;

          this.store.dispatch(addForm({ form }));
          this.selectForm(form);
        } else {
          this.store.dispatch(deleteForm({ form }));
          this.cancelSelectForm(form);
        }
      }
    }
  }

  selectElement(element: string) {
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
  }

  cancelSelectElement(element: string) {
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

  selectForm(form: string) {
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
  }

  cancelSelectForm(form: string) {
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

  closeHint() {
    this.isHintShown = false;
  }

  goToHall() {
    this.router.navigate(['']);
  }

  goToHelp() {
    this.router.navigate(['duels/help']);
  }

  createUser() {
    if (this.elements.length < 3) {
      this.textHint = 'Выберите три стихии.';
      this.isHintShown = true;
    } else if (this.forms.length < 5) {
      this.textHint = 'Выберите пять форм';
      this.isHintShown = true;
    } else {
      this.store.dispatch(addUserName({ name: this.userName }));
      this.router.navigate(['duels/wait']);
    }
  }

  createGameWithAI() {
    this.store.dispatch(AIEnemy());
    this.createUser();
  }

  createGameWithHuman() {
    this.store.dispatch(humanEnemy());
    this.createUser();
  }

  ngOnDestroy(): void {
    this.elementsSubscription.unsubscribe();
    this.formsSubscription.unsubscribe();
    this.userNameSubscription.unsubscribe();
  }
}
