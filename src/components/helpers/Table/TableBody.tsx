import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableBody = ({
  data: { Id, Name, Address, NumberOfHotels },
  num,
  onEditHotelChain,
  onDeleteHotelChain,
  onShowRelatedHotels,
}) => {
  return (
    <tr>
      <th scope="row">{num}</th>
      <td>{Name}</td>
      <td>{Address}</td>
      <td>{NumberOfHotels}</td>
      <td>
        <div className="dropdown">
          <button
            style={{ color: "#FFF" }}
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon="ellipsis-v" inverse />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => onEditHotelChain(e, Id)}
              >
                Edit
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => onDeleteHotelChain(e, Id)}
              >
                Delete
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => onShowRelatedHotels(e, Id)}
              >
                Show Related Hotels
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TableBody;
