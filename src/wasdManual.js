export function wasdManual(input, currFace, lastFace, goToFace){
  //inputs are "up,down,left,right"
  let newLast = lastFace;
    if(currFace === 1){
        newLast = currFace;
        if (input === "up")    {goToFace(5);}
        if (input === "left")  {goToFace(4)}
        if (input === "down")  {goToFace(6)}
        if (input === "right") {goToFace(2)}
    }
    else if(currFace === 2){
        newLast = currFace;
        if (input === "up")    {goToFace(5)}
        if (input === "left")  {goToFace(1)}
        if (input === "down")  {goToFace(6)}
        if (input === "right") {goToFace(3)}
    }
    else if(currFace === 3){
        newLast = currFace;
        if (input === "up")    {goToFace(5)}
        if (input === "left")  {goToFace(2)}
        if (input === "down")  {goToFace(6)}
        if (input === "right") {goToFace(4)}
    }
    else if(currFace === 4){
        newLast = currFace;
        if (input === "up")    {goToFace(5)}
        if (input === "left")  {goToFace(3)}
        if (input === "down")  {goToFace(6)}
        if (input === "right") {goToFace(1)}
    }
    else if(currFace === 5){ if (input === "down") { goToFace(newLast); } }
    else if(currFace === 6){ if (input === "up")   { goToFace(newLast); } }
    return newLast;
}

