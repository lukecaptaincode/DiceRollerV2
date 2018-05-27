import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  diceAmount_input = 0;
  sideAmount_input = 0;
  dice = [];
  sort_input = 0;
  temp = [];
  result_filter = "";
  result= 0;
  sortResults_label="";
  constructor(public navCtrl: NavController) {}
  roll() {
    this.dice = [], this.temp = [];//Roll result arrays dice is the main array and temp holds the backup for resetting
    var d = new Date();//declare new date for random seeding
    var n = d.getMilliseconds();//get the date seed to milliseconds
    var random = new Random(n);//declare new random seeding with current date time to milliseconds
    for (var i = 0; i < this.diceAmount_input; i++) {
      this.result = random.nextInt32([1,this.sideAmount_input]);//random to result to ensure dice and temp have same values
      this.dice.push(this.result);//push into dice
      this.temp.push(this.result);//push into temp
    }
  }
  clear() {
    this.sortResults_label = "";
    this.dice = [];//reset array
  }
  reset() {
    this.sortResults_label = "";
    this.dice = [];//reset array
    for (var i = 0; i < this.temp.length; i++) { // Loops the temp array into the dice array
      this.dice.push(this.temp[i]);
    }
  }
  sort() {
    this.reset();//reset the array before sorting
    for (var i = 0; i < this.dice.length; i++) {
      if (!eval(this.dice[i] + this.result_filter + this.sort_input)) {//uses eval to to get the value of the sorting choice as a logical operator
        this.dice.splice(i, 1);//remove value that doesn't equal the sort input from the array
        i--;//decrease loop increment by one to compensate the removal
      }
    }
    this.sortResults_label = "Sort results: "+this.dice.length.toString();

  }
  
}
/*BACKUP
 //var rng = new RNG(n);
    // this.result = rng.nextRange(1, this.sideAmount_input)
function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}
RNG.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}
*/
/**
 * copied almost directly from Mersenne Twister implementation found in https://gist.github.com/banksean/300494
 * all rights reserved to him.
 */
/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
export class Random {
  static N = 624;
  static M = 397;
  static MATRIX_A = 0x9908b0df;
  /* constant vector a */
  static UPPER_MASK = 0x80000000;
  /* most significant w-r bits */
  static LOWER_MASK = 0x7fffffff;
  /* least significant r bits */

  mt = new Array(Random.N);
  /* the array for the state vector */
  mti = Random.N + 1;
  /* mti==N+1 means mt[N] is not initialized */

  constructor(seed:number = null) {
      if (seed == null) {
          seed = new Date().getTime();
      }

      this.init_genrand(seed);
  }

  private init_genrand(s:number) {
      this.mt[0] = s >>> 0;
      for (this.mti = 1; this.mti < Random.N; this.mti++) {
          var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
          this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
              + this.mti;
          /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
          /* In the previous versions, MSBs of the seed affect   */
          /* only MSBs of the array mt[].                        */
          /* 2002/01/09 modified by Makoto Matsumoto             */
          this.mt[this.mti] >>>= 0;
          /* for >32 bit machines */
      }
  }

  /**
   * generates a random number on [0,0xffffffff]-interval
   * @private
   */
  private _nextInt32():number {
      var y:number;
      var mag01 = new Array(0x0, Random.MATRIX_A);
      /* mag01[x] = x * MATRIX_A  for x=0,1 */

      if (this.mti >= Random.N) { /* generate N words at one time */
          var kk:number;

          if (this.mti == Random.N + 1)   /* if init_genrand() has not been called, */
              this.init_genrand(5489);
          /* a default initial seed is used */

          for (kk = 0; kk < Random.N - Random.M; kk++) {
              y = (this.mt[kk] & Random.UPPER_MASK) | (this.mt[kk + 1] & Random.LOWER_MASK);
              this.mt[kk] = this.mt[kk + Random.M] ^ (y >>> 1) ^ mag01[y & 0x1];
          }
          for (; kk < Random.N - 1; kk++) {
              y = (this.mt[kk] & Random.UPPER_MASK) | (this.mt[kk + 1] & Random.LOWER_MASK);
              this.mt[kk] = this.mt[kk + (Random.M - Random.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
          }
          y = (this.mt[Random.N - 1] & Random.UPPER_MASK) | (this.mt[0] & Random.LOWER_MASK);
          this.mt[Random.N - 1] = this.mt[Random.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

          this.mti = 0;
      }

      y = this.mt[this.mti++];

      /* Tempering */
      y ^= (y >>> 11);
      y ^= (y << 7) & 0x9d2c5680;
      y ^= (y << 15) & 0xefc60000;
      y ^= (y >>> 18);

      return y >>> 0;
  }

  /**
   * generates an int32 pseudo random number
   * @param range: an optional [from, to] range, if not specified the result will be in range [0,0xffffffff]
   * @return {number}
   */
  nextInt32(range:[number, number] = null):number {
      var result = this._nextInt32();
      if (range == null) {
          return result;
      }

      return (result % (range[1] - range[0])) + range[0];
  }

  /**
   * generates a random number on [0,0x7fffffff]-interval
   */
  nextInt31():number {
      return (this._nextInt32() >>> 1);
  }

  /**
   * generates a random number on [0,1]-real-interval
   */
  nextNumber():number {
      return this._nextInt32() * (1.0 / 4294967295.0);
  }

  /**
   * generates a random number on [0,1) with 53-bit resolution
   */
  nextNumber53():number {
      var a = this._nextInt32() >>> 5, b = this._nextInt32() >>> 6;
      return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
}
