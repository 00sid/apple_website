// import { useEffect, useRef, useState } from "react";
// import { hightlightsSlides } from "../constants";
// import gsap from "gsap";
// import { pauseImg, playImg, replayImg } from "../utils";
// import { useGSAP } from "@gsap/react";
// const VideoCarousel = () => {
//   const videoRef = useRef([]);
//   const videoSpanRef = useRef([]);
//   const videoDivRef = useRef([]);
//   const [video, setVideo] = useState({
//     isEnd: false,
//     startPlay: false,
//     videoId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setloadedData] = useState([]);
//   const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

//   useGSAP(() => {
//     gsap.to("#video", {
//       scrollTrigger: {
//         trigger: "#video",
//         toggleActions: "restart none none none",
//       },
//       onComplete: () => {
//         setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
//       },
//     });
//   }, [isEnd, videoId]);
//   useEffect(() => {
//     if (loadedData.length > 3) {
//       if (!isPlaying) {
//         videoRef.current[videoId].pause();
//       } else {
//         startPlay && videoRef.current[videoId].play();
//       }
//     }
//   }, [startPlay, videoId, isPlaying, loadedData]);

//   const handleLoadedMetaData = (i, e) => {
//     setloadedData((prev) => ({ ...prev, e }));
//   };
//   useEffect(() => {
//     const currentProgress = 0;
//     let span = videoSpanRef.current;
//     if (span[video]) {
//       const anim = gsap.to(span[video], {
//         onUpdate: () => {},
//         onComplete: () => {},
//       });
//     }
//   }, [videoId, startPlay]);
//   const handleProcess = (type, i) => {
//     switch (type) {
//       case "video-end":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isEnd: true,
//           videoId: i + 1,
//         }));

//         break;
//       case "video-last":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isLastVideo: true,
//         }));
//       case "video-reset":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isEnd: false,
//           videoId: 0,
//         }));
//       case "play":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isPlaying: !prevVideo.isPlaying,
//         }));
//       default:
//         break;
//     }
//   };
//   return (
//     <>
//       <div className="flex items-center">
//         {hightlightsSlides.map((list, i) => (
//           <div id="slider" key={list.id} className="sm:pr-20 pr-10">
//             <div className="video-carousel_container ">
//               <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
//                 <video
//                   id="video"
//                   playsInline={true}
//                   preload="auto"
//                   muted
//                   ref={(el) => (videoRef.current[i] = el)}
//                   onPlay={() => {
//                     setvideo((prevVideo) => ({
//                       ...prevVideo,
//                       isPlaying: true,
//                     }));
//                   }}
//                   onLoadedMetadata={(e) => {
//                     handleLoadedMetaData(i, e);
//                   }}
//                 >
//                   <source src={list.video} type="video/mp4" />
//                 </video>
//               </div>
//               <div className="absolute top-20 left-[5%] z-10">
//                 {list.textLists.map((text, i) => (
//                   <div className="sm:text-2xl text-xl font-medium" key={text}>
//                     {text}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="relative mt-10 flex-center">
//         <div className="flex-center py-5 px-7 bg-gray-300 rounded-full ">
//           {videoRef.current.map((_, i) => (
//             <span
//               key={i}
//               ref={(el) => (videoDivRef.current[i] = el)}
//               className=" h-3 w-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer"
//             >
//               <span
//                 className="absolute w-full h-full rounded-full"
//                 ref={(el) => (videoSpanRef.current[i] = el)}
//               />
//             </span>
//           ))}
//         </div>
//         <button className="control-btn">
//           <img
//             src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
//             onClick={
//               isLastVideo
//                 ? () => handleProcess("video-reset")
//                 : !isPlaying
//                 ? () => handleProcess("play")
//                 : () => handleProcess("pause")
//             }
//             alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default VideoCarousel;

import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (videoRef.current[videoId]) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else if (startPlay) {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying]);

  const handleLoadedMetaData = (i, e) => {
    setLoadedData((prev) => {
      const copy = [...prev];
      copy[i] = e;
      return copy;
    });
  };

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              background: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              background: "#afafaf",
            });
          }
        },
      });
      if (videoId == 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i = 0) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i + 1,
          isPlaying: true,
        }));
        break;
      case "video-last":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
          isPlaying: false,
        }));
        break;
      case "video-reset":
        setVideo({
          isEnd: false,
          startPlay: true,
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
        });
        break;
      case "play":
        setVideo((prev) => ({
          ...prev,
          isPlaying: true,
        }));
        break;
      case "pause":
        setVideo((prev) => ({
          ...prev,
          isPlaying: false,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div id="slider" key={list.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  className={`${
                    list.id == 2 && "translateX-x-44"
                  } pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => {
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last");
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-20 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <div className="sm:text-2xl text-xl font-medium" key={text}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-10 flex-center">
        <div className="flex-center py-5 px-7 bg-gray-300 rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="h-3 w-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full rounded-full bg-blue-500"
                ref={(el) => (videoSpanRef.current[i] = el)}
                style={{ width: videoId === i ? "0%" : "100%" }}
              />
            </span>
          ))}
        </div>

        <button className="control-btn ml-5">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            onClick={() =>
              isLastVideo
                ? handleProcess("video-reset")
                : isPlaying
                ? handleProcess("pause")
                : handleProcess("play")
            }
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
