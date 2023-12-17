import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDataComponent } from './invite-data.component';

describe('InviteDataComponent', () => {
  let component: InviteDataComponent;
  let fixture: ComponentFixture<InviteDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
