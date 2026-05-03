import React, { useEffect, useState ,useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { useSelector } from 'react-redux'

import { submitFunction } from '../../shared/submit'
import { fetchFunction } from '../../shared/fetch'
import Position from '../../assets/image/position.png'

const Post = () => {
  const [name, setName] = useState('')
  const [postList, setPostList] = useState([])
  const [add, setAdd] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const [idState, setIdState] = useState()

  let _token = useSelector(state => state.reducer.token)
  const [token, setToken] = useState(_token)


  const inputElementRef = useRef();
  const addHandler = async () => {
    if (name === '') {
      alert('فیلد نام را وارد کنید')
      return
    }
    if (!editMode) {
      const _body = JSON.stringify({
        name: name.trim()
      })
      await submitFunction('/post/new-post', 'POST', _body, token)
      setName('')
      setAdd(true)
    } else {
      let res

      try {
        const _body = JSON.stringify({
          name: name
        })
        await submitFunction(`/post/update/${idState}`, 'PATCH', _body, token)
      } catch (error) {
        console.log(error)
      }
      setEditMode(false)
      setAdd(true)
      setName('')
    }
  }

  const editHandler = async id => {
    inputElementRef.current.focus();

    let res

    try {
      res = await fetchFunction(`/post/fetchForUpdate/${id}`, token)
    } catch (error) {
      console.log(error)
    }

    setEditMode(true)
    setIdState(res.id)
    setName(res.name)
  }

  const confirmDeleteHandler = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="w-[310px] border-2 font-face-IRANSansWeb border-red-500 bg-black p-4 rounded-lg absolute top-16 right-[38%] text-sm font-bold ">
            <h1 className="text-red-400 ">{}</h1>
            <p className="text-white text-right py-3 "> حذف شود ؟ </p>

            <button
              onClick={() => {
                onClose()
              }}
              className="bg-white text-red-500 rounded-md p-2 mx-2 mt-4 w-14 text-sm"
            >
              خیر
            </button>
            <button
              onClick={() => {
                deleteHandler(id)
                onClose()
              }}
              className="bg-red-500 text-white rounded-md p-2 mx-2 mt-4 w-14  text-sm"
            >
              بله
            </button>
          </div>
        )
      }
    })
  }

  const deleteHandler = async id => {
    setEditMode(false)
    setName('')
    const _body = JSON.stringify({
      id
    })
    const res = await submitFunction('/post/delete', 'DELETE', _body, token)
    if (res !== undefined) {
      const _posts = postList.filter(Element => Element.id !== id)
      setPostList(_posts)
    }
  }

  const searchHandler = async event => {
    setName(event.target.value)
    setAdd(false)

    let res
    const _body = JSON.stringify({
      search: event.target.value
    })
    try {
      res = await submitFunction('/post/search', 'POST', _body, token)
    } catch (error) {
      console.log(error)
    }
    // console.log('ssssss', res)
    setPostList(res)
  }

  useEffect(
    () => {
      const func = async () => {
        const res = await fetchFunction('/post', token)
        // console.log('uuuu', res)
        setPostList(res)
      }
      func()
    },
    [setPostList, token, add]
  )

  useEffect(
    () => {
      const listener = event => {
        if (event.code === 'Enter') {
          event.preventDefault()
          addHandler()
        }
      }
      document.addEventListener('keydown', listener)
      return () => {
        document.removeEventListener('keydown', listener)
      }
    },
    [name]
  )

  return (
    <div className="container mx-auto font-face-IRANSansWeb caret-transparent ">
      <div className="text-center">
        <div>
          <input
           ref={inputElementRef}
            type="text"
            name="name"
            dir="rtl"
            className="border-2 my-4  bg-white text-[#ed1c24] caret-black rounded-lg px-1 py-1 placeholder-black border-[#ed1c24] screen500:text-[12px]
             focus:outline-none focus:placeholder-white"
            onChange={e => searchHandler(e)}
            value={name}
            placeholder="سمت شغلی"
          />
        </div>

        <button
          type="button"
          className="border-2  bg-[#ed1c24] text-white font-bold border-[#ed1c24] py-1 px-4 my-2 mb-10 rounded-lg screen500:text-[12px]"
          onClick={addHandler}
        >
          {editMode ? 'ویرایش' : 'اضافه'}
        </button>
      </div>

      <div className="text-center caret-transparent ">
        {postList &&
          postList.map(Element => (
            <div
              style={{ direction: 'rtl' }}
              key={Element.id}
              className="grid grid-cols-4 my-4 border-2  mx-40 screen1100:mx-auto screen500:text-[12px] border-[#ed1c24] text-white font-bold rounded-md py-1"
            >
              <div className="mx-auto">
                <img
                  src={Position}
                  className="w-9  screen500:w-7"
                  alt="position"
                />
              </div>
              <div className="pt-2">{Element.name}</div>
              <div
                className="cursor-pointer pt-2"
                onClick={() => editHandler(Element.id)}
              >
                ویرایش
              </div>
              <div
                className="cursor-pointer text-[#ed1c24]  font-bold pt-2"
                onClick={() => confirmDeleteHandler(Element.id)}
              >
                حذف
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Post
