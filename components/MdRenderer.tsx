import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from '@uiw/react-md-editor';
import React from 'react';

const MDRenderer: React.FC<{
  source: string
}> = ({ source }) => {
  return (
    <>
      <MDEditor.Markdown source={source} />
    </>
  )
}

export default MDRenderer
