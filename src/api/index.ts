import Mock from 'mockjs'
import * as Utils from '@/utils/util'

export const getCarList = async (limit: number) => {
  await Utils.sleep(1000)
  return Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    [`list|${limit}`]: [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        id: '@id',
        title: '@ctitle(5,12)',
        name: '@cname',
        date: '@date',
        address: '@city',
        image: '@image'
      }
    ]
  })
}
export interface CarList {
  id: string
  title: string
  name: string
  date: string
  address: string
  image: string
}
