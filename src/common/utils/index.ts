import Cookies from 'universal-cookie';

export const setCookies = (key: string, value: string, expireIn: number) => {
  const cookies = new Cookies();
  cookies.set(key, value, {
    path: '/',
    expires: new Date(expireIn)
  });
};

export const removeCookies = (key: string) => {
  const cookies = new Cookies();

  cookies.remove(key);
};

export const timestampToDate = (timestamp: number): string => {
  console.log(typeof timestamp);
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return formattedDate;
};
