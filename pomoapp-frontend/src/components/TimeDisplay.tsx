import React, { useState, useEffect } from 'react';

interface TimeDisplayProps {
  className?: string;
}

const TimeDisplayComponent = ({ className }: TimeDisplayProps) => {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [weekdayClass, setWeekdayClass] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdayJp = now.toLocaleDateString('ja-JP', { weekday: 'long' });
      const time = now.toTimeString().split(' ')[0];

      const weekdayMap: Record<string, string> = {
        日曜日: 'sun',
        月曜日: 'mon',
        火曜日: 'tue',
        水曜日: 'wed',
        木曜日: 'thu',
        金曜日: 'fri',
        土曜日: 'sat',
      };

      setDateStr(`${year}/${month}/${day}（${weekdayJp}）`);
      setTimeStr(time);
      setWeekdayClass(weekdayMap[weekdayJp]);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`timer large ${weekdayClass}-color ${className || ''}`}>
      <div>{dateStr}</div>
      <div>{timeStr}</div>
    </div>
  );
};

// React.memoを使用して、親コンポーネントが再レンダリングされても
// このコンポーネントが不必要に再レンダリングされないようにします
const TimeDisplay = React.memo(TimeDisplayComponent);
TimeDisplay.displayName = 'TimeDisplay';

export default TimeDisplay;
