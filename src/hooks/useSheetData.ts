import { useCallback, useEffect, useState } from 'react';

export type SheetDataState = 'loading' | 'error' | 'empty' | 'ready';

export interface SheetData<T> {
  state: SheetDataState;
  data: T[];
  retry: () => void;
}

export function useSheetData<T>(fetcher: () => Promise<T[]>): SheetData<T> {
  const [state, setState] = useState<SheetDataState>('loading');
  const [data, setData] = useState<T[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    setState('loading');
    fetcher()
      .then((rows) => {
        if (!active) return;
        setData(rows);
        setState(rows.length === 0 ? 'empty' : 'ready');
      })
      .catch(() => {
        if (!active) return;
        setData([]);
        setState('error');
      });
    return () => {
      active = false;
    };
  }, [refresh]);

  const retry = useCallback(() => {
    setRefresh((n) => n + 1);
  }, []);

  return { state, data, retry };
}
