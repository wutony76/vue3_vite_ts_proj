import GameLottery from '@/views/GameLottery.vue'
import GameSnake from '@/views/GameSnake.vue'
import GameRacing from '@/views/GameRacing.vue'
import GameTetriminos from '@/views/GameTetriminos.vue'
import { PATH_NAME } from '@/logic/utils/Parameter'

const SubRoutes = {
  sort: 13,
  path: '/game',
  name: 'Game',
  children: [
    { name: 'Snake', path: 'snake', meta: {}, component: GameSnake },
    { name: 'Racing', path: 'racing', meta: {}, component: GameRacing },
    { name: 'Lottery', path: 'lottery', meta: {}, component: GameLottery },
    { name: PATH_NAME.TETRIMINOS, path: 'tetriminos', meta: {}, component: GameTetriminos },
  ]
}
export default SubRoutes
