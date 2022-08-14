import React, { useEffect, useState } from "react";
import "./Ranking.scss";
import HotelCard from "../hotelCard/HotelCard";
import Fade from "react-reveal/Fade";
import { Form, Field } from "@availity/form";
import { Button, Label, FormGroup } from "reactstrap";
import * as yup from "yup";

import Multiselect from "multiselect-react-dropdown";
import { hotelData } from "../../data/hotelData";
import { hotelChainData } from "./../../data/hotelData";
import MapInfo from "../helpers/Table/MapInfo";
import {
  computeRanking,
  fetchHotelChainsFromStore,
  fetchHotelsFromStore,
  removeHotelsFromStore,
  sortHotel,
  storeHotelChainsInStore,
  storeHotelsInStore,
} from "../../helper/data.service";

const Ranking = () => {
  const [hotels, setHotels] = useState(hotelData);
  const [filteredHotels, setFilteredHotels] = useState(hotelData);
  const [hotelChains, setHotelChains]: any = useState([]);
  const initalValue = {
    hotelName: "",
    city: "",
    address: "",
    country: "",
    hotelChain: "",
    ranking: 0,
    imageUrl: "",
    id: "",
  };
  const initialHotelValue = {
    id: "",
    Country: "",
    Image: "",
    Name: "",
    Address: "",
    City: "",
    Ranking: 0,
    HotelChain: "",
  };
  const [isEditing, setIsEditing] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [hotelChain, setHotelChain] = useState("");
  let [ranking, setRanking] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [hotelId, setHotelId] = useState("");
  let closeButton: any = {};
  let hotelModal: any = {};
  let hotelLocationModal: any = {};

  const [formValue, setFormValue] = useState(initalValue);
  const [options, setOptions]: any[] = useState([]);
  let selectedValue = "";

  useEffect(() => {
    const data = fetchHotelChainsFromStore();
    let hotelChainDataArray: any[] = [];
    if (data) {
      hotelChainDataArray = JSON.parse(data);
    } else {
      hotelChainDataArray = hotelChainData;
      storeHotelChainsInStore(JSON.stringify(hotelChainDataArray));
    }
    setHotelChains(hotelChainDataArray);
    setOptions(hotelChainDataArray.map((x) => ({ name: x.Name, id: x.Id })));

    const hotelsStoredData = fetchHotelsFromStore();
    if (hotelsStoredData) {
      setHotels(JSON.parse(hotelsStoredData));
      setFilteredHotels(JSON.parse(hotelsStoredData).sort(sortHotel));
    }
  }, []);

  useEffect(() => {
    updateHotelStore();
  });

  const updateHotelStore = () => {
    const data = fetchHotelsFromStore();
    if (data) {
      removeHotelsFromStore();
    }
    setTimeout(() => {
      storeHotelsInStore(JSON.stringify(hotels));
    }, 50);
  };

  useEffect(() => {
    setRanking(ranking);
  }, [ranking, hotels, filteredHotels]);

  const onSelect = (selectedList, selectedItem) => {
    filterHotels(selectedList);
  };
  const onRemove = (selectedList, removedItem) => {
    filterHotels(selectedList);
  };
  const onEditHotel = (e, hotelId) => {
    const event = e || window.event;
    event.preventDefault();
    const hotel = hotels.find((x) => x.id == hotelId);
    setIsEditing(true);
    if (hotel) {
      updateProperties(hotel);
      setFormValue({
        hotelName: hotel.Name,
        city: hotel.City,
        address: hotel.Address,
        country: hotel.Country,
        hotelChain: hotel.HotelChain,
        ranking: 0,
        imageUrl: hotel.Image,
        id: hotel.id,
      });
      setHotelChain(hotel.HotelChainId);
    }
    hotelModal.click();
  };
  const onShowHotelLocation = (e, hotelId) => {
    const event = e || window.event;
    event.preventDefault();
    const hotel = hotels.find((x) => x.id == hotelId);
    if (hotel) {
    }
    hotelLocationModal.click();
  };
  const onDeleteHotel = (e, hotelIdToDelete) => {
    const event = e || window.event;
    event.preventDefault();
    let editHotelItem = hotels.find((x) => x.id == hotelIdToDelete);
    if (editHotelItem) {
      const index = hotels.indexOf(editHotelItem);
      hotels.splice(index, 1);
      setHotels([...hotels]);
      setFilteredHotels([...hotels].sort(sortHotel));
    }
  };
  const handleSubmit = (values, form) => {
    const hotelChainSelected = options.find((x) => x.id == hotelChain);
    if (!isEditing) {
      let existingHotels = [...hotels];
      let ranksToAdjust = existingHotels.filter((x) => x.Ranking >= ranking);
      ranksToAdjust.forEach((hotel) => {
        hotel.Ranking += 1;
      });
      const newValue = {
        id: (Math.random() + 1).toString(36).substring(7),
        Country: country,
        Image: imageUrl,
        Name: hotelName,
        Address: address,
        Ranking: ranking ? ranking : 1,
        HotelChain: hotelChainSelected?.name,
        City: city,
        HotelChainId: hotelChainSelected?.id,
      };
      setHotels([...existingHotels, newValue]);
      setFilteredHotels([...existingHotels, newValue].sort(sortHotel));
    } else {
      let existingHotels = [...hotels];

      let editHotelItem = existingHotels.find((x) => x.id == hotelId);
      if (editHotelItem) {
        const index = existingHotels.indexOf(editHotelItem);
        editHotelItem.Ranking = computeRanking(
          editHotelItem,
          existingHotels,
          ranking
        );
        editHotelItem.Address = address;
        editHotelItem.Name = hotelName;
        editHotelItem.City = city;
        editHotelItem.Country = country;
        editHotelItem.Image = imageUrl;
        editHotelItem.HotelChain = hotelChainSelected?.name;
        editHotelItem.HotelChainId = hotelChainSelected?.id;
        existingHotels[index] = editHotelItem;
        setHotels(existingHotels);
        setFilteredHotels(existingHotels.sort(sortHotel));
      }
    }
    form.resetForm();
    closeButton.click();
  };
  const updateProperties = (value: any) => {
    setHotelName(value.Name);
    setCity(value.City);
    setAddress(value.Address);
    setCountry(value.Country);
    setHotelChain(value.HotelChain);
    setRanking(value.Ranking);
    setImageUrl(value.Image);
    setHotelId(value.id);
  };
  const filterHotels = (selectedItems: any[]) => {
    if (selectedItems.length) {
      let hotelChainIds = selectedItems.map((x) => x.id);
      let filteredValues = hotels.filter((x) =>
        hotelChainIds.includes(x.HotelChainId)
      );
      setFilteredHotels(filteredValues.sort(sortHotel));
    } else {
      setFilteredHotels(hotels.sort(sortHotel));
    }
  };

  return (
    <div className="ranking-container">
      <div className="filter-menu">
        <div className="container">
          <div className="row">
            <div className="col-md-2 center-item">Hotel Chain</div>
            <div className="col-md-3">
              <Multiselect
                className="mt-2 mb-2"
                options={options}
                selectedValues={selectedValue}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
              />
            </div>
            <div className="offset-md-5 col-md-2">
              <button
                className="btn btn-primary mt-2 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#newHotelModal"
                onClick={() => {
                  setFormValue(initalValue);
                  setIsEditing(false);
                  updateProperties(initialHotelValue);
                }}
              >
                Add Hotel
              </button>
              <button
                style={{ visibility: "hidden" }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#newHotelModal"
                ref={(button) => (hotelModal = button)}
              ></button>
              <button
                style={{ visibility: "hidden" }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#locationModal"
                ref={(button) => (hotelLocationModal = button)}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="rankingContent">
        {filteredHotels.map((hotel) => {
          return (
            <HotelCard
              movie={hotel}
              onEditHotel={onEditHotel}
              onDeleteHotel={onDeleteHotel}
              onShowHotelLocation={onShowHotelLocation}
            />
          );
        })}
      </div>

      <div
        className="modal fade"
        id="newHotelModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="newHotelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newHotelModalLabel">
                {isEditing ? "Edit Hotel" : "New Hotel"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form
                initialValues={formValue}
                onSubmit={(values, k) => handleSubmit(values, k)}
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <Field type="hidden" value={hotelId} name="id" />
                    <Label className="form-label">Hotel Name</Label>
                    <Field
                      type="text"
                      className="form-control"
                      id="hotelName"
                      name="hotelName"
                      value={hotelName}
                      onChange={(e) => {
                        setHotelName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Label className="form-label">City</Label>
                    <Field
                      type="text"
                      className="form-control"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Label className="form-label">Address</Label>
                    <Field
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Label className="form-label">Country</Label>
                    <Field
                      name="country"
                      type="text"
                      className="form-control"
                      id="country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Hotel Chain</label>
                    <select
                      id="hotelChain"
                      name="hotelChain"
                      className="form-select"
                      value={hotelChain}
                      onChange={(e) => {
                        setHotelChain(e.target.value);
                      }}
                    >
                      <option value="">No selection</option>
                      {options.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Ranking</label>
                    <select
                      id="ranking"
                      name="ranking"
                      className="form-select"
                      value={ranking}
                      onChange={(e) => {
                        setRanking(parseInt(e.target.value));
                        ranking = parseInt(e.target.value);
                      }}
                    >
                      {hotels.map((item, index) => (
                        <option value={index + 1}>{index + 1}</option>
                      ))}
                      {!isEditing && (
                        <option value={hotels.length + 1}>Last</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-12">
                    <Label className="form-label">Image URL</Label>
                    <Field
                      type="text"
                      className="form-control"
                      id="imageUrl"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={(button) => (closeButton = button)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="locationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="locationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="locationModalLabel">
                Location
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body map-body">
              <MapInfo />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
