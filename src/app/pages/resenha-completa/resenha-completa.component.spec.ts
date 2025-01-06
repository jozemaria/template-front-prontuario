import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenhaCompletaComponent } from './resenha-completa.component';

describe('ResenhaCompletaComponent', () => {
  let component: ResenhaCompletaComponent;
  let fixture: ComponentFixture<ResenhaCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenhaCompletaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenhaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
