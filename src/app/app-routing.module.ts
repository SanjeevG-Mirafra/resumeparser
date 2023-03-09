import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadNewResumeComponent } from './upload-new-resume/upload-new-resume.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'upload_new_resume', component: UploadNewResumeComponent },
      { path: '**', redirectTo: 'upload_new_resume' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
