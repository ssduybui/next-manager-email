export const getAccessToken = (): string => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('_jwtToken');
    return token ? token : '';
  }

  return '';
};

export const setAccessToken = (ids: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('_jwtToken', ids);
  }
};

export const removeAccessToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('_jwtToken');
  }
};