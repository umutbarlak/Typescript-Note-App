import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./Form/NoteCard";
import { Note, Tag } from "../types";
import { useMemo, useState } from "react";

export type MainProps = {
  availableTags: Tag[];
  notes: Note[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (note.title == "" ||
            note.title
              .toLocaleLowerCase()
              .includes(title.toLocaleLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => tag.id === noteTag.id)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className=" container py-5">
      <Stack direction="horizontal" className=" justify-content-between">
        <h1>Notlar</h1>
        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className=" shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                isMulti
                onChange={(tags) => {
                  setSelectedTags(
                    tags?.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                className=" shadow text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="  row-gap-3 mt-4 ">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
