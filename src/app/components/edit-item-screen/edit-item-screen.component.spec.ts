import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemScreenComponent } from './edit-item-screen.component';

describe('EditItemScreenComponent', () => {
  let component: EditItemScreenComponent;
  let fixture: ComponentFixture<EditItemScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItemScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
