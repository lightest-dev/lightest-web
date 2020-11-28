import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-uploads-preview',
  templateUrl: './uploads-preview.component.html',
  styleUrls: ['./uploads-preview.component.scss']
})
export class UploadsPreviewComponent implements OnInit {
  public step: number = -1;
  @Input() task;
  @Input() uploads;
  constructor() { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getMaxPoints() {
    const maxPoint: number = Math.max(...this.uploads.map(u => u.points));
    return  maxPoint >=0 ? maxPoint : 0;
  }

  isCompleted() {
    return this.getMaxPoints() > 0;
  }
  //
  // getEditorOptions(upload) {
  //   return {
  //     language: upload.length, theme: 'vs-dark', readOnly: true
  //   }
  // }
}
