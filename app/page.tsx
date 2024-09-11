'use client'
import { useState } from "react";
import JsonUploader from "./(components)/JsonUploader";
import SearchBar from "./(components)/SearchBar";
import JsonExplorer from "./(components)/JsonExplorer";

export default function Home() {
  const [jsonData,setJsonData]=useState(null);
  const [searchTerm,setSearchTerm]=useState<string>('');
  return (
   <main className="container">
    <h1 className="text-center text-2xl">JSON Explorer</h1>
    <section className="flex justify-center">
    <JsonUploader onJsonLoad={setJsonData}/>
    </section>

    {jsonData && (
      <section className="mt-4">
        <div className="flex justify-center">
        <SearchBar searchTerm={setSearchTerm}/>
        </div> 
        <div className="rounded-lg mt-4 p-2 shadow-md">
        <JsonExplorer data={jsonData} searchTerm={searchTerm} />
        </div>
      </section>
    )}
   </main>
  );
}