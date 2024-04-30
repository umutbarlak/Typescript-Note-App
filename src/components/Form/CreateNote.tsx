import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;

const CreateNote = ({
  createTag,
  availableTags,
  onSubmit,
  tags,
}: CreateNoteProps) => {
  return (
    <div className=" container py-5">
      <h2>Yeni Not Oluştur</h2>
      <NoteForm
        onSubmit={onSubmit}
        createTag={createTag}
        availableTags={availableTags}
        tags={tags}
      />
    </div>
  );
};

export default CreateNote;
