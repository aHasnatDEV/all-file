import { user } from './user'
import { product } from './product'
import { image } from './image'
import { cart } from './cart'
import { blog } from './blog'
import { category } from './category'
import { discount } from './discount'
import { message } from './message'
import { notification } from './notification'
import { order } from './order'
import { request } from './request'
import { support } from './support'

export const apiData = {
    ...user,
    ...product,
    ...image,
    ...cart,
    ...blog,
    ...category,
    ...discount,
    ...message,
    ...notification,
    ...order,
    ...request,
    ...support,
}