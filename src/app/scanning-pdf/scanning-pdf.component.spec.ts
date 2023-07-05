import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanningPdfComponent } from './scanning-pdf.component';

describe('ScanningPdfComponent', () => {
  let component: ScanningPdfComponent;
  let fixture: ComponentFixture<ScanningPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanningPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanningPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
