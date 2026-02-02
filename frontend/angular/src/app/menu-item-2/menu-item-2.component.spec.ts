import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItem2Component } from './menu-item-2.component';

describe('MenuItem2Component', () => {
  let component: MenuItem2Component;
  let fixture: ComponentFixture<MenuItem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItem2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
