import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import TheaterForm from "./TheaterForm";
import {
  DeleteTheater,
  GetAllTheatersByOwner,
} from "../../apiintegrations/theaters";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/loadersSlice";
import { message, Table } from "antd";
import Shows from "./Shows";

function TheatersList() {
  const { user } = useSelector((state) => state.users);
  const [showTheaterFormModal = false, setShowTheaterFormModal] =
    useState(false);
  const [selectedTheater = null, setSelectedTheater] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theaters = [], setTheaters] = useState([]);

  const [openShowsModal = false, setOpenShowsModal] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatersByOwner({
        owner: user._id,
      });
      if (response.success) {
        setTheaters(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteTheater({ theaterId: id });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
            <i
              class="ri-delete-bin-5-fill"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              class="ri-edit-2-fill"
              onClick={() => {
                setFormType("edit");
                setSelectedTheater(record);
                setShowTheaterFormModal(true);
              }}
            ></i>

            {record.isActive && (
              <span
                className="underline"
                onClick={() => {
                  setSelectedTheater(record);
                  setOpenShowsModal(true);
                }}
              >
                Shows
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          title="Add Theater"
          onClick={() => {
            setFormType("add");
            setShowTheaterFormModal(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={theaters} />

      {showTheaterFormModal && (
        <TheaterForm
          showTheaterFormModal={showTheaterFormModal}
          setShowTheaterFormModal={setShowTheaterFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
        />
      )}

      {openShowsModal && <Shows 
      openShowsModal={openShowsModal}
      setOpenShowsModal={setOpenShowsModal}
      theater={selectedTheater}
      />}
    </div>
  );
}

export default TheatersList;
