import React, { useEffect, useState, useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useSelector } from 'react-redux'

import { submitFunction } from '../../shared/submit'
import { fetchFunction } from '../../shared/fetch'
import UserIcon from '../../assets/image/user.png'

const User = () => {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [postList, setPostList] = useState()
  const [ruleList, setRuleList] = useState()

  const inputElementRef = useRef()
  const [postUpdate, setPostUpdate] = useState()

  const [idState, setIdState] = useState('')
  const [editMode, setEditMode] = useState(false)

  const [isAdmin, setIsAdmin] = useState(false)
  const [addContact, setAddContact] = useState(false)

  const [add, setAdd] = useState(false)

  let _token = useSelector(state => state.reducer.token)
  const [token, setToken] = useState(_token)

  const checkHandler = async event => {
    let values = []

    let inputs = document.getElementsByTagName('input')
    for (let i = inputs.length - 1; i >= 0; i--) {
      if (inputs[i].type === 'checkbox' && inputs[i].checked) {
        values.push(inputs[i].value)
      }
    }
    setRuleList(values)
  }

  const addHandler = async () => {
    if (!editMode) {
      if (
        name === '' ||
        mobile === '' ||
        password === '' ||
        (!isAdmin && ruleList === undefined)
      ) {
        alert('وارد کردن مقادیر فیلدها الزامی است')
        return
      }
      try {
        const _body = JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          ruleList: !isAdmin ? ruleList : '',
          password: password.trim(),
          isAdmin: isAdmin,
          addContact: addContact
        })
        await submitFunction('/user/new-user', 'POST', _body, token)
      } catch (error) {
        console.log(error)
      }

      setName('')
      setMobile('')
      setPassword('')
      setAdd(true)
      setIsAdmin(false)
      setAddContact(false)
    } else {
      if (name === '' || mobile === '') {
        alert('وارد کردن مقادیر فیلدها الزامی است')
        return
      }
      try {
        const _body = JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          ruleList: !isAdmin ? ruleList : '',
          password: password.trim(),
          isAdmin: isAdmin,
          addContact: addContact
        })
        await submitFunction(`/user/update/${idState}`, 'PATCH', _body, token)
      } catch (error) {
        console.log(error)
      }
      setEditMode(false)
      setName('')
      setMobile('')
      setPassword('')
      setAdd(true)

      setIsAdmin(false)
      setAddContact(false)
    }
  }

  const editHandler = async id => {
    inputElementRef.current.focus()

    setIsAdmin(false)
    setAddContact(false)
    setIdState(id)
    // setPostUpdate();
    let response, res
    try {
      response = await fetchFunction(`/user/fetchForUpdate/${id}`, token)
    } catch (error) {
      console.log(error)
    }

    try {
      res = await fetchFunction(`/user/fetchForUpdateRule/${id}`, token)
    } catch (error) {
      console.log(error)
    }

    const pp = []
    res.map(async element => {
      pp.push(element.PostId)
      pp.sort()
    })
    // console.log('pppp', pp)
    setPostUpdate(pp)

    if (response.isAdmin) {
      setIsAdmin(true)
    }
    if (response.addContact) {
      setAddContact(true)
    }
    setEditMode(true)
    setName(response.name)
    setMobile(response.mobile)
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
    setMobile('')
    setPassword('')
    const _body = JSON.stringify({
      id: id
    })
    await submitFunction('/user/delete', 'DELETE', _body, token)
    const _users = users.filter(Element => Element.id !== id)
    setUsers(_users)
  }

  const checkAdminHandler = () => {
    let values = []

    let input = document.getElementById('admin')
    if (input.type === 'checkbox' && input.checked) {
      values.push(1)
      setIsAdmin(true)
    } else {
      values.pop()
      setIsAdmin(false)
    }
  }

  const checkAddContactHandler = () => {
    let values = []

    let input = document.getElementById('addContact')
    if (input.type === 'checkbox' && input.checked) {
      values.push(1)
      setAddContact(true)
    } else {
      values.pop()
      setAddContact(false)
    }
  }

  const searchMobileHandler = async event => {
    setMobile(event.target.value)
    setAdd(false)
    let res
    const _body = JSON.stringify({
      search: event.target.value
    })
    try {
      res = await submitFunction('/user/searchUserMobile', 'POST', _body, token)
    } catch (error) {
      console.log(error)
    }
    // console.log('ssssss', res)
    setUsers(res)
  }

  const searchNameHandler = async event => {
    setName(event.target.value)
    setAdd(false)
    let res
    const _body = JSON.stringify({
      search: event.target.value
    })
    try {
      res = await submitFunction('/user/searchUserName', 'POST', _body, token)
    } catch (error) {
      console.log(error)
    }
    // console.log('ssssss', res)
    setUsers(res)
  }

  useEffect(
    () => {
      const func = async () => {
        const res = await fetchFunction('/user', token)
        setUsers(res)
      }
      func()
    },
    [setUsers, add, token]
  )

  useEffect(
    () => {
      const func = async () => {
        const res = await fetchFunction('/post', token)
        setPostList(res)
      }
      func()
    },
    [token]
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
    [name, mobile, password, ruleList, isAdmin, addHandler]
  )

  return (
    <div className="container mx-auto font-face-IRANSansWeb caret-transparent screen500:text-[12px]">
      <div className="text-center caret-transparent">
        <div>
          <input
            ref={inputElementRef}
            dir="rtl"
            type="text"
            name="name"
            className="border-2 my-4  bg-white text-[#ed1c24] caret-black  rounded-lg placeholder-black px-1 py-1 border-[#ed1c24] focus:outline-none focus:placeholder-white"
            onChange={e => searchNameHandler(e)}
            value={name}
            placeholder="نام و نام خانوادگی"
          />
        </div>
        <div>
          <input
            type="text"
            name="mobile"
            className="border-2 my-4  bg-white text-[#ed1c24] caret-black placeholder-black rounded-lg px-1 py-1 border-[#ed1c24] focus:outline-none focus:placeholder-white"
            onChange={e => searchMobileHandler(e)}
            value={mobile}
            placeholder="موبایل"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="border-2 my-4  bg-white text-[#ed1c24] caret-black placeholder-black rounded-lg px-1 py-1 border-[#ed1c24] focus:outline-none focus:placeholder-white"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="کلمه عبور "
          />
        </div>
        <div style={{ direction: 'rtl' }}>
          <label className="text-[#ed1c24]">
            کاربر به عنوان ادمین تعریف شود؟
          </label>
          <input
            type="checkbox"
            className="accent-[#ed1c24] outline-none  mx-3  "
            id="admin"
            checked={isAdmin ? 'checked' : ''}
            onChange={checkAdminHandler}
          />
        </div>

        <div style={{ direction: 'rtl' }}>
          <label className="text-[#ed1c24]">اضافه کردن مخاطب جدید؟</label>
          <input
            type="checkbox"
            checked={addContact ? 'checked' : ''}
            className="accent-[#ed1c24] outline-none  mx-3 my-5 "
            id="addContact"
            onChange={checkAddContactHandler}
          />
        </div>

        <div
          style={{ direction: 'rtl' }}
          className="grid grid-cols-4 gap-y-5  my-10"
        >
          {postList &&
            !isAdmin &&
            postList.map((Element, i) => {
              return (
                <div key={Element.id} className="caret-transparent">
                  <label className="mx-2 caret-transparent " htmlFor="myCheck">
                    {Element.name}
                  </label>
                  <input
                    type="checkbox"
                    className="accent-[#ed1c24] outline-none  "
                    name="rulesCheckBox"
                    id={Element.id}
                    value={Element.id}
                    onChange={checkHandler}
                  />
                </div>
              )
            })}
        </div>

        <button
          type="button"
          className="border-2  bg-[#ed1c24] text-white font-bold border-[#ed1c24] py-1 px-4 my-2 mb-10 rounded-lg"
          onClick={addHandler}
        >
          {editMode ? 'ویرایش' : 'اضافه'}
        </button>
      </div>

      <div className="text-center  ">
        {users &&
          users.map(Element => (
            <div
              style={{ direction: 'rtl' }}
              key={Element.id}
              className="grid grid-cols-5 my-4 border-2 rounded-lg  border-[#ed1c24] text-white font-bold mx-auto screen500:text-[12px] screen400:text-[11px] py-3"
            >
              <div className="mx-auto ">
                <img alt="user" src={UserIcon} className="w-9 screen500:w-6 " />
              </div>
              <div className="pt-2">{Element.name}</div>
              <div className="pt-2">{Element.mobile}</div>
              <div
                className="cursor-pointer pt-2"
                onClick={() => editHandler(Element.id)}
              >
                ویرایش
              </div>
              <div
                className={`cursor-pointer text-[#ed1c24] font-bold pt-2 ${Element.name ===
                  'admin' && 'hidden'}`}
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

export default User


