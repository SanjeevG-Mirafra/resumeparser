import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Hyperlinks } from '../interfaces/upload-new-resume';

@Component({
  selector: 'app-upload-new-resume',
  templateUrl: './upload-new-resume.component.html',
  styleUrls: ['./upload-new-resume.component.css']
})
export class UploadNewResumeComponent  {

  resumeUploadForm: FormGroup;
  formData = new FormData;
  selectedFile: any;
  resumeUploaded = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.resumeUploadForm = new FormGroup({
      resume_upload : new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9,+-]+$')]),
      skype_id: new FormControl(),
      expected_ctc: new FormControl('', [Validators.required]),
      current_ctc: new FormControl('', [Validators.required]),
      notice_period: new FormControl('', [Validators.required]),
      experience_years: new FormControl(),
      github: new FormControl(),
      linkedin: new FormControl(),
      preferred_location: new FormControl(),
      current_location: new FormControl(),
      experience_months: new FormControl(),
      current_company: new FormControl('', [Validators.required]),
      skills: new FormControl('',[Validators.required]),
      social_media: new FormControl(),
      location: new FormControl(),
      qualification: new FormControl(),
      ta_owner: new FormControl(''),
      resume_summary: new FormControl(),
      requirement_name: new FormControl(),
      referral_of_resume: new FormControl('',[Validators.required]),
      referred_by: new FormControl('')
    });
    this.referralValidatorUpdator();
  }

  upload(event){
    //If we upload pdf file then.....
    const formData = new FormData();
    formData.append('resume', event.files[0]);
    this.resumeUploaded = true;
    // this.http.post("http://192.168.1.29:5001/parse_resume", formData)
    this.http.post("http://106.51.77.156:5001/parse_resume", formData)
      .subscribe((data: any)=>{
      const fetchedData = {
        ...data,
        skills : Object.keys(data['skills']),
        ...this.hyperLinkMapper(data?.hyperlinks)
      }
      this.resumeUploaded = false;
      // console.log(fetchedData, this.hyperLinkMapper(data?.hyperlinks));
      this.resumeUploadForm.patchValue(fetchedData);
      console.log();
    })
  }

  hyperLinkMapper(hyperlinks : Hyperlinks){
    let hyperLinkedObj = {};
    Object.entries(hyperlinks).forEach((hyperlink : any) => {
      if(hyperlink[0] === 'email' && hyperlink[1].length > 0 || hyperlink[0] !== 'email') {
        hyperLinkedObj[hyperlink[0]] = hyperlink[1];
      }
    })
    return hyperLinkedObj;
  }

  referralValidatorUpdator(){
    this.resumeUploadForm.controls["referral_of_resume"].valueChanges.subscribe((value)=>{
        this.resumeUploadForm.controls["referred_by"].setValidators(value === 'direct' ? [] : [Validators.required]);
        this.resumeUploadForm.controls["referred_by"].updateValueAndValidity({emitEvent: false});
    });
  }

  submitResume(formRef) {
    console.log(this.resumeUploadForm.value);
    // const upload = this.http
    //   .post('http://192.168.0.207:5001/', this.formData, {
    //     reportProgress: true,
    //     observe: 'events',
    //   })
    // if (this.selectedFile) {
    //   this.fileUploadService.upload(this.selectedFile).subscribe((event: any) => {
    //     alert('File uploaded successfully!');
    //   });
    // }
  }
}


