import { useState } from 'react'
import './App.css'
const clasname = 'abc'
const user = {
  style: {
    width: '100px',
    height: '200px'
  }
}
function MyDivButtonA ({ count, addOne }) {
  return (
    <div 
      className={clasname}
      style={ user.style }
      onClick={ addOne }
    >我DivA按钮，已经点击了{count}次</div>
  )
}

function MyDivButtonB ({ count, addOne }) {
  return (
    <div 
      className={clasname}
      style={ user.style }
    >我DivB按钮</div>
  )
}

const alist = [
  { order: '列表1', name: '名字1' },
  { order: '列表2', name: '名字2' },
  { order: '列表3', name: '名字3' },
  { order: '列表4', name: '名字4' },
]

const tj = 4

function Liebiao () {
  const item = alist.map(e => {
    return <div key={ e.order }>
        <span>顺序：{e.order}----</span>
        <span>名字：{e.name}</span>
      </div>
  })
  return (
    <div>{ item }</div>
  )
}
function App() {
  const [count, setCount] = useState(0)
  const addOne = function () {
    setCount(count + 1)
  }
  let thisButton:any
  if (tj > 2) {
    thisButton = <MyDivButtonA count={count} addOne={addOne} />
  } else {
    thisButton = <MyDivButtonB />
  }
  return (
    <>  
      <div>123</div>
      { thisButton }
      { thisButton }
      列表
      <Liebiao /> 
    </>
  )
}

export default App
