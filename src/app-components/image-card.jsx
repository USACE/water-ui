export default function ImageCard({ title, imgSrc, text }) {
  return (
    <div className="overflow-hidden rounded bg-white shadow-lg md:max-w-sm">
      <img
        className="max-h-48 w-full overflow-hidden object-cover"
        src={imgSrc}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">
          {text ||
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'}
        </p>
      </div>
    </div>
  );
}
