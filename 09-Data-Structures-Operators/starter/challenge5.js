'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

console.log(flights);

for (const flight of flights.split('+')) {
  const [activity, from, to, time] = flight.split(';');
  let msg = '';
  const delay = activity.includes('Delayed') ? `🤬 ` : ``;
  msg += `${delay}${activity.replaceAll('_', ' ').trim()} `;
  msg += `from ${from.slice(0, 3).toUpperCase()} `;
  msg += `to ${to.slice(0, 3).toUpperCase()} `;
  msg += `(${time.replace(':', 'h')})`;
  console.log(msg.padStart(45));
}
