import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


export default class Calendar extends React.Component {
  WeekDayShort = moment.weekdaysShort();
  WeekDayShortName = this.WeekDayShort.map((day) => {
    return (
      <th key={day} className="week-day">
        {day}
      </th>
    );
  });

  month = () => {
    return moment().format("MMMM");
  };

  prevMonth = () => {
    this.month = moment(this.month, "MMMM").subtract(1);
  };

  year = () => {
    return moment().format("YYYY");
  };

  state = {
    stateObject: moment(),
    allMonths: moment.months(),
  };

  render() {
    const currentDate = moment();
    // const currentDay = () => {
    //   return currentDate.format("DD");
    // };

    const firstDayOfMonth = () => {
      return this.state.stateObject.startOf("month").format("d");
    };

    let blanksBegin = [];
    const firstDay = parseInt(firstDayOfMonth());

    for (let i = 0; i < firstDay; i++) {
      blanksBegin.push(
        <td key={`blank-${i}`} className="calendar-day">
          {""}
        </td>
      );
    }

    let daysInMonth = [];
    for (let day = 1; day <= this.state.stateObject.daysInMonth(); day++) {
      let today =
        day == moment().format("D") &&
        this.state.stateObject.format("MM") == moment().format("MM")
          ? "Today"
          : "";
          const absoluteDate = moment().date(day).format("DD-MM-YYYY");
      daysInMonth.push(
        <td key={day} className={`calendar-day${today}`}>
          <Link to={`/day/${absoluteDate}`}>
            <button>
              <div className="date-number">{day}</div>
              <div className="tasks-number">tasks</div>
            </button>
          </Link>
        </td>
      );
    }

    const totalCells =
      7 *
      Math.ceil(
        (parseInt(firstDayOfMonth()) + parseInt(daysInMonth.length)) / 7
      );

    const blanksEnd = [];
    for (
      let i = blanksBegin.length + daysInMonth.length;
      i < totalCells;
      i++
    ) {
      blanksEnd.push(
        <td
          key={i + daysInMonth.length + blanksBegin.length}
          className="calendar-day"
        >
          {""}
        </td>
      );
    }

    const allDays = [...blanksBegin, ...daysInMonth, ...blanksEnd];
    let rows = [];
    let cells = [];

    allDays.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === allDays.length - 1) {
        rows.push(cells);
      }
    });

    if (rows[0].length === 0) {
      rows.splice(0, 1);
    }

    let daysWrapped = rows.map((day) => {
      return <tr className="day-row">{day}</tr>;
    });

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead className="calendar-header">
            <h2>Calendar</h2>
            <div className="calendar-navi">
              <div className="calendar-navi-month">
                <button
                  onClick={() => {
                    const previousMonth = moment(
                      this.state.stateObject
                    ).subtract(1, "month");
                    this.setState({ stateObject: previousMonth });
                  }}
                >
                  {"<"}
                </button>
                <button>{this.state.stateObject.format("MMMM")}</button>
                <button
                  onClick={() => {
                    const nextMonth = moment(this.state.stateObject).add(
                      1,
                      "month"
                    );
                    this.setState({ stateObject: nextMonth });
                  }}
                >
                  {">"}
                </button>
              </div>
              <div className="calendar-navi-year">
                <button
                  onClick={() => {
                    const previousYear = moment(
                      this.state.stateObject
                    ).subtract(1, "year");
                    this.setState({ stateObject: previousYear });
                  }}
                >
                  {"<"}
                </button>
                <button>{this.state.stateObject.format("YYYY")}</button>
                <button
                  onClick={() => {
                    const nextYear = moment(this.state.stateObject).add(
                      1,
                      "year"
                    );
                    this.setState({ stateObject: nextYear });
                  }}
                >
                  {">"}
                </button>
              </div>
            </div>
            <tr className="week-days">{this.WeekDayShortName}</tr>
          </thead>
          <tbody className="calendar-body">{daysWrapped}</tbody>
        </table>
      </div>
    );
  }
}
