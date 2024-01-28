import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  content: string;
}

const MarkdownComponent: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  );
};

export default MarkdownComponent;
