class Road{
    constructor(x,width,lanCnt=3){
        this.x=x;
        this.width=width;
        this.lanCnt=lanCnt;

        this.left=x-width/2;
        this.right=x+width/2;

        const inf=1000000;
        this.top=-inf;
        this.bottom=inf;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};

        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];

    }

    getLaneCenter(lanIdx){

        const laneWidth=this.width/this.lanCnt;
        return this.left+laneWidth/2+
            Math.min(lanIdx,this.lanCnt-1)*laneWidth;

    }

    draw(ctx){

        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.lanCnt-1;i++){
            
            const x=lerp(
                this.left,
                this.right,
                i/this.lanCnt
            );
            
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();

        }

        ctx.setLineDash([]);

        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
        
    }
}