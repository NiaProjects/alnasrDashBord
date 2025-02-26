import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useApi({url , data = {} , method = "get" , queryKey}) {
const myAxios = axios.create({ baseURL: "https://www.test.nia.com.eg/alnasr/public/api"})

    function callApi () {
            return myAxios[method](url , { body : data ,})
    }
    const res = useQuery( { queryKey  , queryFn : callApi , refetchOnWindowFocus : false} )

  return res
}
