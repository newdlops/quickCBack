import UserModel, { IUserModel } from '../models/userModel'
import { logger } from '../../config/logger'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'
import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import sha256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import { getRandomValues, randomUUID } from 'crypto'

// TODO: password hash해서 저장하도록
export async function createUser(user: IUserModel) {
  try {
    // TODO: Backend Validation Logic
    const newUser = new UserModel(user)
    return await newUser.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateUser(user: IUserModel) {
  try {
    const updatedUser = await UserModel.findById(user._id)
    Object.keys(user).forEach(key => {
      updatedUser[key] = user[key] as IUserModel
    })
    return await updatedUser.save()
  } catch (err) {
    logger.error('updateUser Error', err)
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await UserModel.findById(id)
    user.isDelete = true
    user.deletedAt = new Date()
    await user.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findUser(user: IUserModel) {
  try {
    return await UserModel.findById(user.id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findUserById(id: string) {
  try {
    return await UserModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getUsers(
  page: number,
  itemsPerPage: number,
  sortField: string,
  sortOrder: SortOrder,
  globalFilter: string,
) {
  const startIndex = page * itemsPerPage
  try {
    const sortCriteria = sortField ? { [sortField]: sortOrder } : null
    const filters = globalFilter
      ? {
        $or: [
          { username: { $regex: globalFilter } },
          { email: { $regex: globalFilter } },
          globalFilter.length == 24
            ? { _id: { $eq: new ObjectId(globalFilter) } }
            : { none: '' },
        ],
      }
      : null
    const result = await UserModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await UserModel.countDocuments()
    return { users: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteUsers(ids: string[]) {
  try {
    return await UserModel.updateMany(
      { _id: { $in: ids } },
      { $set: { isDelete: true } },
    )
  } catch (err) {
    logger.error('Error', err)
  }
}
//TODO: password내려주지 않도록 변경
export const userKakaoLogin = async (_token: string) => {
  try {
    const profile: AxiosResponse<KakaoUserMeResponse, never> = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${decodeURI(_token)}`,
        },
      },
    )
    const kakaoAccount = profile.data.kakao_account
    const user = await UserModel.findOne({ email: { $eq: kakaoAccount.email } })
    if (user) {
      user.accessToken = decodeURI(_token)
      user.accessTokenExpiredAt = dayjs().add(3, 'month').toDate()
      await user.save()
    }
    return { user, kakaoAccount: { ...kakaoAccount } }
  } catch (err) {
    logger.error('Error', err)
  }
}

export const userTokenLogin = async (_token: string) => {
  try {
    const user = await UserModel.findOne({ accessToken: { $eq: decodeURI(_token) } })
    if (user) {
      const isValid = dayjs(user.accessTokenExpiredAt).isAfter(dayjs())
      if (isValid) {
        const expiredWithin3Days = dayjs(user.accessTokenExpiredAt).isBefore(
          dayjs().add(3, 'day'),
        )
        if (expiredWithin3Days) {
          user.accessTokenExpiredAt = dayjs().add(3, 'month').toDate()
          return await user.save()
        }
        return user
      }
    }
    return null
  } catch (err) {
    logger.error('Error', err)
  }
}

export const userLogin = async (userLoginInfo: UserLoginInfo) => {
  try {
    const user = await UserModel.findOne({
      email: { $eq: userLoginInfo.email },
      password: { $eq: userLoginInfo.password },
    })
    if (user) {
      const hash = sha256(randomUUID(), 'key')
      user.accessToken = Base64.stringify(hash).replace('/', 's')
      user.accessTokenExpiredAt = dayjs().add(3, 'month').toDate()
      return await user.save()
    }
    return null
  } catch (err) {
    logger.error('userLogin Error', err)
  }
}

export const adminLogin = async (userLoginInfo: UserLoginInfo) => {
  try {
    const user = await UserModel.findOne({
      email: { $eq: userLoginInfo.email },
      password: { $eq: userLoginInfo.password },
    })
    if (user && user.isAdmin) {
      const hash = sha256(randomUUID(), 'key')
      user.accessToken = Base64.stringify(hash).replace('/', 's')
      user.accessTokenExpiredAt = dayjs().add(3, 'month').toDate()
      return await user.save()
    }
    return null
  } catch (err) {
    logger.error('adminLogin Error', err)
  }
}

export const userLogout = async (_token: string) => {
  try {
    const user = await UserModel.findOne({ accessToken: { $eq: decodeURI(_token) } })
    if (user) {
      user.accessToken = null
      user.accessTokenExpiredAt = null
      return await user.save()
    }
    return null
  } catch (err) {
    logger.error('Error', err)
  }
}
