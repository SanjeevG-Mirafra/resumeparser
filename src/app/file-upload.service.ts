import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  Api = 'http://192.168.0.207:5001/parse_resume';
  user: any;

  constructor(private http: HttpClient) { }

  upload(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.get(this.Api);
  }
}
