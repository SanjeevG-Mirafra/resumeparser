import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-upload-new-resume',
  templateUrl: './upload-new-resume.component.html',
  styleUrls: ['./upload-new-resume.component.css']
})
export class UploadNewResumeComponent {
  resumeUploadForm: FormGroup;
  referral_employee: boolean = false;
  referral_portal: boolean = false;
  referral_agency: boolean = false;
  selectedFile: any;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.resumeUploadForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      skype_id: new FormControl(),
      expected_ctc: new FormControl(),
      current_ctc: new FormControl(),
      notice_period: new FormControl(),
      experience: new FormControl(""),
      current_company: new FormControl(),
      skill: new FormControl(),
      social_media: new FormControl(),
      location: new FormControl(),
      prefered_location: new FormControl(),
      qualification: new FormControl(),
      ta_owner: new FormControl(""),
      resume_summary: new FormControl(),
      resume_path: new FormControl(),
      requirement_name: new FormControl(),
      referral_of_resume: new FormControl(),
      referred_by: new FormControl()
    });
  }

  selectReferral(event) {
    this.referral_employee = false;
    this.referral_portal = false;
    this.referral_agency = false;
    var value = event.target.value
    if (value === 'employee') {
      this.referral_employee = true;
    } else if (value === 'portal') {
      this.referral_portal = true;
    } else if (value === 'agency') {
      this.referral_agency = true;
    }
  }

  uploadResume() {
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe((event: any) => {
        alert('File uploaded successfully!');
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}