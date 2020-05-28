import fetch from 'isomorphic-fetch'
import qs from 'qs'

const getJson = (text: string) => {
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return null
  }
}

const responseWrap = (request: (params: RequestType) => Promise<Response>) => <
  T
>(
  params: RequestType
): Promise<T> =>
  request(params).then(
    (response: Response) =>
      new Promise((res, rej) =>
        response.text().then((text: string) => {
          const json: T = getJson(text)

          if (response.ok) {
            res(json)
          } else {
            rej(json)
          }
        })
      )
  )

export interface RequestType extends RequestInit {
  url: string
  data?: object
}

export const postForm = responseWrap(
  ({ url, headers, data, ...other }: RequestType) => {
    let targetBody = ''

    if (data) {
      targetBody = Object.keys(data).reduce((acc, field) => {
        // @ts-ignore: Unreachable code error
        const value = data[field]
        const targetAcc = acc === '' ? '' : `${acc}&`

        return `${targetAcc}${encodeURIComponent(field)}=${encodeURIComponent(
          value
        )}`
      }, '')
    }

    return fetch(url, {
      ...other,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers,
      },
      body: targetBody,
    })
  }
)

export const post = responseWrap(({ url, headers, data }: RequestType) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })
)

export const del = responseWrap(({ url, headers }: RequestType) =>
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
)

export const update = responseWrap(({ url, headers, data }: RequestType) =>
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })
)

export const get = responseWrap(({ url, data, ...other }: RequestType) => {
  const pos = url.indexOf('?')
  let targetUrl = url

  if (pos !== -1) {
    targetUrl = url.slice(0, url.indexOf('?'))
  }

  if (!data) {
    return fetch(targetUrl, other)
  }

  return fetch(`${targetUrl}?${qs.stringify(data)}`, other)
})
