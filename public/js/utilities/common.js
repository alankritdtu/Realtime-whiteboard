// function to handle hamburger icon(cross icon)
// let isActive = true ;

function handleHamburger(){
    ctx.clearRect(0, 0, 10000, 10000);
    // for(let i=undoStack.length()-1;i>=0;i++){
    //     redoStack.push(undoStack[i]) ;
    // }
    undoStack = [] ;
    redoStack = [] ;
    
}


// to change tools

let Activetool = "pencil" ;
let showingOptions = false ;
let showingOptionsEraser = false ;

const tools = document.querySelectorAll(".tool") ;
const pencilOptions = document.querySelector(".tool-options.pencil") ;
const eraserOptions = document.querySelector(".tool-options.eraser") ;
const inputs = document.querySelectorAll("input[type=range]") ;
const ImageInput = document.querySelector(".upload-img") ;


function handleToolChange(tool){
    if(tool == "pencil"){
        if(Activetool == "pencil" && showingOptions==false){
            // show pencil options
            pencilOptions.classList.add("show") ;
            showingOptions = true ;
        }else if(Activetool == "pencil"){
          pencilOptions.classList.remove("show") ;
          showingOptions = false ;
        }else{
            Activetool = "pencil" ;
            eraserOptions.classList.remove("show") ;
            console.log(tools) ;
            tools[1].classList.remove("active") ;
            tools[0].classList.add("active") ;
            console.log(pencilOptions) ;
            ctx.strokeStyle = ActiveColor ;
            console.log(inputs) ;
            ctx.lineWidth = inputs[0].value;
            // how one line will draw over other line
            ctx.globalCompositeOperation = "source-over";
        }
    }
    
    else if(tool == "eraser"){
        if(Activetool == "eraser" && showingOptionsEraser==false){
            eraserOptions.classList.add("show") ;
            showingOptionsEraser = true ;
        }
        else if(Activetool == "eraser"){
            eraserOptions.classList.remove("show") ;
            showingOptionsEraser = false ;
        }
        else{
            Activetool = "eraser" ;
            tools[0].classList.remove("active") ;
            tools[1].classList.add("active") ;
            pencilOptions.classList.remove("show") ;
            ctx.globalCompositeOperation = "destination-out" ;
            ctx.lineWidth = inputs[0].value ;
        }
    }

    else if(tool == "sticky"){
        createSticky() ;
    }

}


function createBox(){
    const stickyPad = document.createElement("div") ;
    const navBar = document.createElement("div") ;
    const minimize = document.createElement("div") ;
    const close = document.createElement("div") ;
    const writingPad = document.createElement("div") ;

    stickyPad.setAttribute("class", "sticky-pad");
    navBar.setAttribute("class", "nav");
    writingPad.setAttribute("class", "writing-pad");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
  
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(writingPad);
    body.appendChild(stickyPad);

    close.addEventListener("click",function(){
        stickyPad.remove() ;
    })

    let isMinimized = false ;

    minimize.addEventListener("click",function(){
        if(isMinimized){
            writingPad.style.display = "block" ;
            isMinimized = false ;
        }else{
            writingPad.style.display = "none" ;
            isMinimized = true ;
        }
    })

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;

    // to move sticky
    navBar.addEventListener("mousedown",function(e){
        initialX = e.clientX ;
        initialY = e.clientY ;
        isStickyDown = true ;  
    }) ;

    navBar.addEventListener("mousemove",function(e){
        if(isStickyDown){
            let finalX = e.clientX ;
            let finalY = e.clientY ;
            let diffX = finalX - initialX ;
            let diffY = finalY - initialY ;
            let {top,left} = this.getBoundingClientRect() ;
            stickyPad.style.top = top + diffY + "px";
            stickyPad.style.left = left + diffX + "px";
            initialX = finalX;
            initialY = finalY;
        }
    }) ;

    navBar.addEventListener("mouseup",function(e){
      isStickyDown = false ;
    }) ;

    document.body.appendChild(stickyPad) ;

    return writingPad ;

}








