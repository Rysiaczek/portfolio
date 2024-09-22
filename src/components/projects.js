import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Projects = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    console.log("fetching data");
    fetch(process.env.PUBLIC_URL + "/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCards(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);
  return (
    <div className="">
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ cards }) => {
  const targetRef = useRef(null);
  const cardWidth = 450;
  const gap = 16;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const totalWidth = cards.length * (cardWidth + gap + 10);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${totalWidth - window.innerWidth}px`]
  );
  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden pl-10">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const positionClass =
    card.position === "start"
      ? "self-start"
      : card.position === "center"
        ? "self-center"
        : "self-end";

  return (
    <div
      key={card.id}
      className={`group relative h-[300px] w-[450px] ${positionClass}`}>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 "></div>
      <div
        className={`absolute inset-0 z-10 ${
          card.position === "start" ? "top-[100%]" : "top-[-15%]"
        }`}>
        <p className=" p-1 text-2xl font-black text-white ">{card.title}</p>
      </div>
    </div>
  );
};

export default Projects;
