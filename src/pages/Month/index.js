import { NavBar, DatePicker } from "antd-mobile";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { dateFormat, dateFormatToDay } from "@/utils/dateFormat";
import { useSelector } from "react-redux";
import DailyBill from "./components/DailyBill"

import "./index.scss";
import _ from "lodash";

const Month = () => {
  const billList = useSelector((state) => state.bill.billList); // 账单列表
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dateFormat(item.date));
  }, [billList]);

  const [dateSelectorVisible, setDateSelectorVisible] = useState(false); // 时间选择器是否显示
  const [currentDate, setCurrentDate] = useState(dateFormat(new Date())); // 当前时间
  const [currentMonthList, setCurrentMonthList] = useState([]); // 当前月份的账单列表

  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((total, item) => total + item.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + item.money, 0);
    return {
      pay,
      income,
      total: income + pay,
    };
  }, [currentMonthList]);

  useEffect(() => {
    if (monthGroup[currentDate]) {
      setCurrentMonthList(monthGroup[currentDate]);
    }
  }, [monthGroup, currentDate]);

  const onConfirm = (date) => {
    // 时间选择器确认按钮
    setDateSelectorVisible(false);
    const dateStr = dateFormat(date);
    if (!monthGroup[dateStr]) {
      // 当月没有数据，则设置一个空的数组
      setCurrentMonthList([]);
    } else {
      setCurrentMonthList(monthGroup[dateStr]);
    }
    setCurrentDate(dateStr);
  };

  // 当前月按照日期来分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dateFormatToDay(item.date));
    const keys = Object.keys(groupData).sort((a, b) => new Date(a) - new Date(b));
    return {
      keys,
      groupData
    }
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateSelectorVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", {
                expand: dateSelectorVisible === true,
              })}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
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
        {/* 单日账单列表 */}
        {
          dayGroup.keys.map(key => {
            return <DailyBill date={key} billList={dayGroup.groupData[key]} key={key} />
          })
        }
      </div>
    </div>
  );
};

export default Month;
