class NN{

    constructor(nrnCnts){
        this.levels=[];
        
        for(let i=0;i<nrnCnts.length-1;i++){
            this.levels.push(new Level(
                nrnCnts[i],nrnCnts[i+1]
            ));
        }

    }

    static feedForward(givenInputs,net){
        
        let outputs=Level.feedForward(
            givenInputs,net.levels[0]);
        
        for(let i=1;i<net.levels.length;i++){
            outputs=Level.feedForward(
                outputs,net.levels[i]);
        }

        return outputs;
    }

    static mutate(net,amount=1){
        net.levels.forEach(level => {
            
            for(let i=0;i<level.biases.length;i++){
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }

            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].length;j++){
                    level.weights[i][j]=lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }

        });
    }
}

class Level{
    
    constructor(inputCount,outputCount){
        
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);
        this.weights=[];
        
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }

    }

    static feedForward(givenInputs,level){
        
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i];
            }

            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }
            
            else{
                level.outputs[i]=0;
            }

        }

        return level.outputs;
    }
}