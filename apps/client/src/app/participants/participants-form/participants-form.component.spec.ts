import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantsFormComponent } from './participants-form.component';

describe('ParticipantsFormComponent', () => {
  let component: ParticipantsFormComponent;
  let fixture: ComponentFixture<ParticipantsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
