import { createRouter, createWebHashHistory } from 'vue-router'
import { start, close } from '@/utils/nprogress'
import frontRouter from './front'
import adminRouter from './admin'


const routes = [
  ...frontRouter,
  ...adminRouter,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  start();
  next();
});

router.afterEach(() => {
  close();
});



export default router