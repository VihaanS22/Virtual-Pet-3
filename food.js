class Foods{

constructor(){
  this.foodStock = 0
  this.lastFed;  
  this.image = loadImage("images/food.png")

}

updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
   deductFood(){
    if(this.foodStock>0){
     this.foodStock=this.foodStock-1;
    }
   }
   getFoodStock(){
    return this.foodStock;
  }
  getFedTime(lastFed)
  {
      this.lastFed = lastFed;
  }

bedroom(){
  //background(homeImg, 550, 500)
var home = createSprite(20, 350, 50, 50)
home.addImage("home", homeImg)
dog.x = 230
dog.y = 450

}

bathroom(){
  //background(bathImg, 10, 600)
 
 var bath = createSprite(250, 250, 100, 100)
 bath.addImage("bathroom", bathImg)
 bath.scale = 1.2
 
}

  display(){
    
    imageMode(CENTER);
 
    
   
    image(this.image,210, 440, 100, 80);

    
   
  }
    }
  