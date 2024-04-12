interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mr-2">
      #{hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
    </span>
  );
};

export default Hashtag;
