import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadNewResumeComponent } from './upload-new-resume/upload-new-resume.component';
import { UploadService } from './file-upload.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ScanningPdfComponent } from './scanning-pdf/scanning-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadNewResumeComponent,
    ScanningPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
