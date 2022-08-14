import TableBody from "./TableBody";

const HotelChainTable = ({
  data,
  onDeleteHotelChain,
  onEditHotelChain,
  onShowRelatedHotels,
}) => {
  return (
    <div className="table-responsive responsiveTable">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Number Of Hotels</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((hotelChain, index) => {
            return (
              <TableBody
                key={index}
                data={hotelChain}
                num={index + 1}
                onDeleteHotelChain={onDeleteHotelChain}
                onEditHotelChain={onEditHotelChain}
                onShowRelatedHotels={onShowRelatedHotels}
              ></TableBody>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HotelChainTable;
