import { Heading } from "./shared/Heading";
import { Button, Card, CardGroup, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmbeddingWizard from "./embedding/EmbeddingWizard";
import { useState } from "react";

export const AccountPage = ({
  myRegionIds = [
    "60e8b3ff73d1e45df9f9bf0e",
    "60e8b44273d1e4a2cef9bf12",
    "60e8c26d32e57e89a4f33945",
  ],
}) => {
  const regions = useSelector((state) => state.data.regionData);
  const [showEmbeddingDialog, setShowEmbeddingDialog] = useState(false);
  const myRegions = myRegionIds
    .map((id) => regions.find((r) => r._id === id))
    .filter((r) => r);
  return (
    <Col>
      <Heading size={"h1"} text={"Accountverwaltung"} />
      <Heading size={"h4"} text={"Mein Account"} />
      <Row>
        <Form.Group controlId={"userEmail"} as={Col}>
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type={"email"} placeholder={"Ihre E-Mail"} disabled />
        </Form.Group>

        <Form.Group controlId={"userEmail"} as={Col}>
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            disabled
            type={"password"}
            placeholder={"Ihr Passwort"}
          />
        </Form.Group>
      </Row>
      <Form.Group>
        <Button>Daten ändern</Button>
      </Form.Group>
      <Row className={"mt-3"}>
        <Col>
          <div className={"mb-2"}>
            <Heading size={"h4"} text={"Verknüpfte Regionen"} />
          </div>
          <CardGroup>
            {myRegions.length > 0 ? (
              myRegions.map((r) => {
                const maxPostalcodes = 3;
                return (
                  <Card key={r._id} className={"m-1"}>
                    <Card.Header>NRW</Card.Header>
                    <Card.Body>
                      <Card.Title>{r.name}</Card.Title>
                      {/*<Card.Subtitle>{r._id}</Card.Subtitle>*/}
                      <Card.Text>
                        Postleitzahlbereiche:
                        <div>
                          {r.postalcodes
                            .slice(0, maxPostalcodes)
                            .map((code) => (
                              <small key={code}>{code + ", "}</small>
                            ))}
                          {r.postalcodes.length > maxPostalcodes && "..."}
                        </div>
                      </Card.Text>
                      <Button size={"sm"}>
                        <Link className={"navbar"} to={`/result/${r._id}`}>
                          Bearbeiten
                        </Link>
                      </Button>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Zuletzt aktualisiert: 01.06.2021
                      </small>
                    </Card.Footer>
                  </Card>
                );
              })
            ) : (
              <p className={"mt-1"}>
                Bislang sind keine Regionen mit Ihrem Account verknüpft.
              </p>
            )}
          </CardGroup>
        </Col>
      </Row>
      <Row className={"mt-3"}>
        <Col>
          <Heading size={"h4"} text={"Einbettung"} />
          <p className={"mt-2"}>
            Sie können einzelne Elemente oder Diagramme aus dem Klimacheck in
            Ihre eigene Website einbinden.
          </p>
          <Button className={""} onClick={() => setShowEmbeddingDialog(true)}>
            {"Einbettung konfigurieren"}
          </Button>
        </Col>
      </Row>

      <EmbeddingWizard
        regions={regions}
        open={showEmbeddingDialog}
        onClose={() => {
          setShowEmbeddingDialog(false);
        }}
      />
    </Col>
  );
};
