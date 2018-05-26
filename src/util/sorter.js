import usd from "../assets/images/usd.png";
import eur from "../assets/images/eur.png";
import gbp from "../assets/images/gbp.png";
import yen from "../assets/images/yen.png"

export const transformData = (rawData) => {
  const mapDataToObject =
    rawData.reduce((acc, curr) => {
      const accValue = acc[curr.node.date] || {
        date: curr.node.date
      };

      const currPeriod = curr.node.rate.periodOfDay.toLowerCase();

      if (currPeriod === 'morning') {
        accValue[currPeriod] = (accValue[currPeriod] || []).concat(curr)
      }
      if (currPeriod === 'afternoon') {
        accValue[currPeriod] = (accValue[currPeriod] || []).concat(curr);
      }
      if (currPeriod === 'evening') {
        accValue[currPeriod] = (accValue[currPeriod] || []).concat(curr);
      }
      acc[curr.node.date] = accValue;
      return acc;
    }, {})

  return Object.values(mapDataToObject);
}

export const sortRates = (rateObject) => {
  let reOrderedData = []
  const currOrder = ["USD", "EUR", "GBP", "YEN"]
  if (rateObject && rateObject.length > 0) {
    reOrderedData = currOrder.map(item => rateObject.find(obj => obj.node.rate.currency === item))
  }
  return reOrderedData;
}

export const loadImage = (curr) => {
  if (curr === "USD") {
    return usd
  } else if (curr === "YEN") {
    return yen
  } else if (curr === "GBP") {
    return gbp
  } else if (curr === "EUR") {
    return eur
  }
}

export const sortLocation = (data) => {
  return data.map(datum => datum.name);
}

export const transformUsers = (rawData) => {
  if (rawData.usersConnection !== null) {
    const rawDataCopy = rawData.usersConnection.edges.slice() || [];
    return rawDataCopy.reduce((acc, curr, index) => {
      const accItem = {
        id: index + 1,
        name: curr.node.name,
        username: curr.node.username,
        role: curr.node.__typename.slice(3),
        status: 'Inactive',
      }
      acc = acc.concat(accItem) || [];
      return acc;
    }, [])
  }
  return null;
}

export const locationId = (data, location) => {
  return (data.locations.find(item => item.name === location)).id;
}
