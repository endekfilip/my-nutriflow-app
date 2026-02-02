import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieShowComponent } from './calorie-show.component';

describe('CalorieShowComponent', () => {
  let component: CalorieShowComponent;
  let fixture: ComponentFixture<CalorieShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalorieShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalorieShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
