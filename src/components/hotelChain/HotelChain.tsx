import Fade from "react-reveal/Fade";
import { Form, Field } from "@availity/form";
import { Button, Label, FormGroup } from "reactstrap";
import "./HotelChain.scss";
import { useEffect, useState } from "react";
import HotelChainTable from "../helpers/Table/HotelChainTable";
import { hotelChainData } from "../../data/hotelData";
import {
  fetchHotelChainsFromStore,
  fetchHotelsFromStore,
  removeHotelChainsFromStore,
  storeHotelChainsInStore,
} from "./../../helper/data.service";

const HotelChain = () => {
  const [hotelChainsArray, setHotelChainsArray] = useState(hotelChainData);
  const [relatedHotels, setRelatedHotels]: any[] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let hotelChainModal: any = {};
  let relatedHotelModal: any = {};
  let closeButton: any = {};

  useEffect(() => {
    const data = fetchHotelChainsFromStore();
    if (data) {
      setHotelChainsArray(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    updateHotelChainStore();
  });

  const updateHotelChainStore = () => {
    const data = fetchHotelChainsFromStore();
    if (data) {
      removeHotelChainsFromStore();
    }
    setTimeout(() => {
      storeHotelChainsInStore(JSON.stringify(hotelChainsArray));
    }, 50);
  };

  const onEditHotelChain = (e, hotelChainId) => {
    const event = e || window.event;
    event.preventDefault();
    const hotel = hotelChainsArray.find((x) => x.Id == hotelChainId);
    setIsEditing(true);
    if (hotel) {
      setName(hotel.Name);
      setAddress(hotel.Address);
      setId(hotel.Id);
    }
    hotelChainModal.click();
  };
  const onShowRelatedHotels = (e, hotelChainId) => {
    const event = e || window.event;
    event.preventDefault();
    setRelatedHotels([]);
    const hotelsData = fetchHotelsFromStore();
    if (hotelsData) {
      let hotels = JSON.parse(hotelsData);
      let relatedHotels = hotels.filter((x) => x.HotelChainId == hotelChainId);
      setRelatedHotels(relatedHotels);
    }

    relatedHotelModal.click();
  };
  const onDeleteHotelChain = (e, hotelChainIdToDelete) => {
    const event = e || window.event;
    event.preventDefault();
    let editHotelItem = hotelChainsArray.find(
      (x) => x.Id == hotelChainIdToDelete
    );
    if (editHotelItem) {
      const index = hotelChainsArray.indexOf(editHotelItem);
      hotelChainsArray.splice(index, 1);
      setHotelChainsArray([...hotelChainsArray]);
      updateHotelChainStore();
    }
  };
  const handleSubmit = (values, form) => {
    if (!isEditing) {
      setHotelChainsArray((prevHotels) => [
        ...prevHotels,
        {
          Name: name,
          Address: address,
          NumberOfHotels: 0,
          Id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    } else {
      let existingHotels = [...hotelChainsArray];
      let editHotelItem = existingHotels.find((x) => x.Id == id);
      if (editHotelItem) {
        const index = existingHotels.indexOf(editHotelItem);
        editHotelItem.Address = address;
        editHotelItem.Name = name;
        existingHotels[index] = editHotelItem;
        setHotelChainsArray(existingHotels);
      }
    }
    updateHotelChainStore();
    form.resetForm();
    resetFields();
    closeButton.click();
  };
  const resetFields = () => {
    setName("");
    setAddress("");
    setId("");
  };
  return (
    <>
      <div className="hotelChain-container">
        <div className="action-menu">
          <div className="container">
            <div className="row">
              <div className="col-md-2 center-item">Hotel Chain</div>
              <div className="offset-md-5 col-md-2">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#hotelChainModal"
                >
                  Add Hotel Chain
                </button>
                <button
                  style={{ visibility: "hidden" }}
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#hotelChainModal"
                  ref={(button) => (hotelChainModal = button)}
                ></button>
                <button
                  style={{ visibility: "hidden" }}
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#relatedHotels"
                  ref={(button) => (relatedHotelModal = button)}
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div className="hotelChainContent container">
          <HotelChainTable
            data={hotelChainsArray}
            onDeleteHotelChain={onDeleteHotelChain}
            onEditHotelChain={onEditHotelChain}
            onShowRelatedHotels={onShowRelatedHotels}
          ></HotelChainTable>
        </div>
      </div>

      <div
        className="modal fade"
        id="hotelChainModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="hotelChainModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="hotelChainModalLabel">
                {!isEditing ? "New Hotel Chain" : "Edit Hotel Chain"}
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
                initialValues={{
                  Name: "",
                  Address: "",
                }}
                onSubmit={(values, form) => handleSubmit(values, form)}
                // validationSchema={yup.object({
                //   hotelName: yup.string().required(),
                //   city: yup.string().required(),
                //   address: yup.string().required(),
                //   country: yup.string().required(),
                //   hotelChain: yup.string(),
                //   imageUrl: yup.string(),
                // })}
              >
                <div className="row g-3">
                  <div className="col-md-12">
                    <Field type="hidden" value={id} name="id" />
                    <Label className="form-label">Hotel Name</Label>
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
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
        id="relatedHotels"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="relatedHotelsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="relatedHotelsLabel">
                Related Hotels
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Hotel Name</th>
                      <th scope="col">City</th>
                      <th scope="col">Address</th>
                      <th scope="col">Country</th>
                      <th scope="col">Hotel Chain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedHotels &&
                      relatedHotels.map((hotel, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{hotel.Name}</td>
                            <td>{hotel.City}</td>
                            <td>{hotel.Address}</td>
                            <td>{hotel.Country}</td>
                            <td>{hotel.HotelChain}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
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
    </>
  );
};

export default HotelChain;
