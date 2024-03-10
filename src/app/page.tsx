'use client'
import React, { useState, useEffect } from 'react';
import DndExample from "@/components/DndExample";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Starter from "@/components/Starter";

export default function Home() {
  const [showStarter, setShowStarter] = useState(true);

  useEffect(() => {
    // Hide the Starter component after 5 seconds
    const timeoutId = setTimeout(() => {
      setShowStarter(false);
    }, 5000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <main className="bg-gray-950 text-white">
      {showStarter ? (
        <Starter />
      ) : (
        <>
          <Header />
          <DndExample />
          <Footer />
        </>
      )}
    </main>
  );
}
