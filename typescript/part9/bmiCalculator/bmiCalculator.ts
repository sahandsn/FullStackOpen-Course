const calculateBmi = (height:number, weight:number) => {
    const score = weight / (height ** 2)
    if(score < 18.5){
        console.log('Under weight');
    } 
    else if (18.5 < score && score < 24.9) {
        console.log('Normal(healthy weight)');
    }  
    else if (25 < score && score < 29.9) {
        console.log('Normal(healthy weight)');
    }  
    else if (30 < score && score < 34.9) {
        console.log('Obesity(class I)');
    }  
    else if (35 < score && score < 39.9) {
        console.log('Obesity(class II)');
    }  
    else if (40 < score) {
        console.log('Exreme obesity');
    }  
    
}

calculateBmi(1.8, 70)