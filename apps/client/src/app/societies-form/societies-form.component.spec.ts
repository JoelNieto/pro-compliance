import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietiesFormComponent } from './societies-form.component';

describe('SocietiesFormComponent', () => {
  let component: SocietiesFormComponent;
  let fixture: ComponentFixture<SocietiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietiesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocietiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
