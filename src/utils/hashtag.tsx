interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <div className="justify-center items-center p-1 mr-3 py-1 bg-bluegray rounded-3xl">
      <span className="text-gray-800 regular-12">
        {hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
      </span>
    </div>
  );
};

export default Hashtag;
