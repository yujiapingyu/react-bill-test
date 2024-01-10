import { NavBar, DatePicker } from 'antd-mobile';
import { useState } from 'react';
import classNames from 'classnames';
import { dateFormat } from '@/utils/dateFormat';

import './index.scss';

const Month = () => {

  const [dateSelectorVisible, setDateSelectorVisible] = useState(false); // 时间选择器是否显示
  const [currentDate, setCurrentDate] = useState(dateFormat(new Date())); // 当前时间
  const onConfirm = (date) => { // 时间选择器确认按钮
    setDateSelectorVisible(false);
    setCurrentDate(dateFormat(date));
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateSelectorVisible(true)}>
            <span className="text">
              {currentDate}月账单
            </span>
            <span className={classNames('arrow', {'expand': dateSelectorVisible === true})}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateSelectorVisible}
            onCancel={() => setDateSelectorVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateSelectorVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month