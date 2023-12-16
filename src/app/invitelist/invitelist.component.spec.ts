import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitelistComponent } from './invitelist.component';

describe('Invitelist', () => {
  let component: InvitelistComponent;
  let fixture: ComponentFixture<InvitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
