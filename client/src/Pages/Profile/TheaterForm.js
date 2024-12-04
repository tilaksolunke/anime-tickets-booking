import { Modal, Form, message } from "antd";
import React from "react";
import Button from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/loadersSlice";
import { AddTheater, UpdateTheater } from "../../apiintegrations/theaters";

function TheaterForm({
  showTheaterFormModal,
  setShowTheaterFormModal,
  formType,
  setFormType,
  selectedTheater,
  setSelectedTheater,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheater(values);
      } else {
        values.theaterId = selectedTheater._id;
        response = await UpdateTheater(values);
      }
      if (response.success) {
        message.success(response.message);
        setShowTheaterFormModal(false);
        setSelectedTheater(null);
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
  return (
    <Modal
      title={formType === "add" ? "Add Theater" : "Edit Theater"}
      open={showTheaterFormModal}
      onCancel={() => {
        setShowTheaterFormModal(false);
        setSelectedTheater(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheater}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the theater name!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please enter the theater address!" },
          ]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter the phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the theater email!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <div className="flex justify-end gap-1">
          <Button
            title="Cancle"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheaterFormModal(false);
              setSelectedTheater(null);
            }}
          />
          <Button title="Save" type="Submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheaterForm;
