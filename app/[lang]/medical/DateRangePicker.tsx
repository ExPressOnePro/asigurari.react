import React, { useState, useRef, useEffect } from "react";
// @ts-ignore
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

interface DateRangePickerProps {
    dateRange: Range[];
    setDateRange: React.Dispatch<React.SetStateAction<Range[]>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Устанавливаем начальные даты: сегодня и завтрашний день
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1); // Завтрашний день

        setDateRange([
            {
                startDate: today,
                endDate: tomorrow,
                key: "selection"
            }
        ]);
    }, [setDateRange]);

    const handleDateChange = (item: any) => {
        const start = item.selection.startDate!;
        let end = item.selection.endDate!;

        if (start.toDateString() === end.toDateString()) {
            end = new Date(start);
            end.setDate(end.getDate() + 1); // Если дата начала и конца совпадают, ставим конец на следующий день
        }

        setDateRange([{ startDate: start, endDate: end, key: "selection" }]);
        setShowCalendar(false);
    };

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formattedRange = `${format(dateRange[0].startDate!, "dd.MM.yyyy")} - ${format(dateRange[0].endDate!, "dd.MM.yyyy")}`;

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <label className="text-gray-700 font-medium mb-1 block">Выберите кол-во дней</label>
            <input
                type="text"
                value={formattedRange}
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full border rounded-lg px-4 py-2 cursor-pointer bg-white"
            />
            {showCalendar && (
                <div className="absolute z-50 mt-2 shadow-lg">
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        minDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
