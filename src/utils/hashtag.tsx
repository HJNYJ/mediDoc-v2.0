interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <span className="justify-center items-center p-1 mr-1 w-68 h-30 bg-bluegray rounded-3xl">
      <span className="text-gray-800 regular-12">
        {hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
      </span>
    </span>
  );
};

export default Hashtag;
