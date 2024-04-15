interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <span className="text-gray-800 bg-gray-200 rounded-xl mr-2 ml-2">
      {hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
    </span>
  );
};

export default Hashtag;
