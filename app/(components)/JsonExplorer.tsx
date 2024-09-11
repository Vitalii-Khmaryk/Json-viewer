"use client";
import { FC, useState } from "react";

interface IJsonExplorer {
  searchTerm: string;
  data: any;
}

const JsonExplorer: FC<IJsonExplorer> = ({ data, searchTerm }) => {
  const [openNodes, setOpenNodes] = useState<{ [key: string]: boolean }>({});

  const toggleNode = (key: string): void => {
    setOpenNodes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const matchesSearch = (key: string, value: any): boolean => {
    const keyMatches = key.toLowerCase().includes(searchTerm.toLowerCase());
    const valueMatches =
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase());
    return keyMatches || valueMatches;
  };

  const filterNodes = (data: any): boolean => {
    if (typeof data === "object") {
      return Object.keys(data).some((key) => {
        const value = data[key];
        return matchesSearch(key, value) || filterNodes(value);
      });
    }
    return false;
  };

  const renderTree = (data: any, path: string): JSX.Element => {
    if (typeof data === "object") {
      return (
        <div className="ml-[20px]">
          <div onClick={() => toggleNode(path)} className="cursor-pointer">
            {openNodes[path] ? "⮛" : "⮚"}
          </div>
          {openNodes[path] && (
            <div>
              {Object.keys(data).map((key) => {
                const value = data[key];
                const nodeMatches = filterNodes({ [key]: value });
                const nodePath = `${path}/${key}`;

                return nodeMatches ? (
                  <div className="flex" key={nodePath}>
                    <b>{key}:</b>
                    {renderTree(value, nodePath)}
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      );
    }
    return <div className="text-[#FF9800] ml-2">{data.toString()}</div>;
  };

  const hasResults = filterNodes(data);
  if (!hasResults && searchTerm) {
    return <div className="text-[red]">Nothing found</div>;
  }

  return renderTree(data, "root");
};

export default JsonExplorer;
