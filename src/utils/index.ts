/* eslint-disable no-useless-escape */
// import type { IImageProps } from '@/models';

export const getMediaFormat = (
  image: any | undefined,
  format: '' | 'small' | 'thumbnail' | 'medium' | 'large' = ''
) => {
  if (!image || !image.url || image === null) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsrKqsBwAEzQHtG38YJgAAAABJRU5ErkJggg==';
  }
  let url = image.url as any;
  if (format && image?.formats?.[format]?.url) {
    url = image?.formats?.[format]?.url;
  }
  if (!url) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsrKqsBwAEzQHtG38YJgAAAABJRU5ErkJggg==';
  }

  if (url.indexOf('https://minio.trangnguyen.edu.vn') === -1) {
    return process.env.NEXT_PUBLIC_API_URL + url;
  }
  return url;
};

export const dateFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr = `Ngày ${`00${date.getDate()}`.slice(-2)} tháng ${`00${
    date.getMonth() + 1
  }`.slice(-2)}, ${date.getFullYear()}`;
  return dateStr;
};

export const dateTimeFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr = `${`00${date.getDate()}`.slice(-2)}/${`00${
    date.getMonth() + 1
  }`.slice(-2)}/${date.getFullYear()} | `;
  return dateStr;
};

export const dateFormatString = (dt: any) => {
  const date = new Date(dt);
  const dateStr = `${`00${date.getDate()}`.slice(-2)}/${`00${
    date.getMonth() + 1
  }`.slice(-2)}/${date.getFullYear()}`;
  return dateStr;
};

export const slugToId = (slug = '') => {
  if (!slug) return '';
  const irr = String(slug).matchAll(/(.+?\-)?(\d+)$/gi);
  const arr = Array.from(irr);
  return arr?.[0]?.[2];
};

export const editContentHandle = (content = '') => {
  let newcontent = content
    ? content.replace(
        /src="\/uploads\//g,
        `src="${process.env.NEXT_PUBLIC_API_URL}/uploads/`
      )
    : '';
  newcontent = content
    ? content.replace(
        /src="\/uploads\//g,
        `src="${process.env.NEXT_PUBLIC_API_URL}/uploads/`
      )
    : '';
  return newcontent;
};

export const getMedia = (url = '') => {
  return process.env.NEXT_PUBLIC_API_URL + url;
};

export const removeVietNameseTones = (str = '') => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const isBrowser = () => {
  return typeof window !== 'undefined';
};
export const msToHMS = (ms: number) => {
  // 1- Convert to seconds:
  let seconds: any = ms / 1000;

  // 2- Extract hours:
  let hours: any = +(seconds / 3600); // 3,600 seconds in 1 hour
  seconds %= 3600; // seconds remaining after extracting hours

  // 3- Extract minutes:
  let minutes: any = +(seconds / 60); // 60 seconds in 1 minute

  // 4- Keep only seconds not extracted to minutes:
  seconds %= 60;

  // alert( hours+":"+minutes+":"+seconds);
  hours = hours < 10 ? `0${Math.floor(hours)}` : Math.floor(hours);
  minutes = minutes < 10 ? `0${Math.floor(minutes)}` : Math.floor(minutes);
  seconds = seconds < 10 ? `0${Math.floor(seconds)}` : Math.floor(seconds);
  const hms =
    hours !== '00'
      ? `${hours} giờ ${minutes} phút ${seconds} giây`
      : `${minutes} phút ${seconds} giây`;
  return hms;
};