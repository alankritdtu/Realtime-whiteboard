// Connect to socket server
const socket = io.connect("https://project-white-board.herokuapp.com/") ;

const board = document.querySelector(".board") ;
board.height = window.innerHeight ;
board.width = window.innerWidth ;


// to refer to the cursor when we are drawing, this function is called
const ctx = board.getContext("2d") ;

// setting initial settings for stroke
ctx.strokeStyle = "white" ;
ctx.imageSmoothingEnabled = true ;
ctx.lineJoin = "round" ;
ctx.lineCap = "round" ;
ctx.miterLimit = 1 ;
ctx.imageSmoothingQuality = "high" ;
ctx.lineWidth = 5 ;

/********************* change size ***************/
function sizeChange(value){
    ctx.lineWidth = value ;
    socket.emit("size",value) ;
}


/*****************************handle color ********/
let ActiveColor = "white" ;
function handleColorChange(color){
    ctx.strokeStyle = color ;
    ActiveColor = color ;
    socket.emit("color",color) ;
}

//**********************tool Change****************/
function handleLocaltoolChange(tool) {
    handleToolChange(tool);
    if (tool != "sticky") socket.emit("toolchange", tool);
}


const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function() {
    handleHamburger() ;
    socket.emit("hamburger");
});

