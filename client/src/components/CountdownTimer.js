import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = '/final';
    }
  }, [seconds]);

  return (
    <div>
      <p>Time Remaining: {seconds}</p>
    </div>
  );
}

export default Timer;
