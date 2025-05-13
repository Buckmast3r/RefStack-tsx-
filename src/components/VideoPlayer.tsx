'use client';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <video
        controls
        poster={poster}
        className="w-full h-auto rounded-lg shadow-md"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 