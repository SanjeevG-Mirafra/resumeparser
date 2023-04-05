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
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9,+-]+$')]),
      skype_id: new FormControl(),
      expected_ctc: new FormControl(),
      current_ctc: new FormControl(),
      notice_period: new FormControl(),
      experience_years: new FormControl(),
      github: new FormControl(),
      linkedin: new FormControl(),
      preferred_location: new FormControl(),
      current_location: new FormControl(),
      experience_months: new FormControl(),
      current_company: new FormControl(),
      skills: new FormControl('',[Validators.required]),
      social_media: new FormControl(),
      location: new FormControl(),
      prefered_location: new FormControl(),
      qualification: new FormControl(),
      ta_owner: new FormControl(''),
      resume_summary: new FormControl(),
      resume_path: new FormControl('',[Validators.required]),
      requirement_name: new FormControl(),
      referral_of_resume: new FormControl('',[Validators.required]),
      referred_by: new FormControl('',[Validators.required])
    });
  }

  onChange(event){
    //If we upload pdf file then.....
    const formData = new FormData();
    formData.append('resume', event.target.files[0]);
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
      console.log(fetchedData);
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


