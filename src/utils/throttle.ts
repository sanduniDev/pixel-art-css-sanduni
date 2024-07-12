const throttle = (fn: { (): void; (): void; }, limit: number) => {
  let id: string | number | NodeJS.Timeout | undefined;
  let now: number;
  let limitTime: number;
  const execFn = () => {
    limitTime = now + limit;
    fn();
  };
  return () => {
    now = Date.now();
    if (!limitTime || limitTime <= now) {
      execFn();
    } else {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(execFn, limitTime - now);
    }
  };
};

export default throttle;
