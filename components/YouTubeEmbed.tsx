import React from 'react';

interface YouTubeEmbedProps {
  url?: string;
  title?: string;
  caption?: string;
  startTime?: number;
  stopTime?: number;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  url = '', 
  title, 
  caption, 
  startTime = 0, 
  stopTime 
}) => {
  // Safely extract YouTube video ID
  const getYouTubeId = (videoUrl: string) => {
    if (!videoUrl) return null;
    
    const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    // Optionally log the error or return null
    console.warn('Invalid or missing YouTube URL', { url });
    return null;
  }

  // Construct the embed URL with optional start and end times
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  if (startTime) embedUrl.searchParams.set('start', Math.max(0, startTime).toString());
  if (stopTime) embedUrl.searchParams.set('end', stopTime.toString());

  return (
    <div className="my-6 space-y-2">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="relative w-full aspect-video">
        <iframe
          src={embedUrl.toString()}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        /> 
      </div>
      {caption && <p className="text-center text-sm text-gray-600 mt-2">{caption}</p>}
    </div>
  );
};