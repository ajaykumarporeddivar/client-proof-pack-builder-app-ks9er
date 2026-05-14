'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for interacting with localStorage, providing SSR safety.
 *
 * @param key The key under which to store the value in localStorage.
 * @param initial The initial value to use if no value is found in localStorage or on SSR.
 * @returns A tuple containing the current value and a setter function.
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  // State to store our value. Initialize with initialValue, then update from localStorage in useEffect.
  const [storedValue, setStoredValue] = useState<T>(initial);

  // useEffect to read from localStorage only after the component mounts (client-side)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Update localStorage whenever the state changes
  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

/**
 * Custom hook for filtering a list of items based on search string and status.
 *
 * @param items The array of items to filter.
 * @param fields An array of keys (field names) to search within.
 * @returns An object containing filtered items, search string, setter for search, status, and setter for status.
 */
export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): {
  filtered: T[];
  search: string;
  setSearch: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
} {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const filtered = items.filter((item) => {
    const matchesSearch = search === '' || fields.some((field) => {
      const value = String(item[field]).toLowerCase();
      return value.includes(search.toLowerCase());
    });

    const matchesStatus = status === '' || String(item.status).toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return { filtered, search, setSearch, status, setStatus };
}

/**
 * Custom hook for managing modal state.
 *
 * @returns An object containing modal open state, open/close functions, and the active item.
 */
export function useModal<T = unknown>(): {
  isOpen: boolean;
  open: (item?: T) => void;
  close: () => void;
  activeItem: T | null;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const open = useCallback((item?: T) => {
    setActiveItem(item ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null);
  }, []);

  return { isOpen, open, close, activeItem };
}

/**
 * Custom hook for showing temporary toast messages.
 *
 * @returns An object containing message, type, visibility, and a show function.
 */
export function useDemoToast(): {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  show: (msg: string, type?: 'success' | 'error' | 'info') => void;
} {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setMessage('');
    }, 2500); // Auto-hide after 2.5 seconds
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, type, visible, show };
}