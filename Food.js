class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Images/Milk.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      background(40,130,80);
      fill(255,255,254);

      if(lastFed >= 12){
        text("Last Fed :"+ lastFed%12+" PM",50,30);
      }else if(lastFed === 0){
        text("Last Fed : 12AM",50,30);
      }
      else{
        console.log(hour())
        console.log(lastFed)
        text("Last Fed :"+lastFed+" AM",50,30);
      }


      imageMode(CENTER);
      var x=80,y=100;
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }

    bedroom(){
      background(bedroom,500,550);
    }

    garden(){
      background(garden,550,500);
    }

    washroom(){
      background(washroom,550,500);
    }
}
