import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import ReactMarkdown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  const props: Note = useOutletContext();

  const markdown = props.markdown;

  return (
    <div className=" container py-5 w-full ">
      <Row className=" mb-4 justify-content-between">
        <Col>
          <h2>{props.title}</h2>
          <Stack direction="horizontal" className="flex-wrap row-gap-2">
            {props.tags.map((tag) => (
              <Badge className="fs-6 me-2" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack
            direction="horizontal"
            gap={2}
            className=" justify-content-end "
          >
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>
            <Button
              onClick={() => deleteNote(props.id)}
              variant="outline-danger"
            >
              Sil
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown children={markdown} />
    </div>
  );
};

export default NoteDetail;
