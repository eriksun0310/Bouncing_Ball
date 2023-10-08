let c = document.getElementById("myCanvas")
let canvasHeight = c.height
let canvasWidth = c.width
const ctx = c.getContext("2d")
let circle_x = 160
let circle_y = 60
let radius = 20
let xSpeed = 20
let ySpeed = 20
//地板
let ground_x = 100
let ground_y = 500
let ground_hight = 5
//磚塊
let brickArray = []
let count = 0

// 產生一個有範圍隨機的數 param:(min   , max)
function getRandomArbitrary(min, max){
    return min + Math.floor(Math.random()*(max -min))
}

class Brick {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width  = 50
        this.height = 50
        brickArray.push(this)
        this.visible  =  true // 磚頭為可見的
    }
    //畫出磚頭
    drawBrick(){
        ctx.fillStyle ="lightgreen"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    //磚頭有碰到球
    touchingBall(ballX, ballY){
        return(
            ballX >= this.x - radius &&
            ballX <=  this.x + this.width +radius &&
            ballY >= this.y - radius &&
            ballY <= this.y + this.height + radius
        )
    }

}

//製作所有的brick
for(let i= 0 ;i <10; i++ ){
    new Brick(getRandomArbitrary(0,950), getRandomArbitrary(0,550))
}

c.addEventListener("mousemove", (e)=>{
    ground_x = e.clientX
})

function drawCircle(){

    //確認球是否有打到磚頭
    brickArray.forEach((brick, index) =>{
        //如果有磚頭有碰到球
        if(brick.visible && brick.touchingBall(circle_x, circle_y)){
            count++
            brick.visible = false // 磚頭為不可見的
            //改變x, y方向的速度, 並且將brickArray 中移除
            //從下方撞擊
            if(circle_y >= (brick.y + brick.height)){
                ySpeed *= -1
            //從上方撞擊
            }else if(circle_y <= brick.y){
                ySpeed *= -1
            //從右方撞擊
            }else if(circle_x >= (brick.x + brick.width)){
                xSpeed *= -1
            }else if(circle_x <= brick.x){
                xSpeed *= -1
            }
            // brickArray.splice(index, 1)
            // if(brickArray.length === 0){
            //     alert('遊戲結束')
            // }
            if(count === 10){
                alert('遊戲結束')
                clearInterval(game)
            }
        }
    })



    //確認球是否有打到橘色地板
    if(
        circle_x >= ground_x - radius &&
        circle_x <= ground_x + 200 + radius &&
        circle_y >= ground_y - radius &&
        circle_y <= ground_y + radius
    ){
        //由上彈到地板
        if(ySpeed > 0){
            circle_y -= 40
        //由下彈到地板
        }else{
            circle_y += 40
        }
        ySpeed *= -1

    }


    
    //確認球有沒有打到邊界
    //打到右邊邊界
    if(circle_x >= canvasWidth - radius){
        xSpeed *= -1;
    }
    //打到左邊邊界
    if(circle_x <= radius){
        xSpeed *= -1;
    }
    //打到下邊邊界
    if(circle_y >= canvasHeight - radius){
        ySpeed *= -1;
    }
    //打到上邊邊界
    if(circle_y <= radius){
        ySpeed *= -1;
    }
    
    
    
    //更動圓的座標
    circle_x += xSpeed
    circle_y += ySpeed


    //畫出黑色的背景
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canvasWidth, canvasHeight)
    
    //畫出所有的磚頭
    brickArray.forEach(brick=>{
        if(brick.visible){
            brick.drawBrick()
        }
    })

    //畫出橘色地板
    ctx.fillStyle = "orange"
    ctx.fillRect(ground_x,ground_y, 200, ground_hight)

    //畫出圓球
    ctx.beginPath()
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fillStyle = "yellow"
    ctx.fill()
}

let game =  setInterval(drawCircle, 25)