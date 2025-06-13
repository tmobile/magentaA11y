// src/hooks/useClipboard.ts
import { useState, useEffect } from 'react';

export function useClipboard() {
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  /**
   * Copies the given content to the clipboard and updates the state.
   */
  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(content);
    } catch (err) {
      console.error('Failed to copy content: ', err);
    }
  };

  /**
   * Checks if the given content is currently in the clipboard.
   */
  const isContentInClipboard = async (content: string) => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      return clipboardText === content;
    } catch (err) {
      console.error('Failed to read clipboard content: ', err);
      return false;
    }
  };

  /**
   * Automatically clears copied content if it's no longer in the clipboard.
   * Runs an interval every 3 seconds to verify if the copied content is still present.
   */
  useEffect(() => {
    if (!copiedContent) return;

    const interval = setInterval(async () => {
      const isStillInClipboard = await isContentInClipboard(copiedContent);
      if (!isStillInClipboard) {
        setCopiedContent(null);
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [copiedContent]); // Runs whenever `copiedContent` changes

  return {
    copiedContent,
    copyToClipboard,
    isContentInClipboard,
    setCopiedContent,
  };
}
