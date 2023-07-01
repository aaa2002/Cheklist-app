import moment from "moment/moment";
import React from "react";

export default function WeekDays() {

    let weekDayShort = moment.weekdaysShort();
    let WeekDaysShortName = weekDayShort.map(day => {
        return (
            <th key={day} className="week-day">
                {day}
            </th>
        );
    });

    return (
        {WeekDaysShortName}
    );
}