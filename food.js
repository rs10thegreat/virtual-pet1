class food{
    constructor(){
        this.foodStock = foodStock;
        this.lastFed = lastFed;

        this.image= loadImage("Milk.png");
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,20,20,50,50);

        if(this.foodStock!==0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

    getFoodStock(data){
        foodS = data.val();
    }

    updateFoodStock(stock){
        database.ref('/').update({
            foodS:stock
        });
    }
      
    deductFoodStock(x){
        database.ref("/").set({
        food:x
      });
    }
}