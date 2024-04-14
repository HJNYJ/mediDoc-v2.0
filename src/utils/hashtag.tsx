interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <span className="bg-gray-100 text-gray-800 rounded-md mr-2 ml-2">
      {hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
    </span>
  );
};

export default Hashtag;
