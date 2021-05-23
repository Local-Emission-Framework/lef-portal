import { Col, Row } from "react-bootstrap";
import { LefLineChart } from "../shared/charts/LefLineChart";
import React from "react";

const fakeElectionData = {
  labels: [2005, 2010, 2015],
  datasets: [
    {
      label: "SPD",
      data: [45.5, 50.5, 40.1],
    },
    { label: "Grüne", data: [10.5, 21.5, 20.4] },
  ],
};

export const AttitudeWidget = () => {
  return (
    <Col>
      <Row>
        <Col sm={12} lg={8}>
          <div style={{ width: "100%" }}>
            <LefLineChart data={fakeElectionData} />
          </div>
        </Col>
        <Col sm={12} lg={4} className={"mt-sm-2"}>
          <p
            style={{ whiteSpace: "pre-wrap" }}
          >{`Die stärkste Partei ist derzeit die SPD mit 40 Prozent.\n\nParteien mit einem inhaltlichen Schwerpunkt auf das Thema Klimawandel haben in den letzten Jahrzehnten an Bedeutung erlangt.`}</p>
        </Col>
      </Row>
    </Col>
  );
};
