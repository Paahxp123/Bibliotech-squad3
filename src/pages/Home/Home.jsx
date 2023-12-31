import { useEffect, useState } from "react";
import { Badge, Card, Container } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase/config";
import "./Home.css";

export function Home() {
  // Context do dark theme
  const [pendentes, setPendentes] = useState([]);
  const [entregues, setEntregues] = useState([]);
  const [totalLivros, setTotalLivros] = useState();

  useEffect(() => {
    const pendentesRef = query(
      collection(db, "emprestimos"),
      where("status", "==", "Pendente")
    );
    getDocs(pendentesRef).then((snapshot) => {
      const pend = [];
      snapshot.forEach((doc) => {
        pend.push({ ...doc.data(), id: doc.id });
      });
      setPendentes(pend.length);
    });

    const entregueRef = query(
      collection(db, "emprestimos"),
      where("status", "==", "Entregue")
    );
    getDocs(entregueRef).then((snapshot) => {
      const entr = [];
      snapshot.forEach((doc) => {
        entr.push({ ...doc.data(), id: doc.id });
      });
      setEntregues(entr.length);
    });

    const livrosRef = query(collection(db, "livros"));
    getDocs(livrosRef).then((snapshot) => {
      const livros = [];
      snapshot.forEach((doc) => {
        livros.push({ ...doc.data(), id: doc.id });
      });
      setTotalLivros(livros.length);
    });
  }, []);

  return (
    <Container className="home">
      <h1>Visão Geral</h1>
      <hr />
      <div className="d-flex justify-content-center mt-5">
        <Card className="me-2" border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Total de emprestimos</Card.Title>
            <Card.Text>
              <h1 className="text-success">{pendentes + entregues}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="me-2" border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Total de livros</Card.Title>
            <Card.Text>
              <h1 className="text-success">{totalLivros}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Total de emprestimos</Card.Title>
            <Card.Text className="d-flex text-center mb-1">
              <h1 className="text-warning">{pendentes}</h1>
              <h5 className="ms-2 mt-2">
                <Badge bg="warning">Pendentes</Badge>
              </h5>
            </Card.Text>
            <Card.Text className="d-flex text-center mb-1">
              <h1 className="text-success">{entregues}</h1>
              <h5 className="ms-2 mt-2">
                <Badge bg="success">Devolvidos</Badge>
              </h5>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
