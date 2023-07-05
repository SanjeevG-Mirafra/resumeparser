import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scanning-pdf',
  templateUrl: './scanning-pdf.component.html',
  styleUrls: ['./scanning-pdf.component.css']
})
export class ScanningPdfComponent {

  @Input() pdfSrc: string = '';
  @Input() uploadStatus: boolean = false;

  constructor() {}

  ngOnInit() {}

}
