"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { MAX_FILE_SIZE } from "../(constants)";

interface IJsonUploader {
  onJsonLoad: (data: any) => void;
}

const JsonUploader: FC<IJsonUploader> = ({ onJsonLoad }) => {
  const [jsonName, setJsonName] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  const handleJsonUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonFile = event.target.files?.[0];

    if (jsonFile) {
      const jsonSize = jsonFile.size / 1024 / 1024;
      if (jsonSize > MAX_FILE_SIZE) {
        alert(`Limit file size is ${MAX_FILE_SIZE} MB`);
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const parsedJson = JSON.parse(event.target?.result as string);
          setJsonName(jsonFile.name);
          onJsonLoad(parsedJson);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
      fileReader.readAsText(jsonFile);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={hiddenFileInput}
        onChange={handleJsonUpload}
      />
      <button
        className="text-white w-full max-w-md px-4 py-2 bg-blue-500 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        onClick={handleClick}
      >
        Upload JSON file
      </button>
      {jsonName && (
        <h3 className="text-center mt-3 text-[blue]">File name: {jsonName}</h3>
      )}
    </div>
  );
};
export default JsonUploader;
