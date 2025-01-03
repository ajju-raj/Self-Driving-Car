class Car{

    constructor(x,y,w,h,ctrl,maxSpeed=3,clr="blue"){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;

        this.speed=0;
        this.acc=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged=false;

        this.useBrain=ctrl=="AI";

        if(ctrl!="DUMMY"){
            this.sensor=new Sensor(this);
            this.brain=new NN(
                [this.sensor.rayCount,6,4]
            );
        }

        this.controls=new Controls(ctrl);

        this.img=new Image();
        this.img.src="car.png"

        this.mask=document.createElement("canvas");
        this.mask.width=w;
        this.mask.height=h;

        const maskCtx=this.mask.getContext("2d");
        this.img.onload=()=>{

            maskCtx.fillStyle=clr;
            maskCtx.rect(0,0,this.w,this.h);
            maskCtx.fill();

            maskCtx.globalCompositeOperation="destination-atop";
            maskCtx.drawImage(this.img,0,0,this.w,this.h);

        }
    }

    update(roadBorders,traffic){

        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged=this.#assessDamage(roadBorders,traffic);
        }

        if(this.sensor){

            this.sensor.update(roadBorders,traffic);
            const offsets=this.sensor.readings.map(
                s=>s==null?0:1-s.offset
            );

            const outputs=NN.feedForward(offsets,this.brain);

            if(this.useBrain){

                this.controls.forward=outputs[0];
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];

            }
        }

    }

    #assessDamage(roadBorders,traffic){

        for(let i=0;i<roadBorders.length;i++){
            if(polysItst(this.polygon,roadBorders[i])){
                return true;
            }
        }
        
        for(let i=0;i<traffic.length;i++){
            if(polysItst(this.polygon,traffic[i].polygon)){
                return true;
            }
        }
        
        return false;
    
    }

    #createPolygon(){

        const points=[];
        const rad=Math.hypot(this.w,this.h)/2;
        const alpha=Math.atan2(this.w,this.h);
        
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        
        return points;
    
    }

    #move(){

        if(this.controls.forward){
            this.speed+=this.acc;
        }
        
        if(this.controls.reverse){
            this.speed-=this.acc;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        
        if(this.speed<0){
            this.speed+=this.friction;
        }
        
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    
    }

    draw(ctx,drawSensor=false){
        
        if(this.sensor && drawSensor){
            this.sensor.draw(ctx);
        }

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        
        if(!this.damaged){
            ctx.drawImage(this.mask,
                -this.w/2,
                -this.h/2,
                this.w,
                this.h);
            ctx.globalCompositeOperation="multiply";
        }
        
        ctx.drawImage(this.img,
            -this.w/2,
            -this.h/2,
            this.w,
            this.h);
        ctx.restore();
        
    }
}