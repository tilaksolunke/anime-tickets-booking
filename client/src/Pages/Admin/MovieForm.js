import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../Components/Button";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/loadersSlice";
import { AddMovie, updateMovie } from "../../apiintegrations/movies";
import moment from "moment";

function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddMovie(values);
      } else {
        response = await updateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
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
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Anime Name" name="title">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Anime Synopsis" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Duration (Min)" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="Subbed">Subbed</option>
                <option value="Dubbed">Dubbed</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Anime Release Date" name="releaseDate">
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <select name="" id="">
                <option value="">Select Genre</option>
                <option value="Shonen">Shonen</option>
                <option value="Seinen">Seinen</option>
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mecha">Mecha</option>
                <option value="Isekai">Isekai</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item label="Poster URL" name="poster">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          <Button
            title="Cancle"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
            }}
          />
          <Button title="Save" type="Submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;
