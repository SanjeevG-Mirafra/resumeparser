import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scanning-pdf',
  templateUrl: './scanning-pdf.component.html',
  styleUrls: ['./scanning-pdf.component.css']
})
export class ScanningPdfComponent {
  @Input() pdfSrc: string = '';
  @Input() uploadStatus: boolean = false;
  
  displayBlock = true;
 
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.stopDisplayBlock(); 
    }, 15000);
   
  }

  stopDisplayBlock() {
    this.displayBlock = false;
  }
  
}


// @Component({
//   selector: 'app-scanning-pdf',
//   templateUrl: './scanning-pdf.component.html',
//   styleUrls: ['./scanning-pdf.component.css']
// })
// export class ScanningPdfComponent {

//   @Input() pdfSrc: string = '';
//   @Input() uploadStatus: boolean = false;
//   @Input() errorMessage: string = '';
  


//   constructor() {}

//   ngOnInit() {
    
//   }
//   }

  

