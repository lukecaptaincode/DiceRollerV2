import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WoundCounterPage } from '../pages/woundCounter/woundCounter';
import { ScatterDicePage } from '../pages/scatterDice/scatterDice';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [MyApp, HomePage, WoundCounterPage, ScatterDicePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp),IonicStorageModule.forRoot({
    name: '__diceroller40kdb',
       driverOrder: ['indexeddb', 'sqlite', 'websql']
  })],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, WoundCounterPage, ScatterDicePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
