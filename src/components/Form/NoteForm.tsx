import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { CreateNoteProps } from "./CreateNote";
import { Tag } from "../../types";
import { v4, validate } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  createTag,
  availableTags,
  onSubmit,
  title = "",
  tags = [],
  markdown,
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className=" shadow"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                value={selectedTags?.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags?.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
                onChange={(note_tags) =>
                  setSelectedTags(
                    note_tags?.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };

                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                className=" shadow text-black"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown" className="my-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            defaultValue={markdown}
            style={{ minHeight: "300px" }}
            as={"textarea"}
            className=" shadow"
            ref={markDownRef}
            required
          ></Form.Control>
        </Form.Group>

        <div className=" d-flex justify-content-end gap-2">
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            type="button"
          >
            İptal
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default NoteForm;
