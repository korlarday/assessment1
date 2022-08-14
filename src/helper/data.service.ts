

export const computeRanking = (editHotelItem, existingHotels, ranking) => {
    if (ranking == editHotelItem.Ranking) {
      return ranking;
    } else if (editHotelItem.Ranking > ranking) {
      let hotelsToAdjustRanking = existingHotels.filter(
        (x) => x.Ranking >= ranking
      );
      hotelsToAdjustRanking.forEach((hotel) => {
        hotel.Ranking += 1;
      });
      return ranking;
    } else {
      let hotelsToAdjustRanking = existingHotels.filter(
        (x) => x.Ranking > editHotelItem.Ranking
      );
      hotelsToAdjustRanking.forEach((hotel) => {
        hotel.Ranking -= 1;
      });
      return ranking;
    }
  };

export const sortHotel = (a, b) => {
    if (a.Ranking < b.Ranking) {
      return -1;
    }
    if (a.Ranking > b.Ranking) {
      return 1;
    }
    return 0;
  };

  export const fetchHotelChainsFromStore = () => {
    return localStorage.getItem("hotelChains");
  }
  export const fetchHotelsFromStore = () => {
    return localStorage.getItem("hotels");
  }
  export const removeHotelsFromStore = () => {
    localStorage.removeItem("hotels");
  }
  export const removeHotelChainsFromStore = () => {
    localStorage.removeItem("hotelChains");
  }
  export const storeHotelsInStore = (hotels) => {
    localStorage.setItem("hotels", hotels);
  }
  export const storeHotelChainsInStore = (hotelChainDataArray) => {
    localStorage.setItem("hotelChains", hotelChainDataArray);
  }