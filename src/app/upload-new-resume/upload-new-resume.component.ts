import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Hyperlinks } from '../interfaces/upload-new-resume';
import { throwError } from 'rxjs';
import { UploadService } from '../file-upload.service';

@Component({
  selector: 'app-upload-new-resume',
  templateUrl: './upload-new-resume.component.html',
  styleUrls: ['./upload-new-resume.component.css']
})
export class UploadNewResumeComponent  {

  pdfSrc: string = '';

  uploadStatus : boolean = false;

  pageVariable: any = 1;

  resumeUploadForm: FormGroup;
  formData = new FormData;
  selectedFile: any;
  resumeUploaded = false;

  url:any="";
  errorMessage: string;
  UploadService: any;
  parseResume: any;
  

  constructor(private http: HttpClient, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.resumeUploadForm = new FormGroup({
      resume_upload : new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9,+-]+$')]),
      expected_ctc: new FormControl('', [Validators.required]),
      current_ctc: new FormControl('', [Validators.required]),
      notice_period: new FormControl('', [Validators.required]),
      experience_years: new FormControl('', [Validators.required]),
      experience_months: new FormControl('', [Validators.required]),
      github: new FormControl(),
      linkedin: new FormControl(),
      preferred_location: new FormControl(),
      current_location: new FormControl(),
      skype_id: new FormControl(),
      current_company: new FormControl('', [Validators.required]),
      skills: new FormControl('',[Validators.required]),
      social_media: new FormControl(),
      location: new FormControl(),
      qualification: new FormControl('', [Validators.required]),
      ta_owner: new FormControl(''),
      resume_summary: new FormControl(),
      requirement_name: new FormControl('', [Validators.required]),
      referral_of_resume: new FormControl('',[Validators.required]),
      referred_by: new FormControl('')
    });
    this.referralValidatorUpdator();
  }

  async upload(event){
    //If we upload pdf file then.....
    const formData = new FormData();
    formData.append('resume', event.files[0]);
  if (typeof (FileReader) !== 'undefined') {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    reader.readAsArrayBuffer(event.files[0]);
  }
    this.resumeUploaded = true;
    // this.http.post("http://192.168.1.29:5001/parse_resume", formData)
    this.uploadStatus = true;

    setTimeout(() => {
      this.uploadService.parseResume(formData).subscribe(
        (data: any) => {
          console.log(data);
          this.uploadStatus = false;
          const fetchedData = {
            ...data,
            skills: Object.keys(data['skills']),
            ...this.hyperLinkMapper(data?.hyperlinks)
          }
          this.resumeUploaded = false;
          this.resumeUploadForm.patchValue(fetchedData);
        },
        (error: any) => {
          console.error(error);
          this.handleError(error);
        }
      );
    }, 2000);
    

    // setTimeout(() => {
    //   // this.http.post("http://106.51.77.156:5001/parse_resume", formData)
    //       this.http.post("http://192.168.1.29:5001/parse_resume", formData)

    //     .subscribe((data: any) => {
    //       console.log(data);
    //       this.uploadStatus = false;
    //       const fetchedData = {
    //         ...data,
    //         skills: Object.keys(data['skills']),
    //         ...this.hyperLinkMapper(data?.hyperlinks)
    //       }
    //       this.resumeUploaded = false;
    //       // console.log(fetchedData, this.hyperLinkMapper(data?.hyperlinks));
    //       this.resumeUploadForm.patchValue(fetchedData);
    //     }, (error: any) => {
    //       console.error(error);
    //       this.handleError(error);
    //     });
    // },2000); // Delay of 7 seconds for displaying the scanning of the resume
  }

  /**
   * Converts FileList into base64 files
   *
   * @param file FileList object contains files details
   * @returns {Promise<processedFile[]>} base64 converted files
   */
  private toBase64(file: FileList): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const processedFile: any[] = [];
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file.item(i)!);
        reader.onload = () => {
          processedFile.push({
            name: file.item(i)!.name,
            result: reader.result as string,
          });
          if (file.length === processedFile.length) {
            resolve(processedFile);
          }
        };
        reader.onerror = (error) => reject(error);
      }
    });
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

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.errorMessage = 'A client-side or network error occurred. Please try again.';
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      this.errorMessage = `Server is not responding,Please try again later.`;
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFile = inputElement.files.item(0);
  }
}






