"use client";

import React, { useEffect, useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogProgressShareProps {
  title: string;
  url: string;
}

const BlogProgressShare: React.FC<BlogProgressShareProps> = ({ title, url }) => {
  const [readProgress, setReadProgress] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    const calculateReadProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setReadProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', calculateReadProgress);
    return () => window.removeEventListener('scroll', calculateReadProgress);
  }, []);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Share buttons */}
      <div className="fixed right-4 top-24 hidden lg:flex flex-col gap-4">
        <div className="relative">
          <button
            onClick={() => setShowShareTooltip(!showShareTooltip)}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>

          {/* Share tooltip */}
          <div className={cn(
            "absolute right-12 top-0 bg-white shadow-lg rounded-lg p-2 transition-all duration-200",
            showShareTooltip ? "opacity-100 visible" : "opacity-0 invisible"
          )}>
            <div className="flex flex-col gap-2">
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
              >
                <Twitter className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
              >
                <Linkedin className="w-4 h-4 text-gray-600" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
              >
                <Facebook className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Facebook</span>
              </a>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
              >
                <LinkIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Copy link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogProgressShare;