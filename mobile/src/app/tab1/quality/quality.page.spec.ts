import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityPage } from './quality.page';

describe('QualityPage', () => {
  let component: QualityPage;
  let fixture: ComponentFixture<QualityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
