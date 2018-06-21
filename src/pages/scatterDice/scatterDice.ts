import {
  Component
} from '@angular/core';
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
    var scatterDiceContainer = document.getElementById("scatterDiceContainer");
    var scatter = document.getElementById("scatter");
    this.d = new Date();//declare new date for random seeding
    this.n = this.d.getMilliseconds();//get the date seed to milliseconds
    this.random = new Random(this.n);//declare new random seeding with current date time to milliseconds
    if(this.random.nextInt32([0,360])%60 == 0||this.random.nextInt32([0,360])%30 == 0){
      scatter.innerHTML = 'X';
      scatterDiceContainer.style.webkitTransform = 'rotate(0deg)';
      scatterDiceContainer.style.transform = 'rotate(0deg)';
      scatter.classList.add('hit');
      return;
    }
    scatter.classList.remove('hit');
    this.deg = this.random.nextInt32([0,360]);//random to result to ensure dice and temp have same values
    this.degDec = this.random.nextInt32();
    scatter.innerHTML = '&uarr;';
    scatterDiceContainer.style.webkitTransform = 'rotate(' + this.deg+"."+this.degDec+ 'deg)';
    scatterDiceContainer.style.transform = 'rotate(' + this.deg+"."+this.degDec+ 'deg)';
    scatterDiceContainer.style.transformOrigin = '50% 50%';
    scatterDiceContainer.style.webkitTransformOrigin = '50% 50%';
  }
}
