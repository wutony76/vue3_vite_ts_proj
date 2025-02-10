import Control from '@/logic/racing/Control'
import Car from '@/logic/racing/Car'
import Wall from '@/logic/racing/Wall'
// import Food from '@/logic/snake/Food'
import {EVENTS, GAMESTATUS} from '@/logic/racing/Parameter'
import { ACTIONS } from '@/logic/util/Parameter'
import Tools from '@/logic/util/Tools' 

export default class Game {
  car:Car
  wall: Wall
  // food:Food
  control:Control
  direction:string|null = null
  distance = 10 // number
  isLive: boolean
  callback: any // 遊戲結束.callback
  status: string = GAMESTATUS.NONE
  state: any // 外部參數

  constructor (state: any) {
    // this.food = new Food()
    this.wall = new Wall(this)
    this.car = new Car(this)
    this.control = new Control(this)
    this.isLive = false
    this.state = state 
    this.init()
  }

  updateStatus (changeStatus: string) {
    this.status = changeStatus 
  }
  logPrint (msg:any) {
    console.log('Racing-Game~ ', msg)
  }
  init () {
    console.log('init.raceing')
    this.isLive = true
    this.direction = EVENTS.NONE
    this.status = GAMESTATUS.READY 

    this.state.score = 0
    this.state.level = 1
    this.car.init()
    this.control.init()
    this.state.controlStatus = this.returnkeybordKeyToDirection(this.direction) 

    setTimeout(() => {
      this.status = GAMESTATUS.PLAYING 
      this.run()
    })
  }

  run () {
    this.logPrint(`run, ${this.status} --${this.direction}`)
    if (!this.isLive) return
    this.wall.move()

    // 刷新外部CONTROL資訊
    this.state.controlStatus = this.returnkeybordKeyToDirection(this.direction)
    // CAR位置更新 x, y
    let x = this.car.x
    let y = this.car.y
    let newXY = this.handleReturnXY(x, y)
    x = newXY[0] 
    y = newXY[1] 
    this.logPrint(`ori:(${x},${y})  new:(${newXY[0]},${newXY[1]})`)

    try {
      // WALL碰撞判斷.
      this.checkCollision(x, y)
      // CAR設定新的位置. THROW:遊戲失敗 
      this.car.x = x 
      this.car.y = y 
    } catch(e:any) {
      console.log(e.message)
      this.isLive = false
      if (this.callback) this.callback()
    }
    this.isLive && this.status === GAMESTATUS.PLAYING && setTimeout(this.run.bind(this), this.returnTimeout())
  }
  handleReturnXY (x: number, y: number) {
    let _x = x
    let _y = y 
    switch (this.direction) {
      case EVENTS.UP:
        _y -= this.distance 
        break
      case EVENTS.DOWN:
        _y += this.distance 
        break
      case EVENTS.LEFT:
        _x -= this.distance 
        break
      case EVENTS.RIGHT:
        _x += this.distance 
        break
    }
    this.direction = EVENTS.NONE
    return [_x, _y]
  }
  returnTimeout () {
    const defTimeout = 300 
    let timeOut = defTimeout
    return timeOut
    // switch (this.state.level) {
    //   case 2:
    //     timeOut = 900
    //     break
    //   case 3:
    //     timeOut = 800
    //     break
    //   case 4:
    //     timeOut = 700
    //     break
    //   case 5:
    //     timeOut = 600
    //     break
    //   case 6:
    //     timeOut = 500
    //     break
    //   default:
    //     timeOut = defTimeout
    //     break
    // }
  }
  returnkeybordKeyToDirection (keybordKey:string|null) {
    let direction = '' 
    switch(keybordKey) {
      case EVENTS.UP:
        direction = ACTIONS.CONTROLSUP
        break
      case EVENTS.DOWN:
        direction = ACTIONS.CONTROLSDOWN
        break
      case EVENTS.LEFT:
        direction = ACTIONS.CONTROLSLEFT
        break
      case EVENTS.RIGHT:
        direction = ACTIONS.CONTROLSRIGHT
        break
    }
    return direction 
  }
  checkCollision(x:number, y:number) {
    console.log('checkCollision.', x, y, this.wall.wallData)
    // 由y來計算wallData索引位置
    const _index: number = y/10
    const _find:any = this.wall.wallData.find((w) =>w.wallIndex === _index)
    const _find2:any = this.wall.wallData.find((w) =>w.wallIndex === _index+1)
    console.log('checkCollision._find.', _find)
    console.log('checkCollision._find2.', _find2)
    if (!_find && !_find2) return
    const carVolume:any = {hand: [x+10, x+20], body: [x, x+30]}

    console.log('***car.hand', carVolume.hand[0], carVolume.body[0])
    // __判斷碰撞__
    if (_find) {
      if(carVolume.hand[0]< _find.road[0] || carVolume.hand[0]> _find.road[1]-10 ) {
        // console.log('***car.collision.hand')
        throw new Error('車頭撞到牆壁了！', carVolume.hand[0], _find.road)
      }
    }
    if (_find2) {
      if(carVolume.body[0]< _find2.road[0] || carVolume.body[0]> _find2.road[1]-30 ) {
        // console.log('***car.collision.body', _find2.road,  _find2.road[0],  _find2.road[1]-30)
        throw new Error('車身撞到牆壁了！', carVolume.body[0], _find2.road )
      }
    }
  }
}
