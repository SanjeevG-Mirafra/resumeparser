import { ElementRef } from '@angular/core';
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


  constructor(private fileUploadService: FileUploadService, private elementRef: ElementRef) { }

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

  onChange(event){
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(event.target.files[0]);
  }

  onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    this.elementRef.nativeElement.querySelector('.name').value = obj?.name;
    this.elementRef.nativeElement.querySelector('.email').value = obj?.email;
    this.elementRef.nativeElement.querySelector('.phone').value = obj?.phone;
    this.elementRef.nativeElement.querySelector('.skype_id').value = obj?.skype_id;
    this.elementRef.nativeElement.querySelector('.current_ctc').value = obj?.current_ctc;
    this.elementRef.nativeElement.querySelector('.linkedin_id').value = obj?.linkedin_id;
    this.elementRef.nativeElement.querySelector('.expected_ctc').value = obj?.expected_ctc;
    this.elementRef.nativeElement.querySelector('.github_id').value = obj.github_id;
    this.elementRef.nativeElement.querySelector('.current_company').value = obj?.current_company;
    this.elementRef.nativeElement.querySelector('.location').value = obj?.location;
    this.elementRef.nativeElement.querySelector('.skills').value = obj?.skills;
    this.elementRef.nativeElement.querySelector('.prefered_location').value = obj?.prefered_location;
    this.elementRef.nativeElement.querySelector('.notice_period').value = obj?.notice_period;
    this.elementRef.nativeElement.querySelector('.resume_path').value = obj?.resume_path;
}
}
