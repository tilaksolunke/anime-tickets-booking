import React from "react";
import PageTitle from "../../Components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatersList from "./TheatersList";

function Admin() {
  return (
    <div>
      <PageTitle title="Admin" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
          <MoviesList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theaters" key="2">
          <TheatersList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
