import { BasicResponse } from '../types/apiTypes';
import { SERVER } from '../constants/config';

export const errorMessage = (error: any): string => {
  if (
    error &&
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'Message' in error.data &&
    typeof (error.data as BasicResponse).Message === 'string'
  ) {
    return (error.data as BasicResponse).Message;
  }
  return 'Something went wrong, try again later';
};

export const buildImageUri = (value?: string | null): string | null => {
  if (!value || value.toLowerCase().endsWith('.svg')) {
    return null;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${SERVER}${value}`;
};

export const formatTime = (value?: string) => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

//Example: 1 sec / 4 hour / 1 day
export const getRelativeTime = (value?: string) => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
};
