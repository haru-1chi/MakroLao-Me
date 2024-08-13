export const formatDate = (date, locale = 'th-TH') => {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);
  const [weekday, day, month, year, time] = formattedDate.split(' ');
  const [hour, minute] = time.split(':');

  return `${weekday} ${day} ${month} ${parseInt(year)} ${hour}.${minute}`;
};

export const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes}`;
};

export const convertTHBtoLAK = (thbAmount) => {
  const exchangeRate = 629.77;
  return thbAmount * exchangeRate;
}