import {
    Component
  } from '@angular/core';
  import { Storage } from '@ionic/storage';
  @Component({
    selector: 'page-woundCounter',
    templateUrl: 'woundCounter.html'
  })
  export class WoundCounterPage {
    Characters : any = [{}];
    characterName_input;
    woundAmount_input;

    constructor(private storage: Storage){
      this.Characters.lenght = 0;
      storage.get('character').then((val)=>{
        var parse = JSON.parse(val);
        var c = [];
        var w = [];
        if(parse != null){
          parse.forEach(function(el){
            if(el.wound != null || el.wound != "" || el.wound != " " || el.character != null 
            || el.character != "" || el.character != " "){
              w.push(el.wound);
              c.push(el.character);
            }
          });
          for(var i =0;i<c.length;i++){
            this.Characters.push({character: c[i], wound: w[i]});
          }
       }
      });
    }
    wound(i) {
      this.Characters[i].wound = this.Characters[i].wound - 1; 
    }
    delete(i){
      this.Characters.splice(i,1);
      this.store();
    }
    store(){
      this.storage.set('character', JSON.stringify(this.Characters));
    }
    add(){
      this.Characters.push({character:this.characterName_input,wound:this.woundAmount_input});
      this.store();
    }
    clear(){
      this.storage.clear();
    }
  }