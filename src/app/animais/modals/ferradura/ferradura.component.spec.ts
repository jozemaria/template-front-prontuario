import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerraduraComponent } from './ferradura.component';

describe('FerraduraComponent', () => {
  let component: FerraduraComponent;
  let fixture: ComponentFixture<FerraduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerraduraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerraduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
