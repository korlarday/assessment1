import React from 'react';
import './Ranking.scss';
import HotelCard from '../hotelCard/HotelCard';
import Fade from 'react-reveal/Fade'

const Ranking = () => {
    const hotel = { 
        id: '1829832', 
        Country: 'Nigeria', 
        Image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768', 
        Name: 'Philemon Hotel', 
        Address: 'No 123, JKE street' }
    const hotel1 = { 
        id: '1829832', 
        Country: 'Nigeria', 
        Image: 'https://pix8.agoda.net/hotelImages/124/1246280/1246280_16061017110043391703.jpg?ca=6&ce=1&s=1024x768', 
        Name: 'Philemon Hotel', 
        Address: 'No 123, JKE street' }
    return (
        <div className='ranking-container'>
            <div className="rankingContent">
            <Fade>
                <HotelCard movie={hotel} />
                <HotelCard movie={hotel1} />
                <HotelCard movie={hotel} />
                <HotelCard movie={hotel} />
            </Fade>
            </div>
        </div>
    )
}

export default Ranking;