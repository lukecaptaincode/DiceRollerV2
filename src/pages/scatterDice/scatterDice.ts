import {
  Component
} from '@angular/core';
import {
  Storage
} from '@ionic/storage';
import {
  Random
} from '../home/home';
@Component({
  selector: 'page-scatterDice',
  templateUrl: 'scatterDice.html'
})
export class ScatterDicePage {
  d: any;
  n: any;
  random: any;
  deg: any;
  degDec: any;

  scatter() {
    var scatterDice = document.getElementById("scatterDice");
    this.d = new Date();//declare new date for random seeding
    this.n = this.d.getMilliseconds();//get the date seed to milliseconds
    this.random = new Random(this.n);//declare new random seeding with current date time to milliseconds
    if(this.random.nextInt32([-360,360])%60 ==0){
      scatterDice.innerHTML = '<h1 class="scatter">X</h1>';
      return;
    }
    this.deg = this.random.nextInt32([-360,360]);//random to result to ensure dice and temp have same values
    this.degDec = this.random.nextInt32();
    scatterDice.innerHTML = '<h1 class="scatter">&uarr;</h1>';
    scatterDice.style.webkitTransform = 'rotate(' + this.deg+"."+this.degDec+ 'deg)';
    scatterDice.style.transform = 'rotate(' + this.deg+"."+this.degDec+ 'deg)';
    
  }
}
