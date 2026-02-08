import TextareaAutosize from 'react-textarea-autosize';

function JournalPage() {
  return (
    <div className="flex justify-center" >
      <TextareaAutosize className="w-150 border-2 border-solid" minRows={5} defaultValue="dear journal" />
    </div>
  );
}

export default JournalPage; 