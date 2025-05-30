export { getImageColor, getAverageColor } from './color';
export { generateCron, CronType } from './cron';
export { request, getCloudInstance } from './request';

export const getGlobalData = (key: keyof IAppOption['globalData']) => {
  return getApp().globalData?.[key];
};

export const setGlobalData = (
  key: keyof IAppOption['globalData'],
  value: any,
) => {
  const { globalData } = getApp();
  if (globalData) globalData[key] = value;
};

export const noop = () => {};

export const random = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const safeJSONParse = <T>(
  str: string,
  defaultValue?: T,
): T | undefined => {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.log(err);
    return defaultValue;
  }
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : '0' + s;
};

export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const removeProtocol = (domain?: string) => {
  return domain ? domain.replace(/^https?\:\/\//, '') : '';
};

export const isPrivateDomain = (domain: string = '') => {
  const ip = removeProtocol(domain).split(':')[0];

  if (/^local\./.test(ip) || /\.local$/.test(ip)) {
    return true;
  }

  const privateIPRegex =
    /^(?:10(?:\.\d{1,3}){3}|172\.(?:1[6-9]|2[0-9]|3[0-1])(?:\.\d{1,3}){2}|192\.168(?:\.\d{1,3}){2})$/;
  return privateIPRegex.test(ip);
};

export const sleep = (time?: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), time);
  });
};

export const parseAuthUrl = (url: string = '') => {
  const values = url.trim().replace(/\/$/, '').split('@');
  if (values.length <= 1) {
    const domain = values[0];
    const isPrivate = isPrivateDomain(domain);
    return {
      domain,
      [isPrivate ? 'privateDomain' : 'publicDomain']: domain,
    };
  }
  const [account, domain] = values;
  const [username, password] = account.split(':');
  const isPrivate = isPrivateDomain(domain);
  return {
    domain,
    [isPrivate ? 'privateDomain' : 'publicDomain']: domain,
    auth: !!username && !!password,
    username,
    password,
  };
};
