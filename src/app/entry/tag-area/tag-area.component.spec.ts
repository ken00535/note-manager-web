import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAreaComponent } from './tag-area.component';

describe('TagAreaComponent', () => {
  let component: TagAreaComponent;
  let fixture: ComponentFixture<TagAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
