class Food {
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("images/milk.png");
        var GARDEN;
    }
   getFoodStock(){
       return this.foodStock;
   } 
   updateFoodStock(foodStock){
       this.foodStock = foodStock;
   } 
   deductFood(){
       if(this.foodStock>0){
           this.foodStock = this.foodStock - 1;
       }
   }
   getFedTime(lastFed){
        this.lastFed = lastFed;
   }
    
    
    display(){
        var x = 70;
        var y = 100;

        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10==0){
                    x = 70;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

    bedroom(){
        var BEDROOM;
        BEDROOM = createSprite(200,250,400,500)
        BEDROOM.addImage(bedroomImg);
    }
      
    garden(){
        var GARDEN;
        GARDEN = createSprite(200,250,400,500)
        GARDEN.addImage(gardenImg);
    }


    washroom(){
        var WASHROOM;
        WASHROOM = createSprite(200,250,400,500)
        WASHROOM.addImage(washroomImg);
    }
}