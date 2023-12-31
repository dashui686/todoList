import createAxios from '@/utils/axios'


export function getList(param: anyObj = {}) {
  return createAxios<anyObj>({
      url: "/todoItem/",
      method: 'get',
      params: param,
  })
}

export function saveItem(data: anyObj = {}) {
  return createAxios<anyObj>({
      url: "/todoItem/",
      method: 'post',
      data:data,
  })
}


export function editItem(data: anyObj = {}) {
  return createAxios<anyObj>({
      url: "/todoItem/",
      method: 'put',
      data:data,
  })
}