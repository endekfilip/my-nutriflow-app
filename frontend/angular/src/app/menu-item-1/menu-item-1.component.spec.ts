import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItem1Component } from './menu-item-1.component';

describe('MenuItem1Component', () => {
  let component: MenuItem1Component;
  let fixture: ComponentFixture<MenuItem1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItem1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
