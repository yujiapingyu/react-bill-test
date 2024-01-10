import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";

const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((total, item) => total + item.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + item.money, 0);
    return {
      pay,
      income,
      total: income + pay,
    };
  }, [billList]);

  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{ dayResult.pay }</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{ dayResult.income }</span>
          </div>
          <div className="balance">
            <span className="money">{ dayResult.total }</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
