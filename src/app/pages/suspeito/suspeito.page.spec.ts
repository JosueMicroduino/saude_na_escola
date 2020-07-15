import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuspeitoPage } from './suspeito.page';

describe('SuspeitoPage', () => {
  let component: SuspeitoPage;
  let fixture: ComponentFixture<SuspeitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspeitoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuspeitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
