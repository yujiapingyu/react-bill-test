import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constant'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [billType, setBillType] = useState('pay') // pay | income
  const [money, setMoney] = useState(0) // 金额
  const handleMoneyChange = (value) => {
    setMoney(value)
  }
  const [useFor, setUseFor] = useState('') // 用途

  // save form data
  const handleSave = () => {
    let realMoney = money
    if (billType === 'pay') {
      realMoney = -money
    }
    realMoney = Number(realMoney)
    const data = {
      type: billType,
      money: realMoney,
      date: new Date(),
      useFor: useFor,
    }
    console.log('begin to save', data)
    dispatch(addBillList(data))
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames('', {
              selected: billType === 'pay'
            })}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames('', {
              selected: billType === 'income'
            })}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={handleMoneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSave}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New