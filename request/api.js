/**   
 * api接口统一管理
 */
import { get, post } from './http'
import env from '../src/api/index.js'

// const domain = 'http://ecnu-cs.cn'
const domain = env.domain

export const userRegister = p => post(domain + '/user/register/', p)
export const getAllActivity = p => get(domain + '/activity/all/', p);
export const holdActivity = p => post(domain + '/activity/hold/', p)
export const acActivity = p => post(domain + '/activity/accept/', p)
export const getActivityDetail = p => get(domain + '/activity/activity_detail/', p)
export const getActivityHold = p => get(domain + '/activity/show_hold/', p)
export const getActivityAc = p => get(domain + '/activity/show_accept/', p)
export const getOpenid = p => post(domain + '/wXConfigUtil/getopenid', p)
export const modifyUserinfo = p => post(domain +'/user/modify/', p)
export const modifyUsertag = p => post(domain +'/user/modify_tag/', p)
export const getUserinfo = p => get(domain +'/user/user_detail/', p)
export const getMemberlist = p => get(domain +'/excel/download', p)
export const getAcceptuser= p => get(domain +'/activity/show_accept_user/', p)
export const cancelActivity= p => get(domain +'/activity/delete/', p)
export const cancelAccept= p => post(domain +'/activity/cancel_accept/', p)





