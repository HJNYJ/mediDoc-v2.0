interface HashtagProps {
  hashtag: string;
}

const Hashtag = ({ hashtag }: HashtagProps) => {
  return (
    <div className="justify-center items-center mr-1 bg-bluegray rounded-3xl mb-1">
      <span className="text-gray-800 regular-12 px-2 flex-wrap py-[2px]">
        {hashtag.replace(/[\[\],_\/'"{}%&*();~`|:?!]/g, "")}
      </span>
    </div>
  );
};

export default Hashtag;
