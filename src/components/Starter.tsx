import React, { useEffect, useState } from "react";
import "./Starter.css"; // Import your CSS file
import Image from "next/image";
import myimage from "@/components/image.png";

function Starter() {
  const [text, setText] = useState("");

  useEffect(() => {
    const originalText = "Airtribe";

    let index = 0;
    const intervalId = setInterval(() => {
      setText(originalText.slice(0, index + 1));
      index++;

      if (index === originalText.length) {
        clearInterval(intervalId);

        // Restart the animation after a delay (you can adjust the delay as needed)
        setTimeout(() => {
          setText("");
          index = 0;
          setInterval(() => {
            setText(originalText.slice(0, index + 1));
            index++;

            if (index === originalText.length) {
              clearInterval(intervalId);
            }
          }, 100);
        }, 1000); // Adjust the delay before restarting the animation
      }
    }, 100); // Adjust the interval duration as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <Image
        src={myimage}
        alt="logo image"
        width={300}
        height={10}
        className="w-22 md:w-20 pb-10 mb-10 mx-auto md:pb-0 object-contain rounded-full border-white border-2"
      />
      <div className=" flex justify-center">
        <p className="animated-text my-auto font-extrabold text-zinc-950 text-5xl">{text}</p>
      </div>
      
    </div>
  );
}

export default Starter;
