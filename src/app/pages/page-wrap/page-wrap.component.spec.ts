import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWrapComponent } from './page-wrap.component';

describe('PageWrapComponent', () => {
  let component: PageWrapComponent;
  let fixture: ComponentFixture<PageWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
