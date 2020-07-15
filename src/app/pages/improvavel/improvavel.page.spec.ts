import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImprovavelPage } from './improvavel.page';

describe('ImprovavelPage', () => {
  let component: ImprovavelPage;
  let fixture: ComponentFixture<ImprovavelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovavelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImprovavelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
