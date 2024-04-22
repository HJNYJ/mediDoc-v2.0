interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <div className="justify-center items-center mr-1 bg-bluegray rounded-3xl mb-2">
      <span className="text-gray-800 regular-12 flex-wrap relative flex px-2 py-1">
        #{hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
      </span>
    </div>
  );
};

export default Hashtag;
