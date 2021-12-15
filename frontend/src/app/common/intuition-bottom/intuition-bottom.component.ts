import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-intuition-bottom',
  templateUrl: './intuition-bottom.component.html',
  styleUrls: ['./intuition-bottom.component.less']
})
export class IntuitionBottomComponent implements OnChanges {
  @Input() rightAnswers?: number;
  @Input() wrongAnswers?: number;
  @Input() percentHint?: string;

  constructor() {}

  ngOnChanges(): void {
    if (this.rightAnswers !== undefined && this.wrongAnswers !== undefined) {
      let percentAll = this.rightAnswers + this.wrongAnswers;

      this.percentRightAnswers = (this.rightAnswers * 100) / percentAll;

      this.ratio = this.rightAnswers + '/' + this.wrongAnswers;

      this.percent = this.percentRightAnswers.toFixed(1) + '%';

      if (percentAll === 0) this.percent = '0.0%'
    }
  }

  percentRightAnswers = 0;

  ratio = '0/0';
  percent = '0.0%';

  ratioHint = "правильные/неправильные";

  isRatioHintVisible = false;
  isPercentHintVisible = false;

  showRatioHint() {
    this.isRatioHintVisible = true;
  }

  hideRatioHint() {
    this.isRatioHintVisible = false;
  }

  showPercentHint() {
    this.isPercentHintVisible = true;
  }

  hidePercentHint() {
    this.isPercentHintVisible = false;
  }
}
