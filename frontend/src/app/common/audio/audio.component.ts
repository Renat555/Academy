import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.less'],
})
export class AudioComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  isAudioOn = true;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  toggleSound() {
    this.toggle.emit();
  }
}
